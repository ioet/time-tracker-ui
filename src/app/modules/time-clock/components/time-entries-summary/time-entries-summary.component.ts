import { filter, takeUntil } from 'rxjs/operators';
import { SubstractDatePipe } from './../../../shared/pipes/substract-date/substract-date.pipe';
import { interval, Subscription, Subject } from 'rxjs';
import { Entry } from './../../../shared/models/entry.model';
import { getEntriesSummary } from './../../store/entry.selectors';
import { TimeEntriesSummary } from '../../models/time.entry.summary';
import { LoadEntriesSummary, LoadActiveEntry, EntryActionTypes } from './../../store/entry.actions';
import { EntryState } from './../../store/entry.reducer';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-time-entries-summary',
  templateUrl: './time-entries-summary.component.html',
  styleUrls: ['./time-entries-summary.component.css']
})
export class TimeEntriesSummaryComponent implements OnInit, OnDestroy {

  timeEntriesSummary: TimeEntriesSummary;
  currentWorkingTime: string;
  destroyed$ = new Subject<boolean>();

  loadActiveEntry: Subscription;
  loadActiveEntryLost: Subscription;
  stopEntry: Subscription;
  startEntry: Subscription;
  timeInterval;

  constructor(private store: Store<EntryState>, private actionsSubject$: ActionsSubject) { }

  ngOnDestroy(): void {
    this.loadActiveEntry.unsubscribe();
    this.loadActiveEntryLost.unsubscribe();
    this.stopEntry.unsubscribe();
    this.startEntry.unsubscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadActiveEntry());

    this.loadActiveEntryLost = this.actionsSubject$.pipe(
      filter((action: any) => (
        action.type === EntryActionTypes.LOAD_ACTIVE_ENTRY_FAIL
      ))
    ).subscribe(() => {
      this.blankCurrentWorkingTime();
    });

    this.loadActiveEntry = this.actionsSubject$.pipe(
      filter((action: any) => (
        action.type === EntryActionTypes.LOAD_ACTIVE_ENTRY_SUCCESS
      ))
    ).subscribe((action) => {
      this.updateCurrentWorkingHours(action.payload);
    });

    this.stopEntry = this.actionsSubject$.pipe(
      filter((action: any) => (
        action.type === EntryActionTypes.STOP_TIME_ENTRY_RUNNING_SUCCESS
      ))
    ).subscribe(() => {
      this.destroyed$.next(true);
      this.blankCurrentWorkingTime();
    });

    this.startEntry = this.actionsSubject$.pipe(
      filter((action: any) => (
        action.type === EntryActionTypes.CREATE_ENTRY_SUCCESS
      ))
    ).subscribe(() => {
      this.store.dispatch(new LoadActiveEntry());
      this.blankCurrentWorkingTime();
    });

    this.store.dispatch(new LoadEntriesSummary());
    const timeEntriesSummary$ = this.store.pipe(select(getEntriesSummary));
    timeEntriesSummary$.subscribe((response) => {
      this.timeEntriesSummary = response;
    });
  }

  blankCurrentWorkingTime() {
    this.currentWorkingTime = '--:--';
  }

  updateCurrentWorkingHours(entry: Entry) {
    if (this.timeInterval) {
      this.destroyed$.next(false);
    }
    if (entry) {
      this.timeInterval = interval(1000).pipe(
        takeUntil(this.destroyed$)
      ).subscribe(() => {
        this.currentWorkingTime = new SubstractDatePipe().transform(new Date(), new Date(entry.start_date), true);
      });
    }
  }
}
