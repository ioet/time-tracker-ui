import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
} from '@angular/core';
import {
  DateAdapter,
  MatDateFormats,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  // selector: 'app-time-range-header',
  templateUrl: './time-range-header.component.html',
  styleUrls: ['./time-range-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TimeRangeHeaderComponent<D> implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  constructor(
    public calendar: MatCalendar<D>,
    public dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef
  ) {
    calendar.stateChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => cdr.markForCheck());
  }

  get periodLabel(): string {
    return this.dateAdapter
      .format(this.calendar.activeDate, this.dateFormats.display.monthYearLabel)
      .toLocaleUpperCase();
  }

  previousClicked(mode: 'month' | 'year'): void {
    this.changeDate(mode, -1);
  }

  nextClicked(mode: 'month' | 'year'): void {
    this.changeDate(mode, 1);
  }

  changeDate(mode: 'month' | 'year', amount: -1 | 1): void {
    this.calendar.activeDate =
      mode === 'month'
        ? this.dateAdapter.addCalendarMonths(this.calendar.activeDate, amount)
        : this.dateAdapter.addCalendarYears(this.calendar.activeDate, amount);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
