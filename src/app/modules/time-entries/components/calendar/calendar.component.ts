import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DataSource } from '../../../shared/models/data-source.model';
import { Entry } from 'src/app/modules/shared/models';
import { map } from 'rxjs/operators';
import { SubstractDatePipe } from 'src/app/modules/shared/pipes/substract-date/substract-date.pipe';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Input() set timeEntries$(timeEntries: Observable<DataSource<Entry>>){
    this.castEntryToCalendarEvent(timeEntries);
  }
  @Input() calendarView: CalendarView = CalendarView.Month;
  @Input() currentDate: Date = new Date();

  @Output() viewModal: EventEmitter<any> = new EventEmitter<string>();
  @Output() deleteTimeEntry: EventEmitter<any> = new EventEmitter<string>();
  @Output() changeDate: EventEmitter<any> = new EventEmitter<{
    date: Date
  }>();

  initialDate: Date;
  previusDate: Date;
  timeEntriesAsEvent: CalendarEvent[];
  nextDateDisabled: boolean;

  constructor() {
    this.initialDate = new Date();
    this.previusDate = new Date();
    this.timeEntriesAsEvent = [];
    this.nextDateDisabled = true;
   }

  ngOnInit(): void {
    this.navigationEnable(this.calendarView);
  }

  get CalendarViewEnum(): typeof CalendarView{
    return CalendarView;
  }

  castEntryToCalendarEvent(timeEntries$: Observable<DataSource<Entry>>) {
    timeEntries$.pipe(
      map((timeEntriesDatasorce) => timeEntriesDatasorce.data.map(
          (timeEntries) => ({
              start: new Date(timeEntries.start_date),
              end: timeEntries.end_date === null ? null : new Date(timeEntries.end_date),
              title: timeEntries.description,
              id: timeEntries.id,
              meta: timeEntries
            } as CalendarEvent)
        )
      )
    )
    .subscribe((timeEntriesAsEvent) => {
        this.timeEntriesAsEvent = [...timeEntriesAsEvent].reverse();
    });
  }

  handleEditEvent(timeEntryAsEvent: CalendarEvent): void {
    this.viewModal.emit( {
      id: timeEntryAsEvent.id
    });
  }

  handleDeleteEvent(timeEntryAsEvent: CalendarEvent): void {
    this.deleteTimeEntry.emit({
      timeEntry: timeEntryAsEvent.meta
    });
  }

  handleChangeDateEvent(): void{
    const date = this.currentDate;
    this.navigationEnable(this.calendarView);
    this.changeDate.emit({date});
  }

  changeCalendarView(calendarView: CalendarView){
    this.calendarView = calendarView;
  }

  navigationEnable(calendarView: CalendarView){
    let enable = false;
    const currentDate = moment(this.currentDate);
    const initialDate = moment(this.initialDate);
    if (calendarView === CalendarView.Month){
      if (currentDate.month() === initialDate.month() && currentDate.year() === initialDate.year()) {
        enable = true;
      }
    }
    currentDate.add(1, 'day');
    if (currentDate > initialDate){
      enable = true;
    }
    this.nextDateDisabled = enable;
  }

  getTimeWork(startDate: Date, endDate: Date): number{
    if (endDate === null){
      return 30;
    }
    return new SubstractDatePipe().transformInMinutes( endDate , startDate);
  }

  timeIsGreaterThan(startDate: Date, endDate: Date, timeRange: number ): boolean{
    const timeWorkInMinutes = this.getTimeWork(startDate, endDate);
    return timeWorkInMinutes > timeRange;
  }

  isVisibleForCurrentView(currentCalendarView: CalendarView, desiredView: CalendarView ): boolean{
    return currentCalendarView === desiredView;
  }
}
