import { Component, OnInit } from '@angular/core';
import { Entry } from '../../shared/models';
import { EntryState } from '../../time-clock/store/entry.reducer';
import { allEntries } from '../../time-clock/store/entry.selectors';
import { select, Store } from '@ngrx/store';
import * as entryActions from '../../time-clock/store/entry.actions';

@Component({
  selector: 'app-time-entries',
  templateUrl: './time-entries.component.html',
  styleUrls: ['./time-entries.component.scss'],
})
export class TimeEntriesComponent implements OnInit {
  showModal = false;
  entryId: string;
  entry: Entry;
  entryToDelete: Entry;
  dataByMonth = [];
  entryList: Entry[];

  constructor(private store: Store<EntryState>) {}

  ngOnInit(): void {
    this.store.dispatch(new entryActions.LoadEntries());
    const dataByMonth$ = this.store.pipe(select(allEntries));
    dataByMonth$.subscribe((response) => {
      this.entryList = response;
      this.dataByMonth = this.entryList.reduce((acc: any, entry: any) => {
        if (new Date(entry.start_date).getMonth() === new Date().getMonth()) {
          const item = { ...entry };
          return [...acc, item];
        }
        return [];
      }, []);
    });
  }

  newEntry() {
    this.entry = null;
    this.entryId = null;
  }

  editEntry(entryId: string) {
    this.entryId = entryId;
    this.entry = this.entryList.find((entry) => entry.id === entryId);
  }

  saveEntry(entry): void {
    if (this.entryId) {
      entry.id = this.entryId;
      this.store.dispatch(new entryActions.UpdateActiveEntry(entry));
    } else {
      this.store.dispatch(new entryActions.CreateEntry(entry));
    }
  }

  removeEntry(entryId: string) {
    this.store.dispatch(new entryActions.DeleteEntry(entryId));
  }

  getMonth(month: number) {
    this.dataByMonth = this.entryList.filter((entry) => new Date(entry.start_date).getMonth() === month);
  }
}
