import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { Entry } from 'src/app/modules/shared/models';
import { DataSource } from 'src/app/modules/shared/models/data-source.model';

import { CalendarComponent } from './calendar.component';

type MockCardEntryHeight = {
  startDate: string;
  endDate: string;
  expected: number;
};

type MockEntryVisibleCurrentDate = {
  current: string;
  initial: string;
  expected: boolean;
};

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let currentDate: moment.Moment;
  let fakeEntry: Entry;
  let fakeEntryRunning: Entry;
  let mockCardEntriesHeight: MockCardEntryHeight[];
  let mockEntriesVisibleCurrentDate: MockEntryVisibleCurrentDate[];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CalendarComponent],
      }).compileComponents();
      mockCardEntriesHeight = [
        { startDate: '2021-04-11T08:00:00Z', endDate: '2021-04-11T10:20:00Z', expected: 28 },
        { startDate: '2021-04-12T17:00:00Z', endDate: '2021-04-12T17:00:00Z', expected: 0 },
        { startDate: '2021-04-11T18:00:00Z', endDate: '2021-04-12T18:00:00Z', expected: 288 },
        { startDate: '2021-04-12T12:00:00Z', endDate: '2021-04-12T12:01:01Z', expected: 0 },
      ];
      mockEntriesVisibleCurrentDate = [
        { current: '2021-04-11T10:20:00Z', initial: '2021-04-11T08:00:00Z', expected: true },
        { current: '2021-04-12T17:00:00Z', initial: '2021-04-11T17:00:00Z', expected: false },
        { current: '2021-04-11T18:00:00Z', initial: '2021-04-12T18:00:00Z', expected: false },
        { current: '2021-04-12T12:00:00Z', initial: '2021-04-12T12:00:00Z', expected: true },
      ];
      currentDate = moment();
      fakeEntry = {
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
      fakeEntryRunning = {
        id: 'entry_1',
        project_id: 'abc',
        project_name: 'Time-tracker',
        start_date: new Date('2020-02-05T15:36:15.887Z'),
        end_date: null,
        customer_name: 'ioet Inc.',
        activity_id: 'development',
        technologies: ['Angular', 'TypeScript'],
        description: 'No comments',
        uri: 'EY-25',
      };

      jasmine.clock().mockDate(currentDate.toDate());
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call castEntryToCalendarEvent when set timeEntries$', () => {
    const fakeTimeEntries = new Observable<DataSource<Entry>>();
    spyOn(component, 'castEntryToCalendarEvent');

    component.timeEntries$ = fakeTimeEntries;

    expect(component.castEntryToCalendarEvent).toHaveBeenCalledWith(fakeTimeEntries);
  });

  it('set [] in timeEntriesAsEvent when call castEntryToCalendarEvent and timeEntries is empty', () => {
    const expectedtimeEntriesAsEvent = [];
    const fakeTimeEntries = new Observable<DataSource<Entry>>();

    component.castEntryToCalendarEvent(fakeTimeEntries);

    expect(component.timeEntriesAsEvent).toEqual(expectedtimeEntriesAsEvent);
  });

  it('set [entry] in timeEntriesAsEvent when call castEntryToCalendarEvent and timeEntries is not empty', () => {
    const fakeTimeEntryAsEvent: CalendarEvent = {
      start: fakeEntry.start_date,
      end: fakeEntry.end_date,
      title: fakeEntry.description,
      id: fakeEntry.id,
      meta: fakeEntry,
    };
    const fakeDatasource = {
      isLoading: false,
      data: [fakeEntry],
    };
    const fakeTimeEntries = of(fakeDatasource);
    const expectedtimeEntriesAsEvent = [fakeTimeEntryAsEvent];

    component.castEntryToCalendarEvent(fakeTimeEntries);

    expect(component.timeEntriesAsEvent).toEqual(expectedtimeEntriesAsEvent);
    expect(component.timeEntriesAsEvent.length).toEqual(1);
  });

  it('set [entry] without endDate in timeEntriesAsEvent when call castEntryToCalendarEvent and timeEntries is not empty', () => {
    const fakeTimeEntryAsEvent: CalendarEvent = {
      start: fakeEntryRunning.start_date,
      end: fakeEntryRunning.end_date,
      title: fakeEntryRunning.description,
      id: fakeEntryRunning.id,
      meta: fakeEntryRunning,
    };
    const fakeDatasource = {
      isLoading: false,
      data: [fakeEntryRunning],
    };
    const fakeTimeEntries = of(fakeDatasource);
    const expectedtimeEntriesAsEvent = [fakeTimeEntryAsEvent];

    component.castEntryToCalendarEvent(fakeTimeEntries);

    expect(component.timeEntriesAsEvent).toEqual(expectedtimeEntriesAsEvent);
    expect(component.timeEntriesAsEvent.length).toEqual(1);
  });

  it('Call isVisibleForCurrentDate when call ngOnInit()', () => {
    spyOn(component, 'isVisibleForCurrentDate');

    component.ngOnInit();

    expect(component.isVisibleForCurrentDate).toHaveBeenCalled();
  });

  it('Call navigationEnable when call ngOnInit()', () => {
    spyOn(component, 'navigationEnable');

    component.ngOnInit();

    expect(component.navigationEnable).toHaveBeenCalledWith(CalendarView.Month);
  });

  it('emit time entry id when call handleEditEvent', () => {
    const fakeTimeEntryAsEvent: CalendarEvent = {
      start: fakeEntry.start_date,
      end: fakeEntry.end_date,
      title: fakeEntry.description,
      id: fakeEntry.id,
      meta: fakeEntry,
    };
    const fakeValueEmit = {
      id: fakeEntry.id,
    };
    spyOn(component.viewModal, 'emit');

    component.handleEditEvent(fakeTimeEntryAsEvent);

    expect(component.viewModal.emit).toHaveBeenCalledWith(fakeValueEmit);
  });

  it('emit time entry meta when call handleDeleteEvent', () => {
    const fakeTimeEntryAsEvent: CalendarEvent = {
      start: fakeEntry.start_date,
      end: fakeEntry.end_date,
      title: fakeEntry.description,
      id: fakeEntry.id,
      meta: fakeEntry,
    };
    const fakeValueEmit = {
      timeEntry: fakeEntry,
    };
    spyOn(component.deleteTimeEntry, 'emit');

    component.handleDeleteEvent(fakeTimeEntryAsEvent);

    expect(component.deleteTimeEntry.emit).toHaveBeenCalledWith(fakeValueEmit);
  });

  it('emit current date and call navigationEnable when call handleChangeDateEvent', () => {
    const calendarView: CalendarView = CalendarView.Month;
    const fakeValueEmit = {
      date: currentDate.toDate()
    };
    spyOn(component, 'navigationEnable');
    spyOn(component.changeDate, 'emit');
    spyOn(component, 'isVisibleForCurrentDate');

    component.handleChangeDateEvent();

    expect(component.navigationEnable).toHaveBeenCalledWith(calendarView);
    expect(component.isVisibleForCurrentDate).toHaveBeenCalled();
    expect(component.changeDate.emit).toHaveBeenCalledWith(fakeValueEmit);
  });

  it('set incoming calendarView in calendarView when call changeCalendarView', () => {
    const fakeCalendarView: CalendarView = CalendarView.Day;

    component.changeCalendarView(CalendarView.Day);

    expect(component.calendarView).toEqual(fakeCalendarView);
  });

  it('emit calendarView Day when call changeCalendarView', () => {
    const fakeCalendarView: CalendarView = CalendarView.Day;
    component.calendarView = CalendarView.Month;
    spyOn(component.changeView, 'emit');
    component.changeCalendarView(fakeCalendarView);
    expect(component.changeView.emit).toHaveBeenCalledWith({ calendarView: fakeCalendarView });
  });

  it('set srcoll to current time marker in calendarView when is call scrollToCurrentTimeMarker', () => {
    const fakeCalendarView: CalendarView = CalendarView.Week;
    spyOn(component, 'scrollToCurrentTimeMarker');
    component.changeCalendarView(fakeCalendarView);
    expect(component.scrollToCurrentTimeMarker).toHaveBeenCalled();
  });

  it('set false in nextDateDisabled when call navigationEnable and calendarView != Month and currentDate + 1 day is not greater to initialDate', () => {
    component.currentDate = moment().subtract(2, 'day').toDate();
    component.initialDate = moment().toDate();

    component.navigationEnable(CalendarView.Week);

    expect(component.nextDateDisabled).toBeFalse();
  });

  it('false in nextDateDisabled when call navigationEnable and calendarView == Month and currentDate.month != initialDate.month', () => {
    component.currentDate = moment().subtract(2, 'month').toDate();
    component.initialDate = moment().toDate();

    component.navigationEnable(CalendarView.Month);

    expect(component.nextDateDisabled).toBeFalse();
  });

  it('set false in nextDateDisabled when call navigationEnable and calendarView == Month and currentDate.year != initialDate.year', () => {
    component.currentDate = moment().subtract(2, 'year').toDate();
    component.initialDate = moment().toDate();

    component.navigationEnable(CalendarView.Month);

    expect(component.nextDateDisabled).toBeFalse();
  });

  it('set true in nextDateDisabled when call navigationEnable and calendarView == Month and currentDate equal to initialDate', () => {
    component.currentDate = moment().toDate();
    component.initialDate = moment().toDate();

    component.navigationEnable(CalendarView.Month);

    expect(component.nextDateDisabled).toBeTrue();
  });

  it('set true in nextDateDisabled when call navigationEnable and calendarView != Month and currentDate isGreater than initialDate', () => {
    component.currentDate = moment().toDate();
    component.initialDate = moment().toDate();

    component.navigationEnable(CalendarView.Week);

    expect(component.nextDateDisabled).toBeTrue();
  });

  it('return 30 when call getTimeWork and end date is null', () => {
    const expectedValue = 30;

    const response = component.getTimeWork(fakeEntryRunning.start_date, fakeEntryRunning.end_date);

    expect(response).toEqual(expectedValue);
  });

  it('return subtraction between start date an end date in minutes when call getTimeWork', () => {
    const expectedValue = 20;
    const minutesToBeAdded = 20;
    fakeEntry.start_date = moment().toDate();
    fakeEntry.end_date = moment().add(minutesToBeAdded, 'minute').toDate();

    const response = component.getTimeWork(fakeEntry.start_date, fakeEntry.end_date);

    expect(response).toEqual(expectedValue);
  });

  it('return true when call timeIsGreaterThan and subtraction between start date an end date is greater than incoming timeRange', () => {
    const minutesToBeAdded = 20;
    const timeRangeIncoming = 10;
    fakeEntry.start_date = moment().toDate();
    fakeEntry.end_date = moment().add(minutesToBeAdded, 'minute').toDate();

    const response = component.timeIsGreaterThan(fakeEntry.start_date, fakeEntry.end_date, timeRangeIncoming);

    expect(response).toBeTrue();
  });

  it('return false when call timeIsGreaterThan and subtraction between start date an end date is less than incoming timeRange', () => {
    const minutesToBeAdded = 10;
    const timeRangeIncoming = 20;
    fakeEntry.start_date = moment().toDate();
    fakeEntry.end_date = moment().add(minutesToBeAdded, 'minute').toDate();

    const response = component.timeIsGreaterThan(fakeEntry.start_date, fakeEntry.end_date, timeRangeIncoming);

    expect(response).toBeFalse();
  });

  it('return true when call isVisibleForCurrentView and currentCalendarView is equal to desiredView', () => {
    const currentCalendarView: CalendarView = CalendarView.Week;
    const desiredView: CalendarView = CalendarView.Week;
    const response = component.isVisibleForCurrentView(currentCalendarView, [desiredView]);

    expect(response).toBeTrue();
  });

  it('return false when call isVisibleForCurrentView and currentCalendarView is different to desiredView', () => {
    const currentCalendarView: CalendarView = CalendarView.Day;
    const desiredView: CalendarView = CalendarView.Week;
    const response = component.isVisibleForCurrentView(currentCalendarView, [desiredView]);

    expect(response).toBeFalse();
  });

  it('returns boolean when call isVisibleForCurrentDate', () => {
    mockEntriesVisibleCurrentDate.forEach((item: MockEntryVisibleCurrentDate) => {
      component.currentDate = new Date(item.current);
      component.initialDate = new Date(item.initial);
      const result = component.isVisibleForCurrentDate();

      expect(result).toBe(item.expected);
    });
  });

  it('return card entry height multiplied by height variation when call getCardEntryHeight', () => {
    mockCardEntriesHeight.forEach((item: MockCardEntryHeight) => {
      const fakeStartDate = new Date(item.startDate);
      const fakeEndDate = new Date(item.endDate);
      const result = component.getCardEntryHeight(fakeStartDate, fakeEndDate);

      expect(result).toBe(item.expected);
    });
  });
});
