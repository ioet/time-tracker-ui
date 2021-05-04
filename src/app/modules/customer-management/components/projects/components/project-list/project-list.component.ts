import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ITEMS_PER_PAGE } from 'src/environments/environment';
import { Project } from 'src/app/modules/shared/models';
import { ProjectState } from '../store/project.reducer';
import { getCustomerProjects } from '../store/project.selectors';
import * as actions from '../store/project.actions';
import { ProjectUI } from '../../../../../shared/models/project.model';
import { UnarchiveProject } from '../store/project.actions';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit, OnDestroy {
  initPage3 = 1;
  itemsPerPage = ITEMS_PER_PAGE;
  isLoading = false;
  projects: ProjectUI[] = [];
  filterProjects = '';
  showModal = false;
  idToDelete: string;
  message: string;

  projectsSubscription: Subscription;

  constructor(private store: Store<ProjectState>) {}

  ngOnInit(): void {
    const btnProps = [
      {
        key: 'active',
        _status: false,
        btnColor: 'btn-danger',
        btnIcon: 'fa-arrow-circle-down',
        btnName: 'Archive',
      },
      {
        key: 'inactive',
        _status: true,
        btnColor: 'btn-primary',
        btnIcon: 'fa-arrow-circle-up',
        btnName: 'Active',
      },
    ];

    const projects$ = this.store.pipe(select(getCustomerProjects));
    this.projectsSubscription = projects$.subscribe((response) => {
      this.isLoading = response.isLoading;
      this.projects = response.customerProjects.map((project: ProjectUI) => {
        const addProps = btnProps.find((prop) => prop.key === this.setActive(project.status));
        return { ...project, ...addProps };
      });
    });
  }

  ngOnDestroy() {
    this.projectsSubscription.unsubscribe();
  }

  updateProject(project) {
    this.store.dispatch(new actions.SetProjectToEdit(project));
  }

  deleteProject() {
    this.store.dispatch(new actions.DeleteProject(this.idToDelete));
    this.showModal = false;
  }

  openModal(item: ProjectUI) {
    this.idToDelete = item.id;
    this.message = `Are you sure you want archive ${item.name}?`;
    this.showModal = true;
  }

  switchStatus(item: ProjectUI): void {
    if (item.key !== 'inactive') {
      this.openModal(item);
    } else {
      this.showModal = false;
      this.store.dispatch(new UnarchiveProject(item.id));
    }
  }

  setActive(status: any): string {
    return status === 'inactive' ? 'inactive' : 'active';
  }
}
