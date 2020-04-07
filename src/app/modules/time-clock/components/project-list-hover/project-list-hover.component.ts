import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Project } from 'src/app/modules/shared/models';
import { allProjects } from '../../../project-management/store/project.selectors';
import { ProjectState } from '../../../project-management/store/project.reducer';
import * as actions from '../../../project-management/store/project.actions';

@Component({
  selector: 'app-project-list-hover',
  templateUrl: './project-list-hover.component.html',
  styleUrls: ['./project-list-hover.component.scss'],
})
export class ProjectListHoverComponent implements OnInit {
  @Output() showFields = new EventEmitter<boolean>();

  selectedId: string;
  showButton: number;
  filterProjects = '';
  listProjects: Project[] = [];
  isLoading: boolean;

  constructor(private store: Store<ProjectState>) {
    this.showButton = -1;
  }

  ngOnInit(): void {
    this.store.dispatch(new actions.GetProjectsLoad());
    const projects$ = this.store.pipe(select(allProjects));

    projects$.subscribe((response) => {
      this.isLoading = response.isLoading;
      this.listProjects = response.projectList;
    });
  }

  clockIn(id: string) {
    this.selectedId = id;
    this.showFields.emit(true);
  }
}
