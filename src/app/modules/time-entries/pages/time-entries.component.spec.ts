import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ToastrService } from 'ngx-toastr';
import { ProjectState } from '../../customer-management/components/projects/components/store/project.reducer';
import { DetailsFieldsComponent, EmptyStateComponent, MonthPickerComponent } from '../../shared/components';
import { Entry } from '../../shared/models';
import { GroupByDatePipe } from '../../shared/pipes';
import { SubstractDatePipe } from '../../shared/pipes/substract-date/substract-date.pipe';
import { TechnologyState } from '../../shared/store/technology.reducers';
import { TimeEntriesSummaryComponent } from '../../time-clock/components/time-entries-summary/time-entries-summary.component';
import * as entryActions from '../../time-clock/store/entry.actions';
import { EntryState } from '../../time-clock/store/entry.reducer';
import { getTimeEntriesDataSource, getActiveTimeEntry } from '../../time-clock/store/entry.selectors';
import { LoadActiveEntry } from './../../time-clock/store/entry.actions';
import { TimeEntriesComponent } from './time-entries.component';
import { ActionsSubject } from '@ngrx/store';
import { EntryActionTypes } from './../../time-clock/store/entry.actions';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CookieService } from 'ngx-cookie-service';
import { DebugElement } from '@angular/core';
import { FeatureToggle } from './../../../../environments/enum';
import { CalendarView } from 'angular-calendar';
import * as moment from 'moment';

