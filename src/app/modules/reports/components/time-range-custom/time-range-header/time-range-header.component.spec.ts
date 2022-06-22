import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCalendar, MatDateRangePicker } from '@angular/material/datepicker';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TimeRangeHeaderComponent } from './time-range-header.component';


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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatNativeDateModule],
      declarations: [ TimeRangeHeaderComponent ],
      providers: [{ provide: MatCalendar, useValue: value }, { provide: MatDateRangePicker, useValue: {} }] ,

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

  it('should call method changeDate with nextClicked', () => {
    spyOn(component, 'changeDate').withArgs('month', 1);
    component.nextClicked('month');
    expect(component.changeDate).toHaveBeenCalledWith('month', 1);
  });

  it('should call method changeDate with previousClicked', () => {
    spyOn(component, 'changeDate').withArgs('year', -1);
    component.previousClicked('year');
    expect(component.changeDate).toHaveBeenCalledWith('year', -1);
  });

  it('should change the activeDate with month on calendar', () => {
    const makeDateMonth = new Date();
    makeDateMonth.setMonth(makeDateMonth.getMonth() - 1);
    component.changeDate('month', -1);
    expect(component.calendar.activeDate.toDateString()).toEqual(makeDateMonth.toDateString());
  });

  it('should change the activeDate with year on calendar', () => {
    component.calendar.activeDate = new Date();
    fixture.detectChanges();
    const makeDateYear = new Date();
    makeDateYear.setFullYear(makeDateYear.getFullYear() - 1);
    component.changeDate('year', -1);
    expect(component.calendar.activeDate.toDateString()).toEqual(makeDateYear.toDateString());
  });

});
