import { NewEntry } from './../../shared/models/entry.model';
import { Entry } from 'src/app/modules/shared/models';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import * as moment from 'moment';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { TimeEntriesTimeRange } from '../models/time-entries-time-range';
import { EntryService } from '../services/entry.service';
import { INFO_SAVED_SUCCESSFULLY } from './../../shared/messages';
import { EntryActionTypes, SwitchTimeEntry, DeleteEntry, CreateEntry } from './entry.actions';
import { EntryEffects } from './entry.effects';

describe('TimeEntryActionEffects', () => {

  let actions$: Observable<Action>;
  let effects: EntryEffects;
  let service: EntryService;
  let toastrService;
  const entry: Entry = { project_id: 'p-id', start_date: new Date(), id: 'id' };

  const dateTest = moment().format('YYYY-MM-DD');
  const endHourTest = moment().subtract(5, 'hours').format('HH:mm:ss');
  const startHourTest = moment().subtract(3, 'hours').format('HH:mm:ss');
  const endDateTest = new Date(`${dateTest}T${endHourTest.trim()}`);
  const startDateTest = new Date(`${dateTest}T${startHourTest.trim()}`);

  const entryUpdate = {
    id: 'id',
    project_id: 'p-id',
    start_date : startDateTest,
    start_hour : moment().subtract(1, 'hours').format('HH:mm'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DatePipe,
        EntryEffects,
        provideMockActions(() => actions$)
      ],
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      declarations: []
    });
    effects = TestBed.inject(EntryEffects);
    service = TestBed.inject(EntryService);
    toastrService = TestBed.inject(ToastrService);
  });

  it('should be created', async () => {
    expect(effects).toBeTruthy();
  });

  it('returns StopTimeEntryRunningFail when entry could not be stoped', (done) => {
    actions$ = of(new SwitchTimeEntry('entry-id', 'project-id'));
    spyOn(service, 'stopEntryRunning').and.returnValue(throwError('any error'));

    effects.switchEntryRunning$.subscribe(action => {
      expect(action.type).toBe(EntryActionTypes.STOP_TIME_ENTRY_RUNNING_FAILED);
      done();
    });
  });

  it('stop the active entry and return a ClockInAction', (done) => {
    actions$ = of(new SwitchTimeEntry('entry-id', 'project-id'));
    spyOn(service, 'stopEntryRunning').and.returnValue(of({ end_date: new Date() }));

    effects.switchEntryRunning$.subscribe(action => {
      expect(service.stopEntryRunning).toHaveBeenCalledWith('entry-id');
      expect(action.type).toBe(EntryActionTypes.CLOCK_IN);
      done();
    });
  });

  it('returns an action with type LOAD_ENTRIES_SUMMARY_SUCCESS when the service returns a value', () => {
    actions$ = of({ type: EntryActionTypes.LOAD_ENTRIES_SUMMARY });
    const serviceSpy = spyOn(service, 'summary');
    serviceSpy.and.returnValue(of({ day: null, month: null, week: null }));

    effects.loadEntriesSummary$.subscribe(action => {
      expect(action.type).toEqual(EntryActionTypes.LOAD_ENTRIES_SUMMARY_SUCCESS);
    });
  });

  it('returns an action with type LOAD_ENTRIES_SUMMARY_FAIL when the service fails', () => {
    actions$ = of({ type: EntryActionTypes.LOAD_ENTRIES_SUMMARY });
    spyOn(service, 'summary').and.returnValue(throwError('any error'));

    effects.loadEntriesSummary$.subscribe(action => {
      expect(action.type).toEqual(EntryActionTypes.LOAD_ENTRIES_SUMMARY_FAIL);
    });
  });

  it('When the service returns a value, then LOAD_ENTRIES_BY_TIME_RANGE_SUCCESS should be triggered', () => {
    const timeRange: TimeEntriesTimeRange = { start_date: moment(new Date()), end_date: moment(new Date()) };
    const userId = '*';
    actions$ = of({ type: EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE, timeRange, userId });
    const serviceSpy = spyOn(service, 'loadEntriesByTimeRange');
    serviceSpy.and.returnValue(of([]));

    effects.loadEntriesByTimeRange$.subscribe(action => {
      expect(action.type).toEqual(EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE_SUCCESS);
    });

  });

  it('When the service fails, then LOAD_ENTRIES_BY_TIME_RANGE_FAIL should be triggered', async () => {
    const timeRange: TimeEntriesTimeRange = { start_date: moment(new Date()), end_date: moment(new Date()) };
    const userId = '*';
    actions$ = of({ type: EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE, timeRange, userId });
    spyOn(service, 'loadEntriesByTimeRange').and.returnValue(throwError('any error'));

    effects.loadEntriesByTimeRange$.subscribe(action => {
      expect(action.type).toEqual(EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE_FAIL);
    });
  });

  it('returns a LOAD_ACTIVE_ENTRY_SUCCESS when the entry that is running it is in the same day', async () => {
    actions$ = of({ type: EntryActionTypes.LOAD_ACTIVE_ENTRY });
    const serviceSpy = spyOn(service, 'loadActiveEntry');
    const mockEntry = {
      ...entry,
      start_date: new Date()
    };
    serviceSpy.and.returnValue(of(mockEntry));

    effects.loadActiveEntry$.subscribe(action => {
      expect(action.type).toEqual(EntryActionTypes.LOAD_ACTIVE_ENTRY_SUCCESS);
    });
  });

  it('does not return anything if an entry active is not found', async () => {
    actions$ = of({ type: EntryActionTypes.LOAD_ACTIVE_ENTRY });
    const serviceSpy = spyOn(service, 'loadActiveEntry');
    serviceSpy.and.returnValue(of([]));

    effects.loadActiveEntry$.subscribe(action => {
      expect(action.type).toEqual(EntryActionTypes.LOAD_ACTIVE_ENTRY_FAIL);
    });
  });

  it('returns a UPDATE_ENTRY when the entry that is running it is in the past', async () => {
    const startDateInPast = new Date();
    startDateInPast.setDate(startDateInPast.getDate() - 5);
    const activeEntry = { id: '123', start_date: startDateInPast };
    actions$ = of({ type: EntryActionTypes.LOAD_ACTIVE_ENTRY, activeEntry });
    const serviceSpy = spyOn(service, 'loadActiveEntry');
    serviceSpy.and.returnValue(of(activeEntry));

    effects.loadActiveEntry$.subscribe(action => {
      expect(action.type).toEqual(EntryActionTypes.UPDATE_ENTRY);
    });
  });

  it('display a success message on UPDATE_ENTRY', async () => {
    actions$ = of({ type: EntryActionTypes.UPDATE_ENTRY, entry });
    spyOn(toastrService, 'success');
    spyOn(service, 'updateEntry').and.returnValue(of(entry));

    effects.updateEntry$.subscribe(action => {
      expect(toastrService.success).toHaveBeenCalledWith(INFO_SAVED_SUCCESSFULLY);
      expect(action.type).toEqual(EntryActionTypes.UPDATE_ENTRY_SUCCESS);
    });
  });

  it('UPDATE_ENTRY_FAIL when service fails', async () => {
    actions$ = of({ type: EntryActionTypes.UPDATE_ENTRY, entry });
    spyOn(service, 'updateEntry').and.returnValue(throwError({ error: { message: 'doh!' } }));

    effects.updateEntry$.subscribe(action => {
      expect(action.type).toEqual(EntryActionTypes.UPDATE_ENTRY_FAIL);
    });
  });

  it('does not display any message on UPDATE_ENTRY_RUNNING', async () => {
    actions$ = of({ type: EntryActionTypes.UPDATE_ENTRY_RUNNING, entry });
    spyOn(service, 'updateEntry').and.returnValue(of({}));
    spyOn(toastrService, 'success');

    effects.updateEntryRunning$.subscribe(action => {
      expect(toastrService.success).toHaveBeenCalledTimes(1);
      expect(action.type).toBe(EntryActionTypes.UPDATE_ENTRY_SUCCESS);
    });
  });

  it('display an error when updating running entry fails', async () => {
    actions$ = of({ type: EntryActionTypes.UPDATE_ENTRY_RUNNING, entry });
    spyOn(service, 'updateEntry').and.returnValue(throwError({ error: { message: 'doh!' } }));
    spyOn(toastrService, 'error');

    effects.updateEntryRunning$.subscribe(action => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toBe(EntryActionTypes.UPDATE_ENTRY_FAIL);
    });
  });

  it('When the service returns a value, then RESTART_ENTRY_SUCCESS should be triggered', () => {
    actions$ = of({ type: EntryActionTypes.RESTART_ENTRY, entry });
    spyOn(service, 'restartEntry').and.returnValue(of(entry));

    effects.restartEntry$.subscribe(action => {
      expect(action.type).toEqual(EntryActionTypes.RESTART_ENTRY_SUCCESS);
    });

  });

  it('When the service fails, then RESTART_ENTRY_FAIL should be triggered', async () => {
    actions$ = of({ type: EntryActionTypes.RESTART_ENTRY, entry });
    spyOn(service, 'restartEntry').and.returnValue(throwError({ error: { message: 'doh!' } }));

    effects.restartEntry$.subscribe(action => {
      expect(action.type).toEqual(EntryActionTypes.RESTART_ENTRY_FAIL);
    });
  });

  it('data from old entries is used when entries are found for the same project', async () => {
    const newEntry: NewEntry = { project_id: 'p-id', start_date: new Date().toISOString() };
    actions$ = of({ type: EntryActionTypes.CLOCK_IN, payload: newEntry });
    spyOn(service, 'findEntriesByProjectId').and.returnValue(of([entry]));

    effects.clockIn$.subscribe(action => {
      expect(action.type).toBe(EntryActionTypes.CREATE_ENTRY);
    });
  });

  it('when an existing entry has technologies, those are used to create the new entry', async () => {
    const newEntry: NewEntry = { project_id: 'p-id', start_date: new Date().toISOString() };
    actions$ = of({ type: EntryActionTypes.CLOCK_IN, payload: newEntry });
    const oldEntry = { ...entry, technologies: ['foo']};
    spyOn(service, 'findEntriesByProjectId').and.returnValue(of([oldEntry]));

    effects.clockIn$.subscribe( (action: CreateEntry) => {
      expect(action.type).toBe(EntryActionTypes.CREATE_ENTRY);
      expect(action.payload.technologies).toBe(oldEntry.technologies);
    });
  });

  it('findEntriesByProjectId when clockIn', async () => {
    const newEntry: NewEntry = { project_id: 'p-id' };
    actions$ = of({ type: EntryActionTypes.CLOCK_IN, payload: newEntry });
    spyOn(service, 'findEntriesByProjectId').and.returnValue(of([]));

    effects.clockIn$.subscribe(action => {
      expect(service.findEntriesByProjectId).toHaveBeenCalledWith('p-id');
    });
  });

  it('CreateEntryFailError when projects could not be found', async () => {
    const newEntry: NewEntry = { project_id: 'p-id' };
    actions$ = of({ type: EntryActionTypes.CLOCK_IN, payload: newEntry });
    spyOn(service, 'findEntriesByProjectId').and.returnValue(throwError({ error: { message: 'doh!' } }));

    effects.clockIn$.subscribe(action => {
      expect(action.type).toBe(EntryActionTypes.CREATE_ENTRY_FAIL);
    });
  });

  it('call deleteEntry from service when action type is DELETE_ENTRY', async () => {
    actions$ = of( new DeleteEntry('entryId'));
    spyOn(toastrService, 'success');
    spyOn(service, 'deleteEntry').and.returnValue(of({}));

    effects.deleteEntry$.subscribe(action => {
      expect(action.type).toBe(EntryActionTypes.DELETE_ENTRY_SUCCESS);
    });
  });

  it('action type is DELETE_ENTRY_FAIL When the service fails', async () => {
    const entryId = 'entry-id';
    actions$ = of({type: EntryActionTypes.DELETE_ENTRY, entryId});
    spyOn(service, 'deleteEntry').and.returnValue(throwError({ error: { message: 'doh!' } }));

    effects.deleteEntry$.subscribe( action => {
      expect(action.type).toEqual(EntryActionTypes.DELETE_ENTRY_FAIL);
    });
  });

  it('action type is LOAD_ENTRIES_SUCCESS when service is executed sucessfully', async () => {
    actions$ = of({ type: EntryActionTypes.LOAD_ENTRIES });
    const serviceSpy = spyOn(service, 'loadEntries');
    serviceSpy.and.returnValue(of(entry));

    effects.loadEntries$.subscribe((action) => {
      expect(action.type).toEqual(EntryActionTypes.LOAD_ENTRIES_SUCCESS);
    });
  });

  it('action type is LOAD_ENTRIES_FAIL when service fail in execution', async () => {
    actions$ = of({ type: EntryActionTypes.LOAD_ENTRIES });
    const serviceSpy = spyOn(service, 'loadEntries');
    serviceSpy.and.returnValue(throwError({ error: { message: 'fail!' } }));
    spyOn(toastrService, 'warning');

    effects.loadEntries$.subscribe((action) => {
      expect(toastrService.warning).toHaveBeenCalled();
      expect(action.type).toEqual(EntryActionTypes.LOAD_ENTRIES_FAIL);
    });
  });

  it('type is CREATE_ENTRY_SUCCESS when service is executed sucessfully and display a INFO_SAVE_SUCCESS', async () => {
    const entryTest: Entry = { project_id: 'p-id', start_date: new Date(), id: 'id', end_date: new Date() };
    actions$ = of({ type: EntryActionTypes.CREATE_ENTRY, payload: entryTest });
    spyOn(toastrService, 'success');
    spyOn(service, 'createEntry').and.returnValue(of(entryTest));

    effects.createEntry$.subscribe((action) => {
      expect(toastrService.success).toHaveBeenCalledWith(INFO_SAVED_SUCCESSFULLY);
      expect(action.type).toEqual(EntryActionTypes.CREATE_ENTRY_SUCCESS);
    });
  });

  it('type is CREATE_ENTRY_SUCCESS when service is executed sucessfully and display a clocked In message', async () => {
    const entryTest: Entry = { project_id: 'p-id', start_date: new Date(), id: 'id', end_date: null };
    actions$ = of({ type: EntryActionTypes.CREATE_ENTRY, payload: entryTest });
    spyOn(toastrService, 'success');
    spyOn(service, 'createEntry').and.returnValue(of(entryTest));

    effects.createEntry$.subscribe((action) => {
      expect(toastrService.success).toHaveBeenCalledWith('You clocked-in successfully');
      expect(action.type).toEqual(EntryActionTypes.CREATE_ENTRY_SUCCESS);
    });
  });

  it('action type is CREATE_ENTRY_FAIL when service fail in execution', async () => {
    actions$ = of({ type: EntryActionTypes.CREATE_ENTRY, payload: entry });
    spyOn(toastrService, 'error');
    spyOn(service, 'createEntry').and.returnValue(throwError({ error: { message: 'fail!' } }));

    effects.createEntry$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(EntryActionTypes.CREATE_ENTRY_FAIL);
    });
  });

  it('action type is STOP_TIME_ENTRY_RUNNING_SUCCESS when service is executed sucessfully and display a clocked Out message', async () => {
    actions$ = of({ type: EntryActionTypes.STOP_TIME_ENTRY_RUNNING, payload: entry });
    spyOn(toastrService, 'success');
    spyOn(service, 'stopEntryRunning').and.returnValue(of(entry));

    effects.stopTimeEntryRunning$.subscribe((action) => {
      expect(toastrService.success).toHaveBeenCalledWith('You clocked-out successfully');
      expect(action.type).toEqual(EntryActionTypes.STOP_TIME_ENTRY_RUNNING_SUCCESS);
    });
  });

  it('action type is STOP_TIME_ENTRY_RUNNING_FAILED when service fail in execution', async () => {
    actions$ = of({ type: EntryActionTypes.STOP_TIME_ENTRY_RUNNING, payload: entry });
    spyOn(toastrService, 'error');
    spyOn(service, 'stopEntryRunning').and.returnValue(throwError({ error: { message: 'fail!' } }));

    effects.stopTimeEntryRunning$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(EntryActionTypes.STOP_TIME_ENTRY_RUNNING_FAILED);
    });
  });

  it('should update last entry when UPDATE_CURRENT_OR_LAST_ENTRY is executed', async () => {
    actions$ = of({ type: EntryActionTypes.UPDATE_CURRENT_OR_LAST_ENTRY, payload: entry });
    const lastEntryMock: Entry = {
      ...entry,
      end_date: moment(entry.start_date).add(4, 'h').toDate(),
    };
    spyOn(service, 'loadEntries').and.returnValue(of([entry, lastEntryMock]));
    effects.updateCurrentOrLastEntry$.subscribe(action => {
      expect(action.type).toEqual(EntryActionTypes.UPDATE_ENTRY);
    });
  });

  it('should update current entry when UPDATE_CURRENT_OR_LAST_ENTRY is executed', async () => {
    const lastEntry: Entry = { project_id: 'p-id', start_date: new Date(), id: 'id', end_date: endDateTest};
    actions$ = of({ type: EntryActionTypes.UPDATE_CURRENT_OR_LAST_ENTRY, payload: entryUpdate });
    spyOn(service, 'loadEntries').and.returnValue(of([lastEntry, lastEntry]));
    spyOn(toastrService, 'success');

    effects.updateCurrentOrLastEntry$.subscribe(action => {
      expect(toastrService.success).toHaveBeenCalledWith('You change the time-in successfully');
      expect(action.type).toEqual(EntryActionTypes.UPDATE_ENTRY_RUNNING);
    });
  });

  it('action type is UPDATE_CURRENT_OR_LAST_ENTRY_FAIL when service fail in execution', async () => {
    actions$ = of({ type: EntryActionTypes.UPDATE_CURRENT_OR_LAST_ENTRY, payload: entry });
    spyOn(service, 'loadEntries').and.returnValue(throwError({ error: { message: 'fail!' } }));

    effects.updateCurrentOrLastEntry$.subscribe((action) => {
      expect(action.type).toEqual(EntryActionTypes.UPDATE_CURRENT_OR_LAST_ENTRY_FAIL);
    });
  });
});
