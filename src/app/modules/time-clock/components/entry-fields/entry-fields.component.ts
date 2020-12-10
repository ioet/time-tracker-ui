import { ActivityManagementActionTypes } from './../../../activities-management/store/activity-management.actions';
import { EntryActionTypes, LoadActiveEntry } from './../../store/entry.actions';
import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { Activity, NewEntry } from '../../../shared/models';
import { ProjectState } from '../../../customer-management/components/projects/components/store/project.reducer';
import { TechnologyState } from '../../../shared/store/technology.reducers';
import { ActivityState, LoadActivities } from '../../../activities-management/store';

import * as entryActions from '../../store/entry.actions';
import { get } from 'lodash';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { getTimeEntriesDataSource } from '../../store/entry.selectors';

type Merged = TechnologyState & ProjectState & ActivityState;

@Component({
  selector: 'app-entry-fields',
  templateUrl: './entry-fields.component.html',
  styleUrls: ['./entry-fields.component.scss'],
})
export class EntryFieldsComponent implements OnInit {
  entryForm: FormGroup;
  selectedTechnologies: string[] = [];
  activities: Activity[] = [];
  activeEntry;
  newData;
  lastEntry;
  showtimeInbuttons = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<Merged>,
    private actionsSubject$: ActionsSubject,
    private toastrService: ToastrService
  ) {
    this.entryForm = this.formBuilder.group({
      description: '',
      uri: '',
      activity_id: '',
      start_hour: '',
      start_date: '',
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadActivities());
    this.store.dispatch(new entryActions.LoadEntries(new Date().getMonth() + 1));
    this.actionsSubject$
      .pipe(filter((action: any) => action.type === ActivityManagementActionTypes.LOAD_ACTIVITIES_SUCCESS))
      .subscribe((action) => {
        this.activities = action.payload;
        this.store.dispatch(new LoadActiveEntry());
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === EntryActionTypes.CREATE_ENTRY_SUCCESS ||
            action.type === EntryActionTypes.UPDATE_ENTRY_SUCCESS
        )
      )
      .subscribe((action) => {
        if (!action.payload.end_date) {
          this.store.dispatch(new LoadActiveEntry());
          this.store.dispatch(new entryActions.LoadEntriesSummary());
        }
      });

    this.actionsSubject$
      .pipe(filter((action: any) => action.type === EntryActionTypes.LOAD_ACTIVE_ENTRY_SUCCESS))
      .subscribe((action) => {
        this.activeEntry = action.payload;
        this.setDataToUpdate(this.activeEntry);
        this.newData = {
          id: this.activeEntry.id,
          project_id: this.activeEntry.project_id,
          uri: this.activeEntry.uri,
          activity_id: this.activeEntry.activity_id,
          start_date: this.activeEntry.start_date,
          start_hour: formatDate(this.activeEntry.start_date, 'HH:mm', 'en'),
        };
      });
  }

  get activity_id() {
    return this.entryForm.get('activity_id');
  }

  get start_hour() {
    return this.entryForm.get('start_hour');
  }

  setDataToUpdate(entryData: NewEntry) {
    if (entryData) {
      this.entryForm.patchValue({
        description: entryData.description,
        uri: entryData.uri,
        activity_id: entryData.activity_id,
        start_date: entryData.start_date,
        start_hour: formatDate(entryData.start_date, 'HH:mm', 'en'),
      });
      if (entryData.technologies) {
        this.selectedTechnologies = entryData.technologies;
      } else {
        this.selectedTechnologies = [];
      }
    }
  }

  entryFormIsValidate() {
    return this.entryForm.valid;
  }

  onSubmit() {
    this.store.dispatch(new entryActions.UpdateEntryRunning({ ...this.newData, ...this.entryForm.value }));
  }

  onUpdateStartHour() {
    this.getLastEntry();
    const startDate = formatDate(this.activeEntry.start_date, 'yyyy-MM-dd', 'en');
    const newHourEntered = new Date(`${startDate}T${this.entryForm.value.start_hour.trim()}`).toISOString();
    const isEntryDateInTheFuture = moment(newHourEntered).isAfter(moment());
    if (isEntryDateInTheFuture) {
      this.toastrService.error('You cannot start a time-entry in the future');
      this.entryForm.patchValue({ start_hour: this.newData.start_hour });
      this.showtimeInbuttons = false;
      return;
    }

    const lastEntryStartDate = get(this.lastEntry, 'start_date', moment().subtract(1, 'hours'));
    const isEntryDateInLastStartDate = moment(newHourEntered).isSameOrBefore(lastEntryStartDate);
    if (isEntryDateInLastStartDate) {
      this.toastrService.error('There is another time entry registered in this time range');
      this.entryForm.patchValue({ start_hour: this.newData.start_hour });
      this.showtimeInbuttons = false;
      return;
    }
    this.entryForm.patchValue({ start_date: newHourEntered });
    this.dispatchEntries(newHourEntered);
    this.showtimeInbuttons = false;
  }

  private dispatchEntries(newHourEntered) {
    const lastEntryEndDate = get(this.lastEntry, 'end_date', moment().subtract(1, 'hours'));
    const isInLastEntry = moment(newHourEntered).isBefore(lastEntryEndDate);
    if (isInLastEntry) {
      this.store.dispatch(new entryActions.UpdateEntry({ id: this.lastEntry.id, end_date: newHourEntered }));
    }
    this.store.dispatch(new entryActions.UpdateEntryRunning({ ...this.newData, ...this.entryForm.value }));
  }

  private getLastEntry() {
    const lastEntry$ = this.store.pipe(select(getTimeEntriesDataSource));
    lastEntry$.subscribe((entry) => {
      this.lastEntry = entry.data[1];
    });
  }

  activeTimeInButtons(){
    this.showtimeInbuttons = true;
  }

  cancelTimeInUpdate(){
    this.entryForm.patchValue({ start_hour: this.newData.start_hour });
    this.showtimeInbuttons = false;
  }

  onTechnologyAdded($event: string[]) {
    this.store.dispatch(new entryActions.UpdateEntryRunning({ ...this.newData, technologies: $event }));
  }

  onTechnologyRemoved($event: string[]) {
    this.store.dispatch(new entryActions.UpdateEntryRunning({ ...this.newData, technologies: $event }));
  }
}
