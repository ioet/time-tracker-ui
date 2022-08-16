import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { ToastrService } from 'ngx-toastr';
import { TimeRangeOptionsComponent } from './time-range-options.component';


describe('TimeRangeOptionsComponent', () => {
  let component: TimeRangeOptionsComponent<any>;
  let fixture: ComponentFixture<TimeRangeOptionsComponent<any>>;
  const valueFunction = () => {
    return '';
  };
  const toastrServiceStub = {
    error: () => {
      return 'error';
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatNativeDateModule, MatDialogModule, MatListModule],
      declarations: [ TimeRangeOptionsComponent ],
      providers: [
        { provide: MatDateRangePicker, useValue: {select: valueFunction, close: valueFunction} },
        { provide: ToastrService, useValue: toastrServiceStub }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeRangeOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click selectRange button and call calculateDateRange method', () => {
    spyOn(component, 'calculateDateRange').and.returnValues(['', '']);
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

  it('should call getMondayCurrent, calculateMonth and calculateWeek method when is called calculateDateRange method', () => {

    const dataAll = [
      {method: 'getMondayCurrent', ranges: ['custom']},
      {method: 'calculateWeek', ranges: ['this week', 'last week']},
      {method: 'calculateMonth', ranges: ['this month', 'last month']}
    ];

    dataAll.forEach((val: any) => {
      spyOn(component, val.method);
      val.ranges.forEach((range: any) => {
        component.calculateDateRange(range);
        expect(component[val.method]).toHaveBeenCalled();
      });
    });
  });

  it('should return time range last year or this year when is called calculateDateRange method', () => {
    const currentYear = new Date().getFullYear();
    const dataAll = [
      {range: 'this year', values:
        {start: {year: currentYear, month: 0, day: 1},
         end: {year: currentYear, month: 11, day: 31}
        }
      },
      {range: 'last year',
      values:
        {start: {year: currentYear - 1, month: 0, day: 1},
         end: {year: currentYear - 1, month: 11, day: 31}
        }
      },
    ];
    dataAll.forEach((val: any) => {
      const [start, end] = component.calculateDateRange(val.range);
      expect(new Date(start).toDateString()).toEqual(
        new Date(val.values.start.year, val.values.start.month, val.values.start.day).toDateString());
      expect(new Date(end).toDateString()).toEqual(
        new Date(val.values.end.year, val.values.end.month, val.values.end.day).toDateString());
    });
  });

  it('should return a time range month when is called calculateMonth method', () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDays = new Date(currentYear, currentMonth + 1, 0).getDate();
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

  it('shows an error when the date created is null from date adapter', () => {
    spyOn(toastrServiceStub, 'error');
    spyOn(component.dateAdapter, 'today').and.returnValue(null);
    component.getToday();
    expect(toastrServiceStub.error).toHaveBeenCalled();
  });

  it('should call to method  an error when the date created is null from date adapter', () => {
    spyOn(component.dateAdapter, 'getYear').and.returnValues(2022);
    spyOn(component.dateAdapter, 'getMonth').and.returnValues(7);
    component.getMondayCurrent();
    expect(component.dateAdapter.getYear).toHaveBeenCalled();
    expect(component.dateAdapter.getMonth).toHaveBeenCalled();
  });

});
