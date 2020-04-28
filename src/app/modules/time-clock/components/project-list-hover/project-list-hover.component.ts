import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { getActiveTimeEntry } from './../../store/entry.selectors';
import { Project } from 'src/app/modules/shared/models';
import { allProjects } from '../../../customer-management/components/projects/components/store/project.selectors';
import { ProjectState } from '../../../customer-management/components/projects/components/store/project.reducer';
import * as actions from '../../../customer-management/components/projects/components/store/project.actions';
import * as entryActions from '../../store/entry.actions';

@Component({
  selector: 'app-project-list-hover',
  templateUrl: './project-list-hover.component.html',
  styleUrls: ['./project-list-hover.component.scss'],
})
export class ProjectListHoverComponent implements OnInit {

  selectedId: string;
  listProjects: Project[] = [];
  isLoading: boolean;
  filterProjects = '';
  showButton = '';
  keyword = 'name';
  nameActiveProject: string;

  constructor(private store: Store<ProjectState>) { }

  ngOnInit(): void {
    this.store.dispatch(new actions.LoadProjects());
    const projects$ = this.store.pipe(select(allProjects));

    projects$.subscribe((response) => {
      this.isLoading = response.isLoading;
      this.listProjects = response.projectList;
      this.loadActiveTimeEntry();
    });

  }

  private loadActiveTimeEntry() {
    this.store.dispatch(new entryActions.LoadActiveEntry());
    const activeEntry$ = this.store.pipe(select(getActiveTimeEntry));
    activeEntry$.subscribe((activeEntry) => {
      if (activeEntry) {
        for (const project of this.listProjects) {
          if (project.id === activeEntry.project_id) {
            this.nameActiveProject = project.name;
            break;
          }
        }
      } else {
        this.nameActiveProject = null;
      }
    });
  }

  clockIn(id: string) {
    const newEntry = { project_id: id, start_date: new Date().toISOString() };
    this.store.dispatch(new entryActions.CreateEntry(newEntry));
  }
}
