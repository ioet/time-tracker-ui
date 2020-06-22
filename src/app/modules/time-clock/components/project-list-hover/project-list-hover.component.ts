import { EntryActionTypes } from './../../store/entry.actions';
import { filter } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { getProjects } from './../../../customer-management/components/projects/components/store/project.selectors';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { getActiveTimeEntry } from './../../store/entry.selectors';
import { Project } from 'src/app/modules/shared/models';
import { ProjectState } from '../../../customer-management/components/projects/components/store/project.reducer';
import * as actions from '../../../customer-management/components/projects/components/store/project.actions';
import * as entryActions from '../../store/entry.actions';

@Component({
  selector: 'app-project-list-hover',
  templateUrl: './project-list-hover.component.html',
  styleUrls: ['./project-list-hover.component.scss'],
})
export class ProjectListHoverComponent implements OnInit, OnDestroy {

  keyword = 'name';
  listProjects: Project[] = [];
  activeEntry;
  projectsForm: FormGroup;
  showClockIn: boolean;
  updateEntrySubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private store: Store<ProjectState>, private actionsSubject$: ActionsSubject) {
    this.projectsForm = this.formBuilder.group({ project_id: null, });
  }

  ngOnInit(): void {
    this.store.dispatch(new actions.LoadProjects());
    const projects$ = this.store.pipe(select(getProjects));
    projects$.subscribe((projects) => {
      this.listProjects = projects;
      this.loadActiveTimeEntry();
    });

    this.updateEntrySubscription = this.actionsSubject$.pipe(
      filter((action: any) => (
          action.type === EntryActionTypes.UPDATE_ENTRY_SUCCESS
        )
      )
    ).subscribe((action) => {
      this.activeEntry = action.payload;
      this.setSelectedProject();
    });

  }

  loadActiveTimeEntry() {
    this.store.dispatch(new entryActions.LoadActiveEntry());
    const activeEntry$ = this.store.pipe(select(getActiveTimeEntry));
    activeEntry$.subscribe((activeEntry) => {
      this.activeEntry = activeEntry;
      if (activeEntry) {
        this.showClockIn = false;
        this.setSelectedProject();
      } else {
        this.showClockIn = true;
        this.projectsForm.setValue({ project_id: null });
      }
    });
  }

  setSelectedProject() {
    this.listProjects.forEach( (project) => {
      if (project.id === this.activeEntry.project_id) {
        this.projectsForm.setValue(
            { project_id: `${project.customer_name} - ${project.name}`, }
          );
      }
    });
  }

  clockIn(selectedProject, customerName, name) {
    const entry = { project_id: selectedProject, start_date: new Date().toISOString() };
    this.store.dispatch(new entryActions.CreateEntry(entry));
    this.projectsForm.setValue( { project_id: `${customerName} - ${name}`, } );
  }

  updateProject(selectedProject) {
    const entry = { id: this.activeEntry.id, project_id: selectedProject };
    this.store.dispatch(new entryActions.UpdateEntryRunning(entry));
    this.store.dispatch(new entryActions.LoadActiveEntry());
  }

  switch(selectedProject, customerName, name) {
    this.store.dispatch(new entryActions.SwitchTimeEntry(this.activeEntry.id, selectedProject));
    this.projectsForm.setValue( { project_id: `${customerName} - ${name}`, } );
  }

  ngOnDestroy(): void {
    this.updateEntrySubscription.unsubscribe();
  }
}
