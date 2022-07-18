import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { ToastrService } from 'ngx-toastr';


const customPresets = [
  'today',
  'last 7 days',
  'this week',
  'this month',
  'this year',
  'last week',
  'last month',
  'last year',
] as const;

type CustomPreset = typeof customPresets[number];
@Component({
  selector: 'app-time-range-options',
  templateUrl: './time-range-options.component.html',
  styleUrls: ['./time-range-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeRangeOptionsComponent<Date> {

  customPresets = customPresets;
  @HostBinding('class.touch-ui')
  readonly isTouchUi = this.picker.touchUi;
  constructor(
    public dateAdapter: DateAdapter<Date>,
    public picker: MatDateRangePicker<Date>,
    private toastrService: ToastrService
  ) {
    this.dateAdapter.getFirstDayOfWeek = () => 1;
  }

  selectRange(rangeName: CustomPreset): void {
    const [start, end] = this.calculateDateRange(rangeName);
    this.picker.select(start);
    this.picker.select(end);
    this.picker.close();
  }

  calculateDateRange(rangeName: CustomPreset): [start: Date, end: Date] {
    const today = this.getToday();
    const year = this.dateAdapter.getYear(today);

    switch (rangeName) {
      case 'today':
        return [today, today];
      case 'last 7 days': {
        const start = this.dateAdapter.addCalendarDays(today, -6);
        return [start, today];
      }
      case 'this week': {
        return this.calculateWeek(today);
      }
      case 'this month': {
        return this.calculateMonth(today);
      }
      case 'this year': {
        const start = this.dateAdapter.createDate(year, 0, 1);
        const end = this.dateAdapter.createDate(year, 11, 31);
        return [start, end];
      }
      case 'last week': {
        const thisDayLastWeek = this.dateAdapter.addCalendarDays(today, -7);
        return this.calculateWeek(thisDayLastWeek);
      }
      case 'last month': {
        const thisDayLastMonth = this.dateAdapter.addCalendarMonths(today, -1);
        return this.calculateMonth(thisDayLastMonth);
      }
      case 'last year': {
        const start = this.dateAdapter.createDate(year - 1, 0, 1);
        const end = this.dateAdapter.createDate(year - 1, 11, 31);
        return [start, end];
      }
    }
  }

  calculateMonth(forDay: Date): [start: Date, end: Date] {
    const year = this.dateAdapter.getYear(forDay);
    const month = this.dateAdapter.getMonth(forDay);
    const start = this.dateAdapter.createDate(year, month, 1);
    const end = this.dateAdapter.addCalendarDays(
      start,
      this.dateAdapter.getNumDaysInMonth(forDay) - 1
    );
    return [start, end];
  }

  calculateWeek(forDay: Date): [start: Date, end: Date] {
    const deltaStart =
      this.dateAdapter.getFirstDayOfWeek() -
      this.dateAdapter.getDayOfWeek(forDay);
    const start = this.dateAdapter.addCalendarDays(forDay, deltaStart);
    const end = this.dateAdapter.addCalendarDays(start, 6);
    return [start, end];
  }

  getToday(): Date {
    const today = this.dateAdapter.today();
    if (today === null) {
      this.toastrService.error('The end date should be after the start date');
    }
    return today;
  }

  resetTimeRange() {
    this.picker.select(undefined);
    this.picker.select(undefined);
  }

}
