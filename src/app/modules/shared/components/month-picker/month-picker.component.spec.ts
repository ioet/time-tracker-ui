import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import * as moment from 'moment';
import { NEVER } from 'rxjs';

import { MonthPickerComponent } from './month-picker.component';

describe('MonthPickerComponent', () => {
  let component: MonthPickerComponent;
  let fixture: ComponentFixture<MonthPickerComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthPickerComponent);
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

  it('monthEnable set disable true in the buttoms futures', () => {
    const monthFuture =  component.monthCurrent + 1;
    expect(component.monthEnable(monthFuture)).toBeTrue();
  });

  it('monthEnable set disable false in the buttoms presents and past', () => {
    const monthFuture = component.monthCurrent;
    expect(component.monthEnable(monthFuture)).toBeFalse();
  });

});
