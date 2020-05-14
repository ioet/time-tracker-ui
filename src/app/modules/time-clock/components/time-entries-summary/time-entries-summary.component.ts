import { getEntriesSummary } from './../../store/entry.selectors';
import { TimeEntriesSummary } from '../../models/time.entry.summary';
import { LoadEntriesSummary } from './../../store/entry.actions';
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

  constructor(private store: Store<EntryState>) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadEntriesSummary());
    const timeEntriesSummary$ = this.store.pipe(select(getEntriesSummary));
    timeEntriesSummary$.subscribe((response) => {
      this.timeEntriesSummary = response;
    });
  }

}
