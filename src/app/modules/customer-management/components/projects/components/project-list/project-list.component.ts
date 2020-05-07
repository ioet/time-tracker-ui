import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ITEMS_PER_PAGE } from 'src/environments/environment';
import { Project } from 'src/app/modules/shared/models';
import { ProjectState } from '../store/project.reducer';
import { getCustomerProjects } from '../store/project.selectors';
import * as actions from '../store/project.actions';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit, OnDestroy {
  initPage3 = 1;
  itemsPerPage = ITEMS_PER_PAGE;
  isLoading = false;
  projects: Project[] = [];
  filterProjects = '';

  projectsSubscription: Subscription;

  constructor(private store: Store<ProjectState>,
              private toastrService: ToastrService) {}

  ngOnInit(): void {
    const projects$ = this.store.pipe(select(getCustomerProjects));
    this.projectsSubscription = projects$.subscribe((response) => {
      this.isLoading = response.isLoading;
      this.projects = response.customerProjects;
    });
  }

  ngOnDestroy() {
    this.projectsSubscription.unsubscribe();
  }

  updateProject(project) {
    this.store.dispatch(new actions.SetProjectToEdit(project));
  }

  deleteProject(projectId: string) {
    this.store.dispatch(new actions.DeleteProject(projectId));
    this.toastrService.success('The project has been removed successfully');
  }
}
