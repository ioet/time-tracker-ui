import { SubstractDatePipe } from './../../../shared/pipes/substract-date/substract-date.pipe';
import { interval } from 'rxjs';
import { Entry } from './../../../shared/models/entry.model';
import { getEntriesSummary, getActiveTimeEntry } from './../../store/entry.selectors';
import { TimeEntriesSummary } from '../../models/time.entry.summary';
import { LoadEntriesSummary, LoadActiveEntry } from './../../store/entry.actions';
import { EntryState } from './../../store/entry.reducer';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-entries-summary',
  templateUrl: './time-entries-summary.component.html',
  styleUrls: ['./time-entries-summary.component.css']
})
export class TimeEntriesSummaryComponent implements OnInit {

  timeEntriesSummary: TimeEntriesSummary;
  currentWorkingTime: string;

  constructor(private store: Store<EntryState>) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadActiveEntry());
    const activeTimeEntry$ = this.store.pipe(select(getActiveTimeEntry));
    activeTimeEntry$.subscribe((response) => {
      if (response) {
        this.updateCurrentWorkingHours(response);
      }
    });

    this.store.dispatch(new LoadEntriesSummary());
    const timeEntriesSummary$ = this.store.pipe(select(getEntriesSummary));
    timeEntriesSummary$.subscribe((response) => {
      this.timeEntriesSummary = response;
    });
  }


  updateCurrentWorkingHours(entry: Entry) {
    const timeInterval = interval(1000);
    timeInterval.subscribe(() => {
      this.currentWorkingTime =
        new SubstractDatePipe()
          .transform(new Date(), new Date(entry.start_date));
    });
  }
}
