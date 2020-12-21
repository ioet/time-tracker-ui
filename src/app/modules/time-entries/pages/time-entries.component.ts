import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { delay, filter } from 'rxjs/operators';
import { ProjectSelectedEvent } from '../../shared/components/details-fields/project-selected-event';
import { SaveEntryEvent } from '../../shared/components/details-fields/save-entry-event';
import { Entry } from '../../shared/models';
import { DataSource } from '../../shared/models/data-source.model';
import * as entryActions from '../../time-clock/store/entry.actions';
import * as moment from 'moment';
import { EntryState } from '../../time-clock/store/entry.reducer';
import { EntryActionTypes } from './../../time-clock/store/entry.actions';
import { getActiveTimeEntry, getTimeEntriesDataSource } from './../../time-clock/store/entry.selectors';
@Component({
  selector: 'app-time-entries',
  templateUrl: './time-entries.component.html',
  styleUrls: ['./time-entries.component.scss'],
})
export class TimeEntriesComponent implements OnInit, OnDestroy {
  entryId: string;
  entry: Entry;
  activeTimeEntry: Entry;
  showModal = false;
  message: string;
  idToDelete: string;
  entriesSubscription: Subscription;
  canMarkEntryAsWIP = true;
  timeEntriesDataSource$: Observable<DataSource<Entry>>;
  selectedYearAsText: string;
  selectedMonthIndex: number;
  selectedMonthAsText: string;

  currentMonth = new Date().getMonth();
  year = new Date().getFullYear();

  constructor(private store: Store<EntryState>, private toastrService: ToastrService, private actionsSubject$: ActionsSubject) {
    this.timeEntriesDataSource$ = this.store.pipe(delay(0), select(getTimeEntriesDataSource));
  }

  ngOnDestroy(): void {
    this.entriesSubscription.unsubscribe();
  }

  ngOnInit(): void {

    this.store.dispatch(new entryActions.LoadEntries(this.selectedMonthIndex, this.year));
    console.log('year',  this.store.dispatch(new entryActions.LoadEntries(this.currentMonth, this.year)));

    this.loadActiveEntry();

    this.entriesSubscription = this.actionsSubject$.pipe(
      filter((action: any) => (
        action.type === EntryActionTypes.CREATE_ENTRY_SUCCESS ||
        action.type === EntryActionTypes.UPDATE_ENTRY_SUCCESS ||
        action.type === EntryActionTypes.DELETE_ENTRY_SUCCESS
      )
      )
    ).subscribe((action) => {
      this.loadActiveEntry();
    });
  }

  newEntry() {
    this.entry = null;
    this.entryId = null;
    this.store.pipe(select(getTimeEntriesDataSource)).subscribe(ds => {
      this.canMarkEntryAsWIP = !this.isThereAnEntryRunning(ds.data);
    });
  }

  private getEntryRunning(entries: Entry[]) {
    const runningEntry: Entry = entries.find(entry => entry.running === true);
    return runningEntry;
  }

  private isThereAnEntryRunning(entries: Entry[]) {
    return !!this.getEntryRunning(entries);
  }

  editEntry(entryId: string) {
    this.entryId = entryId;
    this.store.pipe(select(getTimeEntriesDataSource)).subscribe(ds => {
      this.entry = ds.data.find((entry) => entry.id === entryId);
      this.canMarkEntryAsWIP = this.isEntryRunningEqualsToEntryToEdit(this.getEntryRunning(ds.data), this.entry)
        || this.isTheEntryToEditTheLastOne(ds.data);
    });
    console.log('entryId', this.entryId);
  }

  private isEntryRunningEqualsToEntryToEdit(entryRunning: Entry, entryToEdit: Entry) {
    if (entryRunning && entryToEdit) {
      return entryRunning.id === entryToEdit.id;
    } else {
      return false;
    }
  }

  private isTheEntryToEditTheLastOne(entries: Entry[]) {
    if (entries && entries.length > 0) {
      const lastEntry = entries[0];
      return lastEntry.id === this.entryId;
    } else {
      return false;
    }
  }

  private isNewEntry() {
    return this.entryId === null;
  }

  saveEntry(event: SaveEntryEvent): void {
    if (this.activeTimeEntry) {
      const startDateAsLocalDate = new Date(event.entry.start_date);
      const endDateAsLocalDate = new Date(event.entry.end_date);
      const activeEntryAsLocalDate = new Date(this.activeTimeEntry.start_date);
      const isEditingEntryEqualToActiveEntry = this.entryId === this.activeTimeEntry.id;
      const isStartDateGreaterThanActiveEntry = startDateAsLocalDate > activeEntryAsLocalDate;
      const isEndDateGreaterThanActiveEntry = endDateAsLocalDate > activeEntryAsLocalDate;
      if (!isEditingEntryEqualToActiveEntry && (isStartDateGreaterThanActiveEntry || isEndDateGreaterThanActiveEntry)){
        this.toastrService.error('You are on the clock and this entry overlaps it, try with earlier times.');
      } else {
        this.doSave(event);
      }
    } else {
      this.doSave(event);
    }
  }

  projectSelected(event: ProjectSelectedEvent): void {
    this.store.pipe(select(getTimeEntriesDataSource)).subscribe(ds => {
      const dataToUse = ds.data.find(item => item.project_id === event.projectId);
      if (dataToUse && this.isNewEntry()) {
        const startDate = new Date(new Date().setHours(0, 0, 0, 0));
        const entry = {
          description : dataToUse.description ? dataToUse.description : '',
          technologies : dataToUse.technologies ? dataToUse.technologies : [],
          uri : dataToUse.uri ? dataToUse.uri : '',
          activity_id : dataToUse.activity_id,
          project_id : dataToUse.project_id,
          start_date : startDate,
          end_date : startDate
        };
        this.entry = entry;
      }
    });
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
      this.activeTimeEntry = activeTimeEntry;
    });
  }

  removeEntry() {
    this.store.dispatch(new entryActions.DeleteEntry(this.idToDelete));
    this.showModal = false;
  }

  dateSelected(event: { monthIndex: number; year: number }) {
    this.selectedYearAsText = event.year.toString();
    this.selectedMonthIndex = event.monthIndex;
    this.selectedMonthAsText = moment().month(event.monthIndex).format('MMMM');
    this.store.dispatch(new entryActions.LoadEntries(event.monthIndex + 1, event.year));
  }

  openModal(item: any) {
    this.idToDelete = item.id;
    this.message = `Are you sure you want to delete ${item.activity_name}?`;
    this.showModal = true;
  }
}
