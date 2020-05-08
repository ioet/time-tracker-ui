import { getProjects } from './../../../customer-management/components/projects/components/store/project.selectors';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { getActiveTimeEntry } from './../../store/entry.selectors';
import { Project } from 'src/app/modules/shared/models';
import { ProjectState } from '../../../customer-management/components/projects/components/store/project.reducer';
import * as actions from '../../../customer-management/components/projects/components/store/project.actions';
import * as entryActions from '../../store/entry.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-list-hover',
  templateUrl: './project-list-hover.component.html',
  styleUrls: ['./project-list-hover.component.scss'],
})
export class ProjectListHoverComponent implements OnInit {

  selectedId: string;
  listProjects: Project[] = [];
  filterProjects = '';
  showButton = '';
  keyword = 'name';
  nameActiveProject: string;
  activeEntry;

  constructor(private store: Store<ProjectState>, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.store.dispatch(new actions.LoadProjects());
    const projects$ = this.store.pipe(select(getProjects));

    projects$.subscribe((projects) => {
      this.listProjects = projects;
      this.loadActiveTimeEntry();
    });
  }

  private loadActiveTimeEntry() {
    this.store.dispatch(new entryActions.LoadActiveEntry());
    const activeEntry$ = this.store.pipe(select(getActiveTimeEntry));
    activeEntry$.subscribe((activeEntry) => {
      this.activeEntry = activeEntry;
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
    if (this.activeEntry) {
      const entry = {id: this.activeEntry.id, project_id: id};
      this.store.dispatch(new entryActions.UpdateActiveEntry(entry));
    } else {
      const newEntry = { project_id: id, start_date: new Date().toISOString() };
      this.store.dispatch(new entryActions.CreateEntry(newEntry));
      this.toastr.success('You just clocked-in');
    }
  }
}
