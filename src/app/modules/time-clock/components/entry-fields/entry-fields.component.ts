import { ActivityManagementActionTypes } from './../../../activities-management/store/activity-management.actions';
import { EntryActionTypes, LoadActiveEntry } from './../../store/entry.actions';
import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, ActionsSubject } from '@ngrx/store';

import { Activity, NewEntry } from '../../../shared/models';
import { ProjectState } from '../../../customer-management/components/projects/components/store/project.reducer';
import { TechnologyState } from '../../../shared/store/technology.reducers';
import { ActivityState, LoadActivities } from '../../../activities-management/store';

import * as entryActions from '../../store/entry.actions';

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

  constructor(private formBuilder: FormBuilder, private store: Store<Merged>, private actionsSubject$: ActionsSubject) {
    this.entryForm = this.formBuilder.group({
      description: '',
      uri: '',
      activity_id: '',
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadActivities());

    this.actionsSubject$.pipe(
      filter((action: any) => (action.type === ActivityManagementActionTypes.LOAD_ACTIVITIES_SUCCESS))
    ).subscribe((action) => {
      this.activities = action.payload;
      this.store.dispatch(new LoadActiveEntry());
    });

    this.actionsSubject$.pipe(
      filter((action: any) => (action.type === EntryActionTypes.CREATE_ENTRY_SUCCESS))
    ).subscribe((action) => {
      if (!action.payload.end_date) {
        this.store.dispatch(new LoadActiveEntry());
      }
    });

    this.actionsSubject$.pipe(
      filter((action: any) => ( action.type === EntryActionTypes.LOAD_ACTIVE_ENTRY_SUCCESS ))
    ).subscribe((action) => {
      this.activeEntry = action.payload;
      this.setDataToUpdate(this.activeEntry);
      this.newData = {
        id: this.activeEntry.id,
        project_id: this.activeEntry.project_id,
        uri: this.activeEntry.uri,
        activity_id: this.activeEntry.activity_id,
      };
    });
  }

  get activity_id() {
    return this.entryForm.get('activity_id');
  }

  setDataToUpdate(entryData: NewEntry) {
    if (entryData) {
      this.entryForm.patchValue({
        description: entryData.description,
        uri: entryData.uri,
        activity_id: entryData.activity_id,
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

  onTechnologyAdded($event: string[]) {
    this.store.dispatch(new entryActions.UpdateEntryRunning({ ...this.newData, technologies: $event }));
  }

  onTechnologyRemoved($event: string[]) {
    this.store.dispatch(new entryActions.UpdateEntryRunning({ ...this.newData, technologies: $event }));
  }
}
