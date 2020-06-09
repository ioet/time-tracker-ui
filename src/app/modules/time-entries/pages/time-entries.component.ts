import { ToastrService } from 'ngx-toastr';
import { getActiveTimeEntry } from './../../time-clock/store/entry.selectors';
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
  entryId: string;
  entry: Entry;
  dataByMonth = [];
  activeTimeEntry: Entry;

  constructor(private store: Store<EntryState>, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.store.dispatch(new entryActions.LoadEntries(new Date().getMonth() + 1));
    const dataByMonth$ = this.store.pipe(select(allEntries));
    dataByMonth$.subscribe((response) => {
      this.dataByMonth = response;
    });
    this.store.dispatch(new entryActions.LoadActiveEntry());
    this.store.pipe(select(getActiveTimeEntry)).subscribe((activeTimeEntry) => {
      this.activeTimeEntry = activeTimeEntry;
    });
  }

  newEntry() {
    this.entry = null;
    this.entryId = null;
  }

  editEntry(entryId: string) {
    this.entryId = entryId;
    this.entry = this.dataByMonth.find((entry) => entry.id === entryId);
  }

  saveEntry(entry): void {
    if (this.activeTimeEntry !== null) {
      const entryDateAsIso = new Date(entry.start_date).toISOString();
      const entryDateAsLocalDate = new Date(entryDateAsIso);
      const activeEntryAsLocaldate = new Date(this.activeTimeEntry.start_date);
      const isEditingActiveEntry = this.entryId === this.activeTimeEntry.id;
      if (!isEditingActiveEntry && entryDateAsLocalDate > activeEntryAsLocaldate) {
        this.toastrService.error('You are on the clock and this entry overlaps it, try with earlier times.');
      } else {
        this.doSave(entry);
      }
    } else {
      this.doSave(entry);
    }
  }

  doSave(entry) {
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
    this.store.dispatch(new entryActions.LoadEntries(month));
  }
}
