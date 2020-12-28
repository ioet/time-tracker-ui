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
    expect(component.dateSelected.emit({ monthIndex: month, year: year }));
  });

  it('should add a year to current year', () => {
    component.selectedYearMoment = moment();
    const incrementYear = moment().add(1, 'year').format('Y');
    spyOn(component, 'increment').and.callThrough();

    component.increment();

    expect(component.increment).toHaveBeenCalled();
    expect(component.selectedYearText).toEqual(incrementYear);
    expect(component.selectedYearMoment.format('Y')).toEqual(incrementYear);
  });


  it('should subtract a year to current year', () => {
    component.selectedYearMoment = moment();
    const decrementYear = moment().subtract(1, 'year').format('Y');
    spyOn(component, 'decrement').and.callThrough();

    component.decrement();

    expect(component.decrement).toHaveBeenCalled();
    expect(component.selectedYearMoment.format('Y')).toEqual(decrementYear);
  });

});
