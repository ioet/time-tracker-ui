import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { delay, filter, map } from 'rxjs/operators';
import { Project } from 'src/app/modules/shared/models';
import * as actions from '../../../customer-management/components/projects/components/store/project.actions';
import { ProjectState } from '../../../customer-management/components/projects/components/store/project.reducer';
import * as entryActions from '../../store/entry.actions';
import {
  getIsLoading,
  getProjects,
  getRecentProjects,
} from './../../../customer-management/components/projects/components/store/project.selectors';
import { EntryActionTypes } from './../../store/entry.actions';
import { getActiveTimeEntry } from './../../store/entry.selectors';
import { Activity, } from '../../../shared/models';
import { LoadActivities } from './../../../activities-management/store/activity-management.actions';
import { allActivities } from 'src/app/modules/activities-management/store/activity-management.selectors';
import { head } from 'lodash';

@Component({
  selector: 'app-project-list-hover',
  templateUrl: './project-list-hover.component.html',
  styleUrls: ['./project-list-hover.component.scss'],
})
export class ProjectListHoverComponent implements OnInit, OnDestroy {
  listProjects: Project[] = [];
  listRecentProjects: Project[] = [];
  listProjectsShowed: Project[] = [];
  activities: Activity[] = [];
  activeEntry;
  projectsForm: FormGroup;
  showClockIn: boolean;
  updateEntrySubscription: Subscription;
  isLoading$: Observable<boolean>;
  projectsSubscription: Subscription;
  recentProjectsSubscription: Subscription;
  activeEntrySubscription: Subscription;
  loadActivitiesSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<ProjectState>,
    private actionsSubject$: ActionsSubject,
    private toastrService: ToastrService
  ) {
    this.projectsForm = this.formBuilder.group({ project_id: null });
    this.isLoading$ = this.store.pipe(delay(0), select(getIsLoading));
  }

  ngOnInit(): void {
    this.store.dispatch(new actions.LoadProjects());
    const projects$ = this.store.pipe(select(getProjects));
    this.projectsSubscription = projects$.subscribe((projects) => {
      this.listProjects = [];
      projects.forEach((project) => {
        const projectWithSearchField = { ...project };
        projectWithSearchField.search_field = `${project.customer.name} - ${project.name}`;
        this.listProjects.push(projectWithSearchField);
      });
      this.loadActiveTimeEntry();
    });
    this.store.dispatch(new LoadActivities());
    const activities$ = this.store.pipe(select(allActivities));
    activities$.subscribe((response) => {
      this.activities = response;
    });

    this.store.dispatch(new actions.LoadRecentProjects());
    const recentProjects$ = this.store.pipe(select(getRecentProjects));
    this.recentProjectsSubscription = recentProjects$.subscribe((projects) => {
      this.listRecentProjects = projects;
      this.listProjectsShowed = this.listRecentProjects;
    });

    this.updateEntrySubscription = this.actionsSubject$
      .pipe(filter((action: any) => action.type === EntryActionTypes.UPDATE_ENTRY_SUCCESS))
      .subscribe((action) => {
        this.activeEntry = action.payload;
        this.setSelectedProject();
      });
  }

  loadActiveTimeEntry() {
    this.store.dispatch(new entryActions.LoadActiveEntry());
    const activeEntry$ = this.store.pipe(select(getActiveTimeEntry));
    this.activeEntrySubscription = activeEntry$.subscribe((activeEntry) => {
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
    this.listProjects.forEach((project) => {
      if (project.id === this.activeEntry.project_id) {
        this.projectsForm.setValue({ project_id: `${project.customer.name} - ${project.name}` });
      }
    });
  }

  clockIn(selectedProject, customerName, name) {

    // Debounce 'Clock In' buttons
    const buttons = document.getElementsByClassName('btn btn-sm btn-primary btn-select');
    for (const button of buttons) {
      button.setAttribute('disabled', 'true');
    }
    setTimeout(() => {
      for (const button of buttons) {
        button.removeAttribute('disabled');
      }
    }, 3000);

    const entry = {
      project_id: selectedProject,
      start_date: new Date().toISOString(),
      timezone_offset: new Date().getTimezoneOffset(),
      technologies: [],
      activity_id: head(this.activities).id,
    };

    this.store.dispatch(new entryActions.ClockIn(entry));
    this.projectsForm.setValue({ project_id: `${customerName} - ${name}` });
    setTimeout(() => {
      this.store.dispatch(new actions.LoadRecentProjects());
    }, 2000);
  }

  updateProject(selectedProject) {
    const entry = { id: this.activeEntry.id, project_id: selectedProject };
    this.store.dispatch(new entryActions.UpdateEntryRunning(entry));
    this.store.dispatch(new entryActions.LoadActiveEntry());
    this.store.dispatch(new actions.LoadRecentProjects());
  }

  switch(selectedProject, customerName, name) {
    if (this.activeEntry.activity_id === null) {
      this.toastrService.error('Before switching, please select an activity');
    } else {
      this.store.dispatch(new entryActions.SwitchTimeEntry(this.activeEntry.id, selectedProject));
      setTimeout(() => {
        this.store.dispatch(new actions.LoadRecentProjects());
      }, 2000);
      this.projectsForm.setValue({ project_id: `${customerName} - ${name}` });
    }
  }

  onSearch({term}){
    const isSearchEmpty = (term === '');
    this.listProjectsShowed = isSearchEmpty ? this.listRecentProjects : this.listProjects;
  }

  onSelect(project){
    if (project && this.showClockIn) {
      this.clockIn(project.id, project.customer.name, project.name);
      this.listProjectsShowed = this.listRecentProjects;
    }
  }

  ngOnDestroy(): void {
    this.projectsSubscription.unsubscribe();
    this.recentProjectsSubscription.unsubscribe();
    this.activeEntrySubscription.unsubscribe();
    this.updateEntrySubscription.unsubscribe();
  }
}
