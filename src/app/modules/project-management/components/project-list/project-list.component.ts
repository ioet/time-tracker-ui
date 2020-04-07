import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Project } from '../../../shared/models';
import { allProjects } from '../../store/project.selectors';
import * as actions from '../../store/project.actions';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  @Output() editProject = new EventEmitter();
  @Output() deleteProject = new EventEmitter();

  projectToDelete: Project;
  openDeleteModal = false;
  filterProjects = '';
  isLoading: boolean;

  projects: Project[] = [];

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.dispatch(new actions.LoadProjects());
    const projects$ = this.store.pipe(select(allProjects));

    projects$.subscribe((response) => {
      this.isLoading = response.isLoading;
      this.projects = response.projectList;
    });
  }

  openModal(projectData) {
    this.projectToDelete = projectData;
    this.openDeleteModal = true;
  }

  removeProject(projectId) {
    this.deleteProject.emit(projectId);
    this.projectToDelete = null;
  }
}
