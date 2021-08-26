import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DataSource } from '../../../shared/models/data-source.model';
import { Entry } from 'src/app/modules/shared/models';
import { map } from 'rxjs/operators';
import { SubstractDatePipe } from 'src/app/modules/shared/pipes/substract-date/substract-date.pipe';
import { differenceInMinutes, startOfDay, startOfHour } from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  readonly HALF_HOUR: number = 30;
  readonly DEFAULT_HEADER_HEIGHT = 52;
  readonly VARIATION_HEIGHT: number = 2;
  readonly VISIBLE_TARGETS_FOR_TIME_ENTRIES_DESCRIPTION: CalendarView[] = [CalendarView.Week, CalendarView.Day];
  readonly CALENDAR_VIEW_ENUM: typeof CalendarView = CalendarView;
  readonly WEEK_START_DAY = DAYS_OF_WEEK.MONDAY;

  @ViewChild('scrollContainer') scrollContainer: ElementRef<HTMLElement>;

  @Input() set timeEntries$(timeEntries: Observable<DataSource<Entry>>) {
    this.castEntryToCalendarEvent(timeEntries);
  }

  @Input() calendarView: CalendarView = CalendarView.Month;
  @Input() currentDate: Date = new Date();

  @Output() viewModal: EventEmitter<any> = new EventEmitter<string>();
  @Output() deleteTimeEntry: EventEmitter<any> = new EventEmitter<string>();
  @Output() changeDate: EventEmitter<any> = new EventEmitter<{
    date: Date;
  }>();
  @Output() changeView: EventEmitter<any> = new EventEmitter<{
    calendarView: CalendarView;
  }>();

  initialDate: Date;
  previusDate: Date;
  isToday: boolean;
  timeEntriesAsEvent: CalendarEvent[];
  nextDateDisabled: boolean;

  constructor(private referenceChangeDetector: ChangeDetectorRef) {
    this.initialDate = new Date();
    this.previusDate = new Date();
    this.isToday = false;
    this.timeEntriesAsEvent = [];
    this.nextDateDisabled = true;
  }

  ngOnInit(): void {
    this.isToday = this.isVisibleForCurrentDate();
    this.navigationEnable(this.calendarView);
  }

  scrollToCurrentTimeMarker() {
    if (this.calendarView === CalendarView.Week || CalendarView.Day) {
      const minutesSinceStartOfDay = differenceInMinutes(startOfHour(this.currentDate), startOfDay(this.currentDate));
      const headerHeight = this.calendarView === CalendarView.Week ? this.DEFAULT_HEADER_HEIGHT : 0;
      this.scrollContainer.nativeElement.scrollTop = minutesSinceStartOfDay * this.VARIATION_HEIGHT + headerHeight;
    }
  }

  castEntryToCalendarEvent(timeEntries$: Observable<DataSource<Entry>>) {
    timeEntries$
      .pipe(
        map((timeEntriesDatasorce) =>
          timeEntriesDatasorce.data.map(
            (timeEntries) =>
              ({
                start: new Date(timeEntries.start_date),
                end: timeEntries.end_date ? new Date(timeEntries.end_date) : null,
                title: timeEntries.description,
                id: timeEntries.id,
                meta: timeEntries,
              } as CalendarEvent)
          )
        )
      )
      .subscribe((timeEntriesAsEvent) => {
        this.timeEntriesAsEvent = [...timeEntriesAsEvent].reverse();
      });
  }

  handleEditEvent(timeEntryAsEvent: CalendarEvent): void {
    this.viewModal.emit({
      id: timeEntryAsEvent.id,
    });
  }

  handleDeleteEvent(timeEntryAsEvent: CalendarEvent): void {
    this.deleteTimeEntry.emit({
      timeEntry: timeEntryAsEvent.meta,
    });
  }

  handleChangeDateEvent(): void {
    const date = this.currentDate;
    this.isToday = this.isVisibleForCurrentDate();
    this.navigationEnable(this.calendarView);
    this.changeDate.emit({ date });
  }

  changeCalendarView(calendarView: CalendarView) {
    this.calendarView = calendarView;
    this.scrollContainer.nativeElement.scrollTop = 0;
    if (this.calendarView !== CalendarView.Month) {
      this.referenceChangeDetector.detectChanges();
      this.scrollToCurrentTimeMarker();
    }
    this.changeView.emit({ calendarView });
  }

  navigationEnable(calendarView: CalendarView) {
    let enable = false;
    const currentDate = moment(this.currentDate);
    const initialDate = moment(this.initialDate);
    if (calendarView === CalendarView.Month) {
      if (currentDate.month() === initialDate.month() && currentDate.year() === initialDate.year()) {
        enable = true;
      }
    }
    currentDate.add(1, 'day');
    if (currentDate > initialDate) {
      enable = true;
    }
    this.nextDateDisabled = enable;
  }

  getTimeWork(startDate: Date, endDate: Date): number {
    if (!endDate) {
      return 30;
    }
    return new SubstractDatePipe().transformInMinutes(endDate, startDate);
  }

  getCardEntryHeight(startDate: Date, endDate: Date): number {
    const heightCard = this.getTimeWork(startDate, endDate) * this.VARIATION_HEIGHT;
    const finalHeightCard = heightCard / 10;
    return Math.floor(finalHeightCard);
  }

  timeIsGreaterThan(startDate: Date, endDate: Date, timeRange: number): boolean {
    const timeWorkInMinutes = this.getTimeWork(startDate, endDate);
    return timeWorkInMinutes > timeRange;
  }

  isVisibleForCurrentView(currentCalendarView: CalendarView, desiredView: CalendarView[]): boolean {
    return desiredView.includes(currentCalendarView);
  }

  isVisibleForCurrentDate(): boolean {
    const currentDate: Date = new Date(this.currentDate);
    const initialDate: Date = new Date(this.initialDate);
    return currentDate.setHours(0, 0, 0, 0) === initialDate.setHours(0, 0, 0, 0);
  }
}
