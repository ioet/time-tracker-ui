import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatCalendar, MatDateRangePicker } from '@angular/material/datepicker';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

import { TimeRangeHeaderComponent } from './time-range-header.component';
import { TimeRangeOptionsComponent } from '../time-range-options/time-range-options.component';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { MatListModule } from '@angular/material/list';


describe('TimeRangeHeaderComponent', () => {
  let component: TimeRangeHeaderComponent<any>;
  let fixture: ComponentFixture<TimeRangeHeaderComponent<any>>;
  const value = {
    stateChanges: {
      pipe: () => {
        return of({sucess: 'test'});
      }
    },
    activeDate: new Date()
  };

  const toastrServiceStub = {
    error: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatNativeDateModule, MatIconModule, MatListModule],
      declarations: [ TimeRangeHeaderComponent, TimeRangeOptionsComponent ],
      providers: [
        { provide: MatCalendar, useValue: value },
        { provide: MatDateRangePicker, useValue: {} },
        { provide: ToastrService, useValue: toastrServiceStub },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeRangeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click previous year, previous month, next year and next month button with fakeAsync', fakeAsync(() => {

    const buttonsAll = [
      {
        method: 'previousClicked',
        values: [
          {style: '.time-range-double-arrow', call: 'year'},
          {style: '.time-range-month', call: 'month'}
        ]
      },
      {
        method: 'nextClicked',
        values: [
          {style: '.time-range-month-next', call: 'month'},
          {style: '.time-range-double-arrow-next', call: 'year'}
        ]
      }];
    buttonsAll.forEach((button: any) => {
      spyOn(component, button.method);
      button.values.forEach((val: any) => {
        const buttonElement = fixture.debugElement.query(By.css(val.style));
        buttonElement.triggerEventHandler('click', null);
        tick();
        expect(component[button.method]).toHaveBeenCalledWith(val.call);
      });
    });
  }));

  it('should change the year with previousClicked method', () => {
    component.calendar.activeDate = new Date();
    fixture.detectChanges();
    const makeDateYear = new Date();
    makeDateYear.setFullYear(makeDateYear.getFullYear() - 1);
    component.previousClicked('year');
    expect(component.calendar.activeDate.toDateString()).toEqual(makeDateYear.toDateString());
  });

  it('should change the month with previousClicked method', () => {
    component.calendar.activeDate = new Date();
    fixture.detectChanges();
    const makeDateYear = new Date();
    makeDateYear.setMonth(makeDateYear.getMonth() - 1);
    component.previousClicked('month');
    expect(component.calendar.activeDate.toDateString()).toEqual(makeDateYear.toDateString());
  });


  it('should change the year with nextClicked method', () => {
    component.calendar.activeDate = new Date();
    fixture.detectChanges();
    const makeDateYear = new Date();
    makeDateYear.setFullYear(makeDateYear.getFullYear() + 1);
    component.nextClicked('year');
    expect(component.calendar.activeDate.toDateString()).toEqual(makeDateYear.toDateString());
  });

  it('should change the month with nextClicked method', () => {
    component.calendar.activeDate = new Date();
    fixture.detectChanges();
    const makeDateYear = new Date();
    makeDateYear.setMonth(makeDateYear.getMonth() + 1);
    component.nextClicked('month');
    expect(component.calendar.activeDate.toDateString()).toEqual(makeDateYear.toDateString());
  });

});
