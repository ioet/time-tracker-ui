import {getActiveTimeEntry} from './../../store/entry.selectors';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';

import {Activity, NewEntry} from '../../../shared/models';
import {ProjectState} from '../../../customer-management/components/projects/components/store/project.reducer';
import {TechnologyState} from '../../../shared/store/technology.reducers';
import {ActivityState, allActivities, LoadActivities} from '../../../activities-management/store';

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

  constructor(private formBuilder: FormBuilder, private store: Store<Merged>) {
    this.entryForm = this.formBuilder.group({
      description: '',
      uri: '',
      activity_id: '-1'
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadActivities());
    const activities$ = this.store.pipe(select(allActivities));
    activities$.subscribe((response) => {
      this.activities = response;
      this.loadActiveEntry();
    });
  }

  loadActiveEntry() {
    const activeEntry$ = this.store.pipe(select(getActiveTimeEntry));
    activeEntry$.subscribe((response) => {
      if (response) {
        this.activeEntry = response;
        this.setDataToUpdate(this.activeEntry);
        this.newData = {
          id: this.activeEntry.id,
          project_id: this.activeEntry.project_id,
          uri: this.activeEntry.uri,
          activity_id: this.activeEntry.activity_id,
        };
      }
    });
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

  onSubmit() {
    this.store.dispatch(new entryActions.UpdateActiveEntry({...this.newData, ...this.entryForm.value}));
  }

  onTechnologyAdded($event: string[]) {
    this.store.dispatch(new entryActions.UpdateActiveEntry({...this.newData, technologies: $event})
    );
  }

  onTechnologyRemoved($event: string[]) {
    this.store.dispatch(new entryActions.UpdateActiveEntry({...this.newData, technologies: $event}));
  }

}
