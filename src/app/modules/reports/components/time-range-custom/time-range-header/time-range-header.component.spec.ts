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
    stateChanges:{
      pipe: () => {
        return of({sucess: 'test'})
      }
    },
    activeDate: new Date()
  }

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

  it('should click previous year button with fakeAsync', fakeAsync(() => {
    let buttonElement = fixture.debugElement.query(By.css('.time-range-double-arrow'));

    spyOn(component, 'previousClicked');
    buttonElement.triggerEventHandler('click', null);

    tick();
    expect(component.previousClicked).toHaveBeenCalledWith('year');
  }));

  it('should click previous year month button', fakeAsync(() => {
    let buttonElement = fixture.debugElement.query(By.css('.time-range-month'));

    spyOn(component, 'previousClicked');
    buttonElement.triggerEventHandler('click', null);

    tick();
    expect(component.previousClicked).toHaveBeenCalledWith('month');
  }));

  it('should click next month button', fakeAsync(() => {
    let buttonElement = fixture.debugElement.query(By.css('.time-range-month-next'));

    spyOn(component, 'nextClicked');
    buttonElement.triggerEventHandler('click', null);

    tick();
    expect(component.nextClicked).toHaveBeenCalledWith('month');
  }));

  it('should click next year button with fakeAsync', fakeAsync(() => {
    let buttonElement = fixture.debugElement.query(By.css('.time-range-double-arrow-next'));

    spyOn(component, 'nextClicked');

    buttonElement.triggerEventHandler('click', null);

    tick();
    expect(component.nextClicked).toHaveBeenCalledWith('year');
  }));

  it('should call method changeDate with nextClicked', () => {
    spyOn(component, 'changeDate').withArgs('month', 1)
    component.nextClicked('month');
    expect(component.changeDate).toHaveBeenCalledWith('month', 1);
  });

  it('should call method changeDate with previousClicked', () => {
    spyOn(component, 'changeDate').withArgs('year', -1)
    component.previousClicked('year');
    expect(component.changeDate).toHaveBeenCalledWith('year', -1);
  });
  
});
