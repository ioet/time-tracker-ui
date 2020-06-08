import { EntryState } from './../../store/entry.reducer';
import { TimeDetailsPipe } from './../../pipes/time-details.pipe';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TimeEntriesSummary } from './../../models/time.entry.summary';
import { TimeDetails } from './../../models/time.entry.summary';
import { async, ComponentFixture, TestBed, tick, fakeAsync, discardPeriodicTasks } from '@angular/core/testing';

import { TimeEntriesSummaryComponent } from './time-entries-summary.component';

describe('TimeEntriesSummaryComponent', () => {
  let component: TimeEntriesSummaryComponent;
  let fixture: ComponentFixture<TimeEntriesSummaryComponent>;
  let store: MockStore<EntryState>;

  const emptyTimeDetails: TimeDetails = { hours: '--:--', minutes: '--:--', seconds: '--:--' };
  const emptyTimeEntriesSummary: TimeEntriesSummary = { day: emptyTimeDetails, week: emptyTimeDetails, month: emptyTimeDetails };

  const timeTwoHoursBehind = new Date();
  timeTwoHoursBehind.setHours(timeTwoHoursBehind.getHours() - 2);

  const timeEntry = {
    id: '123',
    start_date: timeTwoHoursBehind,
    end_date: null,
    activity_id: '123',
    technologies: ['react', 'redux'],
    comments: 'any comment',
    uri: 'custom uri',
    project_id: '123'
  };

  const state = {
    active: timeEntry,
    entryList: [timeEntry],
    entries: [timeEntry],
    isLoading: false,
    message: '',
    createError: false,
    updateError: false,
    timeEntriesSummary: emptyTimeEntriesSummary,
    entriesForReport: [timeEntry],
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeEntriesSummaryComponent, TimeDetailsPipe ],
      providers: [provideMockStore({ initialState: state })
      ],
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEntriesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store.setState(state);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dispatches two actions on ngOnInit', () => {
    spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });

  it('runs the time on updateCurrentWorkingHours', fakeAsync(() => {
    component.updateCurrentWorkingHours(timeEntry);

    tick(1100);
    fixture.detectChanges();

    const elapsedTime = component.currentWorkingTime;
    const isElapsedTimeAtLeastTwoHours = elapsedTime.startsWith('02:00');
    expect(isElapsedTimeAtLeastTwoHours).toBe(true);
    discardPeriodicTasks();
  }));

});
