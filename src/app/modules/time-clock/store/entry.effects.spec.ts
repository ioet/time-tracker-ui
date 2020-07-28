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
import { EntryActionTypes, SwitchTimeEntry } from './entry.actions';
import { EntryEffects } from './entry.effects';

describe('TimeEntryActionEffects', () => {

  let actions$: Observable<Action>;
  let effects: EntryEffects;
  let service: EntryService;
  let toastrService;

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

  it('stop the active entry and return a CreateEntryAction', async () => {
    actions$ = of(new SwitchTimeEntry('entry-id', 'project-id'));
    const serviceSpy = spyOn(service, 'stopEntryRunning');
    serviceSpy.and.returnValue(of({}));

    effects.switchEntryRunning$.subscribe(action => {
      expect(service.stopEntryRunning).toHaveBeenCalledWith('entry-id');
      expect(action.type).toBe(EntryActionTypes.CREATE_ENTRY);
    });
  });

  it('returns an action with type LOAD_ENTRIES_SUMMARY_SUCCESS when the service returns a value', () => {
    actions$ = of({type: EntryActionTypes.LOAD_ENTRIES_SUMMARY});
    const serviceSpy = spyOn(service, 'summary');
    serviceSpy.and.returnValue(of({day: null, month: null, week: null }));

    effects.loadEntriesSummary$.subscribe(action => {
      expect(action.type).toEqual(EntryActionTypes.LOAD_ENTRIES_SUMMARY_SUCCESS);
    });
  });

  it('returns an action with type LOAD_ENTRIES_SUMMARY_FAIL when the service fails', () => {
    actions$ = of({type: EntryActionTypes.LOAD_ENTRIES_SUMMARY});
    spyOn(service, 'summary').and.returnValue(throwError('any error'));

    effects.loadEntriesSummary$.subscribe(action => {
      expect(action.type).toEqual(EntryActionTypes.LOAD_ENTRIES_SUMMARY_FAIL);
    });
  });

  it('When the service returns a value, then LOAD_ENTRIES_BY_TIME_RANGE_SUCCESS should be triggered', () => {
    const timeRange: TimeEntriesTimeRange = {start_date: moment(new Date()), end_date: moment(new Date())};
    const userId = '*';
    actions$ = of({type: EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE, timeRange, userId});
    const serviceSpy = spyOn(service, 'loadEntriesByTimeRange');
    serviceSpy.and.returnValue(of([]));

    effects.loadEntriesByTimeRange$.subscribe(action => {
      expect(action.type).toEqual(EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE_SUCCESS);
    });

  });

  it('When the service fails, then LOAD_ENTRIES_BY_TIME_RANGE_FAIL should be triggered', async () => {
    const timeRange: TimeEntriesTimeRange = {start_date: moment(new Date()), end_date: moment(new Date())};
    const userId = '*';
    actions$ = of({type: EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE, timeRange, userId});
    spyOn(service, 'loadEntriesByTimeRange').and.returnValue(throwError('any error'));

    effects.loadEntriesByTimeRange$.subscribe(action => {
      expect(action.type).toEqual(EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE_FAIL);
    });
  });

  it('returns a LOAD_ACTIVE_ENTRY_SUCCESS when the entry that is running it is in the same day', async () => {
    const activeEntry = {id: '123', start_date: new Date()};
    actions$ = of({type: EntryActionTypes.LOAD_ACTIVE_ENTRY, activeEntry});
    const serviceSpy = spyOn(service, 'loadActiveEntry');
    serviceSpy.and.returnValue(of(activeEntry));

    effects.loadActiveEntry$.subscribe(action => {
      expect(action.type).toEqual(EntryActionTypes.LOAD_ACTIVE_ENTRY_SUCCESS);
    });
  });

  it('returns a UPDATE_ENTRY when the entry that is running it is in the past', async () => {
    const startDateInPast = new Date();
    startDateInPast.setDate(startDateInPast.getDate() - 5);
    const activeEntry = {id: '123', start_date: startDateInPast};
    actions$ = of({type: EntryActionTypes.LOAD_ACTIVE_ENTRY, activeEntry});
    const serviceSpy = spyOn(service, 'loadActiveEntry');
    serviceSpy.and.returnValue(of(activeEntry));

    effects.loadActiveEntry$.subscribe(action => {
      expect(action.type).toEqual(EntryActionTypes.UPDATE_ENTRY);
    });
  });

  it('display a success message on UPDATE_ENTRY', async () => {
    const activeEntry = {};
    actions$ = of({type: EntryActionTypes.UPDATE_ENTRY, activeEntry});
    spyOn(toastrService, 'success');

    effects.updateEntry$.subscribe(action => {
      expect(toastrService.success).toHaveBeenCalledWith(INFO_SAVED_SUCCESSFULLY);
    });
  });

  it('does not display any message on UPDATE_ENTRY_RUNNING', async () => {
    const activeEntry = {};
    actions$ = of({type: EntryActionTypes.UPDATE_ENTRY_RUNNING, activeEntry});
    spyOn(toastrService, 'success');

    effects.updateEntry$.subscribe(action => {
      expect(toastrService.success).toHaveBeenCalledTimes(0);
    });
  });

  // it('When the service returns a value, then RESTART_ENTRY_SUCCESS should be triggered', () => {

  //   const entryId = '123';
  //   actions$ = of({type: EntryActionTypes.RESTART_ENTRY, entryId});
  //   const serviceSpy = spyOn(service, 'restartEntry');
  //   serviceSpy.and.returnValue(of({ id: entryId }));

  //   effects.restartEntry$.subscribe(action => {
  //     expect(action.type).toEqual(EntryActionTypes.RESTART_ENTRY_SUCCESS);
  //   });

  // });

  it('When the service fails, then RESTART_ENTRY_FAIL should be triggered', async () => {
    const entryId = '123';
    actions$ = of({type: EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE, entryId});
    spyOn(service, 'restartEntry').and.returnValue(throwError('any error'));

    effects.restartEntry$.subscribe(action => {
      expect(action.type).toEqual(EntryActionTypes.RESTART_ENTRY_FAIL);
    });
  });

  // TODO Implement the remaining unit tests for the other effects.

});
