import { ToastrService } from 'ngx-toastr';
import { getActiveTimeEntry } from './../../time-clock/store/entry.selectors';
import { Component, OnInit } from '@angular/core';
import { Entry } from '../../shared/models';
import { EntryState } from '../../time-clock/store/entry.reducer';
import { allEntries } from '../../time-clock/store/entry.selectors';
import { select, Store } from '@ngrx/store';
import * as entryActions from '../../time-clock/store/entry.actions';
import { SaveEntryEvent } from '../../shared/components/details-fields/save-entry-event';

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
  showModal = false;
  message: string;
  idToDelete: string;

  constructor(private store: Store<EntryState>, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.store.dispatch(new entryActions.LoadEntries(new Date().getMonth() + 1));
    const dataByMonth$ = this.store.pipe(select(allEntries));
    dataByMonth$.subscribe((response) => {
      this.dataByMonth = response;
    });
    this.loadActiveEntry();
  }

  newEntry() {
    this.entry = null;
    this.entryId = null;
  }

  editEntry(entryId: string) {
    this.entryId = entryId;
    this.entry = this.dataByMonth.find((entry) => entry.id === entryId);
  }

  saveEntry(event: SaveEntryEvent): void {
    if (this.activeTimeEntry !== null && this.activeTimeEntry !== undefined) {
      const entryDateAsIso = new Date(event.entry.start_date).toISOString();
      const entryDateAsLocalDate = new Date(entryDateAsIso);
      const activeEntryAsLocalDate = new Date(this.activeTimeEntry.start_date);
      const isEditingActiveEntry = this.entryId === this.activeTimeEntry.id;
      if (!isEditingActiveEntry && entryDateAsLocalDate > activeEntryAsLocalDate) {
        this.toastrService.error('You are on the clock and this entry overlaps it, try with earlier times.');
      } else {
        this.doSave(event);
      }
    } else {
      this.doSave(event);
    }
    this.store.dispatch(new entryActions.LoadEntries(new Date().getMonth() + 1));
  }

  doSave(event: SaveEntryEvent) {
    if (this.entryId) {
      event.entry.id = this.entryId;
      this.store.dispatch(new entryActions.UpdateEntry(event.entry));
      if (event.shouldRestartEntry) {
        this.store.dispatch(new entryActions.RestartEntry(event.entry));
      }
    } else {
      this.store.dispatch(new entryActions.CreateEntry(event.entry));
    }
  }

  loadActiveEntry() {
    this.store.dispatch(new entryActions.LoadActiveEntry());
    this.store.pipe(select(getActiveTimeEntry)).subscribe((activeTimeEntry) => {
      if (activeTimeEntry) {
        this.activeTimeEntry = activeTimeEntry;
      }
    });
  }

  removeEntry() {
    this.store.dispatch(new entryActions.DeleteEntry(this.idToDelete));
    this.showModal = false;
  }

  getMonth(month: number) {
    this.store.dispatch(new entryActions.LoadEntries(month));
  }

  openModal(item: any) {
    this.idToDelete = item.id;
    this.message = `Are you sure you want to delete ${item.activity_name}?`;
    this.showModal = true;
  }

}
