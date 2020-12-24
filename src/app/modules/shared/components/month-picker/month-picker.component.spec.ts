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
    const year = moment().add(1, 'year').format('Y');
    expect(component.selectedYearMoment.add(1, 'year').format('Y')).toEqual(year);
    expect(component.updateYearText).toBeTruthy();
  });

  it('should subtract a year to current year', () => {
    const year = moment().subtract(1, 'year').format('Y');
    expect(component.selectedYearMoment.subtract(1, 'year').format('Y')).toEqual(year);
    expect(component.updateYearText).toBeTruthy();
  });

});