describe('TimeEntriesComponent', () => {
  type Merged = TechnologyState & ProjectState & EntryState;
  let component: TimeEntriesComponent;
  let cookieService: CookieService;
  let fixture: ComponentFixture<TimeEntriesComponent>;
  let store: MockStore<Merged>;
  let mockEntriesSelector;
  let injectedToastrService: ToastrService;
  let state: EntryState;
  let entry: Entry;

  const toastrService = {
    error: () => {
    },
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmptyStateComponent,
        DetailsFieldsComponent,
        GroupByDatePipe,
        MonthPickerComponent,
        TimeEntriesComponent,
        TimeEntriesSummaryComponent,
        SubstractDatePipe
      ],
      providers: [provideMockStore({ initialState: state }),
      { provide: ToastrService, useValue: toastrService },
      ],
      imports: [FormsModule, ReactiveFormsModule, AutocompleteLibModule, NgxMaterialTimepickerModule],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    entry = {
      id: 'entry_1',
      project_id: 'abc',
      project_name: 'Time-tracker',
      start_date: new Date('2020-02-05T15:36:15.887Z'),
      end_date: new Date('2020-02-05T18:36:15.887Z'),
      customer_name: 'ioet Inc.',
      activity_id: 'development',
      technologies: ['Angular', 'TypeScript'],
      description: 'No comments',
      uri: 'EY-25',
    };
    state = {
      timeEntriesSummary: null,
      createError: false,
      updateError: false,
      isLoading: false,
      message: 'any-message',
      active: {
        start_date: new Date('2019-01-01T15:36:15.887Z'),
        id: 'active-entry',
        technologies: ['rxjs', 'angular'],
        project_name: 'time-tracker'
      },
      timeEntriesDataSource: {
        isLoading: false,
        data: [entry]
      },
      reportDataSource: {
        isLoading: false,
        data: [entry]
      }
    };
    mockEntriesSelector = store.overrideSelector(getTimeEntriesDataSource, state.timeEntriesDataSource);
    injectedToastrService = TestBed.inject(ToastrService);
    cookieService = TestBed.inject(CookieService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('dispatch an action on loadActiveEntry', () => {
    spyOn(store, 'dispatch');

    component.loadActiveEntry();

    expect(store.dispatch).toHaveBeenCalledWith(new LoadActiveEntry());
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('on loading the component the time entries should be loaded', waitForAsync(() => {
    component.timeEntriesDataSource$.subscribe(ds => {
      expect(ds.data.length).toEqual(1);
    });
  }));

  it('Time entries data should be populated on ngOnInit()', waitForAsync(() => {
    mockEntriesSelector = store.overrideSelector(getTimeEntriesDataSource, state.timeEntriesDataSource);

    component.ngOnInit();

    component.timeEntriesDataSource$.subscribe(ds => {
      expect(ds.data.length).toEqual(1);
    });
  }));

  it('should initialize the table when the component is initialized', () => {
    spyOn(component.dtTrigger, 'next');
    component.ngAfterViewInit();

    expect(component.dtTrigger.next).toHaveBeenCalled();
  });

  it('when create time entries, the time entries should be queried', () => {
    const currentMonth = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const entryToSave = {
      entry: {
        project_id: 'project-id',
        end_date: '2010-05-05T10:04',
        start_date: null,
        timezone_offset: 300,
      }, shouldRestartEntry: false
    };
    component.activeTimeEntry = null;
    spyOn(store, 'dispatch');
    component.ngOnInit();

    component.saveEntry(entryToSave);
    expect(store.dispatch).toHaveBeenCalledWith(new entryActions.CreateEntry(entryToSave.entry));
  });

  it('when creating a new entry, then entryId should be null', () => {
    component.newEntry();
    expect(component.entryId).toBe(null);
  });

  it('given an empty list of entries when creating a new entry it can be marked as WIP ', () => {
    state.timeEntriesDataSource.data = [];
    mockEntriesSelector = store.overrideSelector(getTimeEntriesDataSource, state.timeEntriesDataSource);

    component.newEntry();

    expect(component.canMarkEntryAsWIP).toBe(true);
  });

  it('given a list of entries having an entry running when creating a new entry it cannot be marked as WIP ', () => {
    state.timeEntriesDataSource.data = [{ ...entry, running: true }];
    mockEntriesSelector = store.overrideSelector(getTimeEntriesDataSource, state.timeEntriesDataSource);

    component.newEntry();
    expect(component.canMarkEntryAsWIP).toBe(false);
  });

  it('given a list of entries not having an entry running when creating a new entry it can be marked as WIP ', () => {
    state.timeEntriesDataSource.data = [{ ...entry, running: false }];
    mockEntriesSelector = store.overrideSelector(getTimeEntriesDataSource, state.timeEntriesDataSource);

    component.newEntry();
    expect(component.canMarkEntryAsWIP).toBe(true);
  });

  it('when editing a time entry, the entry and entryId should be set with the time entry the user want to edit', () => {
    const anEntryId = state.timeEntriesDataSource.data[0].id;
    component.editEntry(anEntryId);
    expect(component.entry).toEqual(state.timeEntriesDataSource.data[0]);
    expect(component.entryId).toBe(anEntryId);
  });

  it('when trigger edit action and there is no active entry, active entry should be null', () => {
    state.active = null;
    mockEntriesSelector = store.overrideSelector(getActiveTimeEntry, state.active);

    const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
    const action = {
      type: EntryActionTypes.UPDATE_ENTRY_SUCCESS,
      payload: {
        project_id: 'project-id',
        start_date: '2010-05-05T10:04',
        description: 'description',
        technologies: [],
        uri: 'abc',
      },
    };

    actionSubject.next(action);

    expect(component.activeTimeEntry).toBeNull();
  });

  it('given a list of entries having an entry running when editing a different entry it cannot be marked as WIP ', () => {
    const anEntryId = '1';
    const anotherEntryId = '2';
    state.timeEntriesDataSource.data = [{ ...entry, running: true, id: anEntryId }];
    mockEntriesSelector = store.overrideSelector(getTimeEntriesDataSource, state.timeEntriesDataSource);

    component.editEntry(anotherEntryId);
    expect(component.canMarkEntryAsWIP).toBe(false);
  });

  it('given a list of entries having no entries running when editing a different entry it cannot be marked as WIP', () => {
    const anEntryId = '1';
    const anotherEntryId = '2';
    state.timeEntriesDataSource.data = [{ ...entry, running: false, id: anEntryId }];
    mockEntriesSelector = store.overrideSelector(getTimeEntriesDataSource, state.timeEntriesDataSource);

    component.editEntry(anotherEntryId);
    expect(component.canMarkEntryAsWIP).toBe(false);
  });

  it('given a list of entries having an entry running when editing the last entry it can be marked as WIP ', () => {
    const anEntryId = '1';
    const anotherEntryId = '2';
    state.timeEntriesDataSource.data = [{ ...entry, running: true, id: anEntryId },
    { ...entry, running: false, id: anotherEntryId }];
    mockEntriesSelector = store.overrideSelector(getTimeEntriesDataSource, state.timeEntriesDataSource);

    component.editEntry(anEntryId);

    expect(component.canMarkEntryAsWIP).toBe(true);
  });

  it('displays an error when start date of entry is greater than active entry start date', async () => {
    component.activeTimeEntry = entry;
    const newEntry = {
      entry: {
        project_id: 'p-id',
        start_date: '2020-05-05T10:04',
        end_date: '2020-05-05T11:04',
        description: 'description',
        technologies: [],
        uri: 'abc',
      }, shouldRestartEntry: false
    };
    component.entryId = 'new-entry';
    spyOn(injectedToastrService, 'error');

    component.saveEntry(newEntry);

    expect(injectedToastrService.error).toHaveBeenCalled();
  });

  it('displays an error when end date of entry is greater than active entry start date', async () => {
    component.activeTimeEntry = entry;
    const newEntry = {
      entry: {
        project_id: 'p-id',
        start_date: '2020-01-05T10:04',
        end_date: '2020-03-05T11:04',
        description: 'description',
        technologies: [],
        uri: 'abc',
      }, shouldRestartEntry: false
    };
    component.entryId = 'new-entry';
    spyOn(injectedToastrService, 'error');

    component.saveEntry(newEntry);

    expect(injectedToastrService.error).toHaveBeenCalled();
  });

  it('should dispatch an action when entry is going to be saved', () => {
    component.entry = { start_date: new Date(), id: '1234', technologies: [], project_name: 'time-tracker' };
    const newEntry = {
      entry: {
        project_id: 'p-id',
        project_name: 'time-tracker',
        start_date: '2020-05-05T10:04',
        description: 'description',
        technologies: [],
        uri: 'abc',
      },
      shouldRestartEntry: false
    };
    component.entryId = 'active-entry';
    spyOn(store, 'dispatch');

    component.saveEntry(newEntry);

    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should create new Entry', () => {
    const newEntry = {
      entry: {
        project_id: 'projectId',
        start_date: '2010-05-05T10:04',
        description: 'description',
        technologies: [],
        uri: 'abc',
        timezone_offset: 300,
      }, shouldRestartEntry: false
    };
    component.entryId = undefined;
    spyOn(store, 'dispatch');

    component.saveEntry(newEntry);

    expect(store.dispatch).toHaveBeenCalledWith(new entryActions.CreateEntry(newEntry.entry));
  });

  it('should delete Entry by id', () => {
    spyOn(store, 'dispatch');
    component.idToDelete = 'id';
    component.removeEntry();
    expect(store.dispatch).toHaveBeenCalledWith(new entryActions.DeleteEntry('id'));
  });

  it('should get the entry List by Month and year', () => {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    spyOn(store, 'dispatch');
    component.dateSelected({ monthIndex: month, year });
    expect(store.dispatch).toHaveBeenCalledWith(new entryActions.LoadEntries(month + 1, year));
  });

  it('doSave when activeTimeEntry === null', waitForAsync(() => {
    const entryToSave = {
      entry: {
        project_id: 'project-id',
        start_date: '2010-05-05T10:04',
        description: 'description',
        technologies: [],
        uri: 'abc',
      }, shouldRestartEntry: false
    };
    spyOn(component, 'doSave');
    component.activeTimeEntry = null;

    component.saveEntry(entryToSave);

    expect(component.doSave).toHaveBeenCalledWith(entryToSave);
  }));

  it('when event contains should restart as true, then a restart Entry action should be triggered', () => {
    component.entry = { start_date: new Date(), id: '1234', technologies: [], project_name: 'time-tracker' };
    const entryToSave = {
      entry: {
        id: '123',
        project_id: 'projectId',
        project_name: 'time-tracker',
        start_date: new Date(),
        description: 'description',
        technologies: [],
        uri: 'abc',

      }, shouldRestartEntry: true
    };
    component.entryId = '123';
    spyOn(store, 'dispatch');

    component.doSave(entryToSave);

    expect(store.dispatch).toHaveBeenCalledWith(new entryActions.RestartEntry(entryToSave.entry));
  });

  it('should preload data of last entry when a project is selected while creating new entry ', waitForAsync(() => {
    component.entry = null;
    component.entryId = null;
    const defaultSeconds = 0;
    const currentDate = new Date();
    currentDate.setSeconds(defaultSeconds);
    currentDate.setMilliseconds(defaultSeconds);
    const lastEntry = {
      description: 'testing is fun',
      technologies: [],
      uri: 'http://testing.is.fun',
      activity_id: 'sss',
      project_id: 'id',
      start_date: currentDate,
      end_date: currentDate
    };
    state.timeEntriesDataSource.data = [lastEntry];
    mockEntriesSelector = store.overrideSelector(getTimeEntriesDataSource, state.timeEntriesDataSource);

    component.projectSelected({ projectId: 'id' });
    expect(component.entry).toEqual(lastEntry);
  }));

  it('when the data source is loaded, the table should to show the appropriated column titles', waitForAsync(() => {
    component.timeEntriesDataSource$.subscribe(() => {

      fixture.detectChanges();

      const expectedColumnTitles = [
        'Date',
        'Time in - out',
        'Duration',
        'Customer',
        'Project',
        'Activity',
        '',
      ];

      const columnTitles: string[] = [];

      const HTMLTimeEntriesDebugElement: DebugElement = fixture.debugElement;
      const HTMLTimeEntriesElement: HTMLElement = HTMLTimeEntriesDebugElement.nativeElement;
      const HTMLTimeEntriesTable = HTMLTimeEntriesElement.querySelector('.table') as HTMLTableElement;
      const HTMLTableHead = HTMLTimeEntriesTable.rows[0];

      Array.from(HTMLTableHead.cells).forEach(columnTitle => {
        columnTitles.push(columnTitle.innerText);
      });
      expect(expectedColumnTitles).toEqual(columnTitles);
    });
  }));

  it('when the data source is loaded, the entry should to have customer_name field', waitForAsync(() => {
    component.timeEntriesDataSource$.subscribe(dataSource => {
      const entryData = dataSource.data[0];
      expect(entryData.customer_name).toContain('ioet Inc.');
    });
  }));

  it('Should the entry be null if the flag is true', () => {
    component.wasEditingExistingTimeEntry = true;
    const idEntry = '1';
    component.editEntry(idEntry);
    component.newEntry();
    expect(component.entry).toBe(null);
  });

  it('Should the input persist the data if the flag is false', () => {
    const newEntry = { start_date: new Date(), id: '1234', technologies: [], project_name: 'time-tracker' };
    component.entry = newEntry;
    component.wasEditingExistingTimeEntry = false;
    component.newEntry();
    expect(component.entry).toEqual(newEntry);
  });

  it('When I stop dragging the modal, it should reset Draggable Position', () => {
    const dragEndEventStub = {
      source: {
        _dragRef: {
          reset: () => { }
        }
      }
    };
    spyOn(dragEndEventStub.source._dragRef, 'reset');
    component.resetDraggablePosition(dragEndEventStub);
    expect(dragEndEventStub.source._dragRef.reset).toHaveBeenCalled();
  });

  it('component.doSave shouldn´t be called when saving the runningEntry with start_date overlapped', () => {
    const startDate = new Date(2021, 6, 1, 10, 0);
    const endDate = new Date(2021, 6, 1, 10, 55);
    const newRunningEntry = { start_date: endDate, id: '1234', technologies: [], project_name: 'time-tracker', running: true };
    const newEntry = { start_date: startDate, end_date: endDate, id: '4321', technologies: [], project_name: 'time-tracker'};

    state.timeEntriesDataSource.data = [newRunningEntry, newEntry];
    component.activeTimeEntry = newRunningEntry;
    component.entryId = newRunningEntry.id;
    spyOn(component, 'doSave');

    const startDateModified = new Date(2021, 6, 1, 10, 50);
    const RunningEntryModified = {
      entry: {
        start_date: startDateModified,
        id: '1234',
        technologies: ['py'],
        project_name: 'time-tracker',
        running: true
      }, shouldRestartEntry: false
    };
    component.saveEntry(RunningEntryModified);

    expect(component.doSave).toHaveBeenCalledTimes(0);
  });

  it('call cookieService.get() when call ngOnInit', () => {
    spyOn(cookieService, 'get');
    const sentParameter = FeatureToggle.TIME_TRACKER_CALENDAR;

    component.ngOnInit();

    expect(cookieService.get).toHaveBeenCalledWith(sentParameter);
  });

  it('set false in isFeatureToggleCalendarActive when cookie does not exist', () => {
    spyOn(cookieService, 'get');

    component.ngOnInit();

    expect(component.isFeatureToggleCalendarActive).toBeFalse();
  });

  it('set true in isFeatureToggleCalendarActive when cookiesService.get() return true', () => {
    const cookieResponseValue = 'true';
    spyOn(cookieService, 'get').and.returnValue(cookieResponseValue);

    component.ngOnInit();

    expect(component.isFeatureToggleCalendarActive).toBeTrue();
  });

  it('set false in isFeatureToggleCalendarActive when cookiesService.get() return false', () => {
    const cookieResponseValue = 'false';
    spyOn(cookieService, 'get').and.returnValue(cookieResponseValue);

    component.ngOnInit();

    expect(component.isFeatureToggleCalendarActive).toBeFalse();
  });

  it('set true in displayGridView when its initial value is false and call onDisplayModeChange', () => {
    const expectedValue = true;
    const initialValue = false;
    component.displayGridView = initialValue;

    component.onDisplayModeChange();

    expect(component.displayGridView).toEqual(expectedValue);
  });

  it('set false in displayGridView when its initial value is true and call onDisplayModeChange', () => {
    const expectedValue = false;
    const initialValue = true;
    component.displayGridView = initialValue;

    component.onDisplayModeChange();

    expect(component.displayGridView).toEqual(expectedValue);
  });

  it('set true in displayGridView when set false in constructor and call onDisplayModeChange', () => {
    const expectedValue = true;

    component.onDisplayModeChange();

    expect(component.displayGridView).toEqual(expectedValue);
  });

  it('set date in selectedDate when call dateSelected', () => {
    const monthIndex = 6;
    const year = 2021;
    const eventData = {
      monthIndex,
      year
    };
    const dateMoment: moment.Moment = moment().month(monthIndex).year(year);
    jasmine.clock().mockDate(dateMoment.toDate());

    component.actualDate.setMonth(monthIndex);
    component.dateSelected(eventData);

    expect(component.selectedDate).toEqual(dateMoment);
  });

  it('set date in selectedDate when call changeDate and selectedDate.month() is same to incoming date', () => {
    const incomingDate = new Date('2021-06-07');
    const incomingMoment: moment.Moment = moment(incomingDate);
    const eventData = {
      date: incomingDate
    };
    spyOn(component, 'dateSelected');
    component.selectedDate = moment(incomingMoment).subtract(1, 'day');

    component.changeDate(eventData);

    expect(component.dateSelected).not.toHaveBeenCalled();
    expect(component.selectedDate).toEqual(incomingMoment);
  });

  it('call dateSelected when call changeDate and selectedDate.month() is different to incoming date', () => {
    const incomingDate = new Date('2021-01-07');
    const incomingMoment: moment.Moment = moment(incomingDate);
    const eventData = {
      date: incomingDate
    };
    const selectedDate = {
      monthIndex: incomingMoment.month(),
      year: incomingMoment.year()
    };
    spyOn(component, 'dateSelected');
    component.selectedDate = moment(new Date('2021-07-07'));

    component.changeDate(eventData);

    expect(component.dateSelected).toHaveBeenCalledWith(selectedDate);
  });

  it('change component selectedDate to be the first day of the month when call dateSelected', () => {
    const actualDate: Date = new Date(2021, 5, 15);
    const selectedDate: Date = new Date(2021, 2, 1);
    const eventDate = {
      monthIndex: selectedDate.getMonth(),
      year: selectedDate.getFullYear()
    };
    component.actualDate = actualDate;
    component.dateSelected(eventDate);
    expect(component.selectedDate.date()).toBe(selectedDate.getDate());
  });

  it('change component calendarView from Month to Day when call changeView', () => {
    const fakeCalendarView: CalendarView = CalendarView.Day;
    const eventView = {
      calendarView: fakeCalendarView
    };
    component.calendarView = CalendarView.Month;
    component.changeView(eventView);
    expect(component.calendarView).toBe(fakeCalendarView);
  });

  it('change component calendarView to Month if undefined when call changeView', () => {
    component.calendarView = CalendarView.Week;
    const eventView = {
      calendarView: undefined
    };
    component.changeView(eventView);
    expect(component.calendarView).toBe(CalendarView.Month);
  });

  it('not view button onDisplayModeChange when isFeatureToggleCalendarActive is false', () => {
    component.isFeatureToggleCalendarActive = false;

    fixture.detectChanges();

    const HTMLTimeEntriesDebugElement: DebugElement = fixture.debugElement;
    const HTMLTimeEntriesElement: HTMLElement = HTMLTimeEntriesDebugElement.nativeElement;
    const HTMLTimeEntriesButton = HTMLTimeEntriesElement.querySelector('.btn.btn-primary.float-right');
    expect(HTMLTimeEntriesButton).toBeNull();
  });

  it('view list button when displayGridView is true and isFeatureToggleCalendarActive is true', () => {
    const expectedIconInsideButton = '.fa-list';
    const unexpectedIconInsideButton = '.fa-th';
    component.isFeatureToggleCalendarActive = true;
    component.displayGridView = true;

    fixture.detectChanges();

    const HTMLTimeEntriesDebugElement: DebugElement = fixture.debugElement;
    const HTMLTimeEntriesElement: HTMLElement = HTMLTimeEntriesDebugElement.nativeElement;
    const HTMLTimeEntriesButton = HTMLTimeEntriesElement.querySelector('.btn.btn-primary.float-right');
    const HTMLExpectedChildButton = HTMLTimeEntriesButton.querySelector(expectedIconInsideButton);
    const HTMLUnexpectedChildButton = HTMLTimeEntriesButton.querySelector(unexpectedIconInsideButton);
    expect(HTMLExpectedChildButton).not.toBeNull();
    expect(HTMLUnexpectedChildButton).toBeNull();
  });

  it('view calendar button when displayGridView is false and isFeatureToggleCalendarActive is true', () => {
    const expectedIconInsideButton = '.fa-th';
    const unexpectedIconInsideButton = '.fa-list';
    component.isFeatureToggleCalendarActive = true;
    component.displayGridView = false;

    fixture.detectChanges();

    const HTMLTimeEntriesDebugElement: DebugElement = fixture.debugElement;
    const HTMLTimeEntriesElement: HTMLElement = HTMLTimeEntriesDebugElement.nativeElement;
    const HTMLTimeEntriesButton = HTMLTimeEntriesElement.querySelector('.btn.btn-primary.float-right');
    const HTMLExpectedChildButton = HTMLTimeEntriesButton.querySelector(expectedIconInsideButton);
    const HTMLUnexpectedChildButton = HTMLTimeEntriesButton.querySelector(unexpectedIconInsideButton);
    expect(HTMLExpectedChildButton).not.toBeNull();
    expect(HTMLUnexpectedChildButton).toBeNull();
  });

  it('view calendarView when displayGridView is true', () => {
    const expectedView = '#gridView';
    component.displayGridView = true;

    fixture.detectChanges();

    const HTMLTimeEntriesDebugElement: DebugElement = fixture.debugElement;
    const HTMLTimeEntriesElement: HTMLElement = HTMLTimeEntriesDebugElement.nativeElement;
    const HTMLTimeEntriesView = HTMLTimeEntriesElement.querySelector(expectedView);

    expect(HTMLTimeEntriesView).not.toBeNull();
  });

  it('view listView when displayGridView is false', () => {
    const expectedView = '#listView';
    component.displayGridView = false;

    fixture.detectChanges();

    const HTMLTimeEntriesDebugElement: DebugElement = fixture.debugElement;
    const HTMLTimeEntriesElement: HTMLElement = HTMLTimeEntriesDebugElement.nativeElement;
    const HTMLTimeEntriesView = HTMLTimeEntriesElement.querySelector(expectedView);

    expect(HTMLTimeEntriesView).not.toBeNull();
  });
});
