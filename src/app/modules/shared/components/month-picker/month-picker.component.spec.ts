import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { FeatureToggle } from 'src/environments/enum';

import { MonthPickerComponent } from './month-picker.component';

describe('MonthPickerComponent', () => {
  let component: MonthPickerComponent;
  let fixture: ComponentFixture<MonthPickerComponent>;
  let cookieService: CookieService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthPickerComponent);
    cookieService = TestBed.inject(CookieService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit monthIndex and year', () => {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    spyOn(component.dateSelected, 'emit');
    expect(component.dateSelected.emit({ monthIndex: month, year }));
  });


  it('should add a year to current year', () => {
    component.selectedYearMoment = moment();
    const incrementYear = moment().add(1, 'year').format('Y');
    spyOn(component, 'changeYear').and.callThrough();

    component.changeYear('add');

    expect(component.changeYear).toHaveBeenCalled();
    expect(component.selectedYearText).toEqual(incrementYear);
    expect(component.selectedYearMoment.format('Y')).toEqual(incrementYear);
    expect(component.showArrowNext).toBe(false, 'false to hidden arrow next in current year');
  });

  it('should subtract a year to current year', () => {
    component.selectedYearMoment = moment();
    const decrementYear = moment().subtract(1, 'year').format('Y');
    spyOn(component, 'changeYear').and.callThrough();

    component.changeYear('subtract');

    expect(component.changeYear).toHaveBeenCalled();
    expect(component.selectedYearMoment.format('Y')).toEqual(decrementYear);
    expect(component.showArrowNext).toBe(true, 'true to show arrow next in previous years');
  });

  it('selectMonth should call selectDate', () => {
    const monthSelect = new Date().getMonth();
    const yearSelect = new Date().getFullYear();
    spyOn(component, 'selectDate');

    component.selectMonth(monthSelect);

    expect(component.selectDate).toHaveBeenCalledWith(monthSelect, yearSelect);
  });

  it('monthEnable sets disabled to true on futures months', () => {
    const monthFuture =  component.monthCurrent + 1;
    expect(component.monthEnable(monthFuture)).toBeTrue();
  });

  it('call cookieService.get() when component was create', () => {
    spyOn(cookieService, 'get');

    component.ngOnInit();

    expect(cookieService.get).toHaveBeenCalledWith(FeatureToggle.TIME_TRACKER_CALENDAR);
  });

  it('set true in isFeatureToggleCalendarActive when component was create', () => {
    const expectCookieValue = true;
    spyOn(cookieService, 'get').and.returnValue(`${ expectCookieValue }`);

    component.ngOnInit();

    expect(component.isFeatureToggleCalendarActive).toEqual(expectCookieValue);
  });

  it('set false in isFeatureToggleCalendarActive when component was create', () => {
    const expectCookieValue = false;
    spyOn(cookieService, 'get').and.returnValue(`${ expectCookieValue }`);

    component.ngOnInit();

    expect(component.isFeatureToggleCalendarActive).toEqual(expectCookieValue);
  });

  it('set false in isFeatureToggleCalendarActive when cookie does not exist', () => {
    const expectCookieValue = false;
    spyOn(cookieService, 'get');

    component.ngOnInit();

    expect(component.isFeatureToggleCalendarActive).toEqual(expectCookieValue);
  });

  it('call refresData when updating the value of selectedDate', () => {
    const fakeSelectedDate: moment.Moment = moment(new Date());
    spyOn(component, 'refreshDate');

    component.selectedDate = fakeSelectedDate;

    expect(component.refreshDate).toHaveBeenCalledWith(fakeSelectedDate);
  });

  it('not set value of selectedDate in selectedDateMoment when isFeatureToggleCalendarActive is false', () => {
    const fakeSelectedDate: moment.Moment = moment(new Date('2021-07-05'));
    component.isFeatureToggleCalendarActive = false;

    component.refreshDate(fakeSelectedDate);

    expect(component.selectedDateMoment).not.toEqual(fakeSelectedDate);
  });

  it('set value of selectedDate in selectedDateMoment when isFeatureToggleCalendarActive is true', () => {
    const fakeSelectedDate: moment.Moment = moment(new Date('2021-07-05'));
    component.isFeatureToggleCalendarActive = true;

    component.refreshDate(fakeSelectedDate);

    expect(component.selectedDateMoment).toEqual(fakeSelectedDate);
  });


  it('set current Month index in selectedMonthIndex when isFeatureToggleCalendarActive is false', () => {
    const fakeSelectedDate: moment.Moment = moment(new Date('2021-07-05'));
    const currentDate: moment.Moment = moment(new Date());
    component.isFeatureToggleCalendarActive = false;

    component.refreshDate(fakeSelectedDate);

    expect(component.selectedMonthIndex).toEqual(currentDate.month());
  });

  it('set month of selectedDate in selectedMonthIndex when isFeatureToggleCalendarActive is true', () => {
    const fakeSelectedDate: moment.Moment = moment(new Date('2021-07-05'));
    component.isFeatureToggleCalendarActive = true;

    component.refreshDate(fakeSelectedDate);

    expect(component.selectedMonthIndex).toEqual(fakeSelectedDate.month());
  });

  it('set current year as a text in selectedYearText when isFeatureToggleCalendarActive is false', () => {
    const fakeSelectedDate: moment.Moment = moment(new Date('2020-07-05'));
    const currentDate: number = moment(new Date()).year();
    component.isFeatureToggleCalendarActive = false;

    component.refreshDate(fakeSelectedDate);

    expect(component.selectedYearText).toEqual(`${currentDate}`);
  });

  it('set year as a text of selectedDate in selectedYearText when isFeatureToggleCalendarActive is true', () => {
    const fakeSelectedDate: moment.Moment = moment(new Date('1999-07-05'));
    const expectedYear = '1999';
    component.isFeatureToggleCalendarActive = true;

    component.refreshDate(fakeSelectedDate);

    expect(component.selectedYearText).toEqual(expectedYear);
  });

  it('set current year in selectedYear when isFeatureToggleCalendarActive is false', () => {
    const fakeSelectedDate: moment.Moment = moment(new Date('2020-07-05'));
    const currentDate: number = moment(new Date()).year();
    component.isFeatureToggleCalendarActive = false;

    component.refreshDate(fakeSelectedDate);

    expect(component.selectedYear).toEqual(currentDate);
  });

  it('set year as a text of selectedDate in selectedYear when isFeatureToggleCalendarActive is true', () => {
    const fakeSelectedDate: moment.Moment = moment(new Date('1999-07-05'));
    const expectedYear = 1999;
    component.isFeatureToggleCalendarActive = true;

    component.refreshDate(fakeSelectedDate);

    expect(component.selectedYear).toEqual(expectedYear);
  });

  it('not true in showArrowNext when isFeatureToggleCalendarActive is false', () => {
    const fakeSelectedDate: moment.Moment = moment(new Date('1999-07-05'));
    component.isFeatureToggleCalendarActive = false;

    component.refreshDate(fakeSelectedDate);

    expect(component.showArrowNext).not.toEqual(true);
  });

  it('false in showArrowNext when isFeatureToggleCalendarActive is false', () => {
    const fakeSelectedDate: moment.Moment = moment(new Date('1999-07-05'));
    component.isFeatureToggleCalendarActive = false;

    component.refreshDate(fakeSelectedDate);

    expect(component.showArrowNext).toEqual(false);
  });

  it('set true in showArrowNext when isFeatureToggleCalendarActive is true', () => {
    const fakeSelectedDate: moment.Moment = moment(new Date('1999-07-05'));
    component.isFeatureToggleCalendarActive = true;

    component.refreshDate(fakeSelectedDate);

    expect(component.showArrowNext).toEqual(true);
  });

  it('set false in showArrowNext when isFeatureToggleCalendarActive is true', () => {
    const fakeSelectedDate: moment.Moment = moment(new Date()).add(1, 'month');
    component.isFeatureToggleCalendarActive = true;

    component.refreshDate(fakeSelectedDate);

    expect(component.showArrowNext).toEqual(false);
  });

  it('isSelectedMonth returns true when isFeatureToggleCalendarActive is true', () => {
    const fakeSelectedDate: moment.Moment = moment(new Date('2021-07-06'));
    const expectedReturn = true;
    const fakeFeatureToggleValue = true;
    component.selectedMonthIndex = fakeSelectedDate.month();
    component.selectedYear = fakeSelectedDate.year();
    component.selectedDateMoment = fakeSelectedDate;
    component.isFeatureToggleCalendarActive = fakeFeatureToggleValue;

    const response = component.isSelectedMonth(fakeSelectedDate.month());

    expect(response).toEqual(expectedReturn);
  });

  it('isSelectedMonth returns false when isFeatureToggleCalendarActive is true and the months are not the same', () => {
    const fakeSelectedDate: moment.Moment = moment(new Date('2021-07-06'));
    const expectedReturn = false;
    const fakeFeatureToggleValue = true;
    component.selectedMonthIndex = fakeSelectedDate.month();
    component.selectedYear = fakeSelectedDate.year();
    component.selectedDateMoment = fakeSelectedDate;
    component.isFeatureToggleCalendarActive = fakeFeatureToggleValue;

    const response = component.isSelectedMonth(fakeSelectedDate.add(1, 'month').month());

    expect(response).toEqual(expectedReturn);
  });

  it('isSelectedMonth returns false when isFeatureToggleCalendarActive is true and the years are not the same', () => {
    const fakeSelectedDate: moment.Moment = moment(new Date('2021-07-06'));
    const expectedReturn = false;
    const fakeFeatureToggleValue = true;
    component.selectedMonthIndex = fakeSelectedDate.month();
    component.selectedYear = fakeSelectedDate.year();
    component.selectedDateMoment = fakeSelectedDate.add(1, 'year');
    component.isFeatureToggleCalendarActive = fakeFeatureToggleValue;

    const response = component.isSelectedMonth(fakeSelectedDate.month());

    expect(response).toEqual(expectedReturn);
  });
});
