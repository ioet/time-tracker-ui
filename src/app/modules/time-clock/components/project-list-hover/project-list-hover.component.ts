import { FormGroup, FormBuilder } from '@angular/forms';
import { getProjects } from './../../../customer-management/components/projects/components/store/project.selectors';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

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
export class ProjectListHoverComponent implements OnInit {

  listProjects: Project[] = [];
  activeEntry;
  projectsForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store<ProjectState>) {
    this.projectsForm = this.formBuilder.group({
      project_id: '',
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new actions.LoadProjects());
    const projects$ = this.store.pipe(select(getProjects));
    projects$.subscribe((projects) => {
      this.listProjects = projects;
    });
    this.loadActiveTimeEntry();
  }

  private loadActiveTimeEntry() {
    this.store.dispatch(new entryActions.LoadActiveEntry());
    const activeEntry$ = this.store.pipe(select(getActiveTimeEntry));
    activeEntry$.subscribe((activeEntry) => {
      this.activeEntry = activeEntry;
      if (activeEntry) {
        this.projectsForm.setValue({
          project_id: activeEntry.project_id,
        });
      } else {
        this.projectsForm.setValue({
          project_id: '-1',
        });
      }
    });
  }

  clockIn() {
    const selectedProject = this.projectsForm.get('project_id').value;
    if (this.activeEntry) {
      const entry = { id: this.activeEntry.id, project_id: selectedProject };
      this.store.dispatch(new entryActions.UpdateActiveEntry(entry));
    } else {
      const newEntry = { project_id: selectedProject, start_date: new Date().toISOString() };
      this.store.dispatch(new entryActions.CreateEntry(newEntry));
    }
    this.store.dispatch(new entryActions.LoadEntries(new Date().getMonth() + 1 ));
  }
}
