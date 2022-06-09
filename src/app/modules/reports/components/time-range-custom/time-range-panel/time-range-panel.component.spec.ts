import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { TimeRangePanelComponent } from './time-range-panel.component';

describe('TimeRangePanelComponent', () => {
  let component: TimeRangePanelComponent<any>;
  let fixture: ComponentFixture<TimeRangePanelComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatNativeDateModule, MatDialogModule, MatCardModule],
      declarations: [ TimeRangePanelComponent ],
      providers: [{ provide: MatDateRangePicker, useValue: {select: () => {}, close: () => {}} }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeRangePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click selectRange button', () => {
    spyOn(component, 'selectRange');
    component.selectRange('this year');

    fixture.detectChanges();

    let button = fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(component.selectRange).toHaveBeenCalledWith('this year');
  });


  it('should click selectRange button and call calculateDateRange method', () => {
    spyOn(component, 'calculateDateRange').and.returnValues(['','']);
    component.selectRange('today');
    expect(component.calculateDateRange).toHaveBeenCalled();
  });

  it('should return current date when is called calculateDateRange method', () => {
    const [start , end] = component.calculateDateRange('today');
    expect(new Date(start).toDateString()).toEqual(new Date().toDateString());
    expect(new Date(end).toDateString()).toEqual(new Date().toDateString());
  });

  it('should return last 7 days when is called calculateDateRange method', () => {
    const [start , end] = component.calculateDateRange('last 7 days');
    const lastDate = new Date();
    lastDate.setDate(new Date().getDate() - 6);
    expect(new Date(start).toDateString()).toEqual(lastDate.toDateString());
    expect(new Date(end).toDateString()).toEqual(new Date().toDateString());
  });

  it('should call calculateWeek method when is called calculateDateRange method', () => {
    spyOn(component, 'calculateWeek');
    component.calculateDateRange('this week');
    expect(component.calculateWeek).toHaveBeenCalled();
  });

  it('should call calculateMonth method when is called calculateDateRange method', () => {
    spyOn(component, 'calculateMonth');
    component.calculateDateRange('this month');
    expect(component.calculateMonth).toHaveBeenCalled();
  });

  it('should return range current year when is called calculateDateRange method', () => {
    const currentYear = new Date().getFullYear();
    const [start , end] = component.calculateDateRange('this year');
    expect(new Date(start).toDateString()).toEqual(new Date(currentYear, 0, 1).toDateString());
    expect(new Date(end).toDateString()).toEqual(new Date(currentYear, 11, 31).toDateString());
  });

  it('should call calculateWeek with last week option method when is called calculateDateRange method', () => {
    spyOn(component, 'calculateWeek');
    component.calculateDateRange('last week');
    expect(component.calculateWeek).toHaveBeenCalled();
  });

  it('should call calculateMonth with last month method when is called calculateDateRange method', () => {
    spyOn(component, 'calculateMonth');
    component.calculateDateRange('last month');
    expect(component.calculateMonth).toHaveBeenCalled();
  });

  it('should return time range last year when is called calculateDateRange method', () => {
    const currentYear = new Date().getFullYear();
    const [start, end] = component.calculateDateRange('last year');
    expect(new Date(start).toDateString()).toEqual(new Date(currentYear - 1, 0, 1).toDateString());
    expect(new Date(end).toDateString()).toEqual(new Date(currentYear - 1, 11, 31).toDateString());
  });

  it('should return a time range month when is called calculateMonth method', () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDays= new Date(currentYear, currentMonth + 1, 0).getDate()
    const [start, end] = component.calculateMonth(new Date());
    expect(new Date(start).toDateString()).toEqual(new Date(currentYear, currentMonth, 1).toDateString());
    expect(new Date(end).toDateString()).toEqual(new Date(currentYear, currentMonth , currentDays).toDateString());
  });

  it('should return a time range week when is called calculateWeek method', () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const firstDay = new Date().getDate() - new Date().getDay() + 1;
    const lastDay = firstDay + 6;
    const [start, end] = component.calculateWeek(new Date());
    expect(new Date(start).toDateString()).toEqual(new Date(currentYear, currentMonth, firstDay).toDateString());
    expect(new Date(end).toDateString()).toEqual(new Date(currentYear, currentMonth , lastDay).toDateString());
  });

});
