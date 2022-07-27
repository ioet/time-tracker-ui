import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy
} from '@angular/core';
import {MatCalendar} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats} from '@angular/material/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


@Component({
  // selector: 'app-time-range-header',
  styleUrls: ['./time-range-header.component.scss'],
  templateUrl: './time-range-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeRangeHeaderComponent<D> implements OnDestroy {
  private destroyed = new Subject<void>();

  constructor(
      public calendar: MatCalendar<D>, public dateAdapter: DateAdapter<D>,
      @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats, cdr: ChangeDetectorRef) {
    calendar.stateChanges
        .pipe(takeUntil(this.destroyed))
        .subscribe(() => cdr.markForCheck());
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  get periodLabel() {
    return this.dateAdapter
        .format(this.calendar.activeDate, this.dateFormats.display.monthYearLabel)
        .toLocaleUpperCase();
  }

  previousClicked(mode: 'month' | 'year') {
    this.calendar.activeDate = mode === 'month' ?
        this.dateAdapter.addCalendarMonths(this.calendar.activeDate, -1) :
        this.dateAdapter.addCalendarYears(this.calendar.activeDate, -1);
  }

  nextClicked(mode: 'month' | 'year') {
    this.calendar.activeDate = mode === 'month' ?
        this.dateAdapter.addCalendarMonths(this.calendar.activeDate, 1) :
        this.dateAdapter.addCalendarYears(this.calendar.activeDate, 1);
  }
}
