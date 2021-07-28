import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ITEMS_PER_PAGE } from 'src/environments/environment';
import { ProjectState } from '../store/project.reducer';
import { getCustomerProjects } from '../store/project.selectors';
import * as actions from '../store/project.actions';
import { ProjectUI } from '../../../../../shared/models/project.model';
import { ProjectType } from 'src/app/modules/shared/models';

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
  projectsTypes: ProjectType[] = [];
  filterProjects = '';
  showModal = false;
  idToDelete: string;
  message: string;

  projectsSubscription: Subscription;
  projectTypesSubscription: Subscription;

  constructor(
    private store: Store<ProjectState>,
  ) {}

  ngOnInit(): void {
    const btnProps = [
      {
        key: 'active',
        _status: false,
        btnColor: 'btn-white',
        btnIcon: 'fa-circle',
        btnIconTwo:  'fa-check',
        btnName: 'Active',
        iconColor: 'text-success'
      },
      {
        key: 'inactive',
        _status: true,
        btnColor: 'btn-white',
        btnIcon: 'fa-circle',
        btnIconTwo: 'fa-check',
        btnName: 'Inactive',
        iconColor: 'text-danger'
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
    if (this.projectTypesSubscription){
      this.projectTypesSubscription.unsubscribe();
    }
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
    this.message = `Are you sure you want Disable ${item.name}?`;
    this.showModal = true;
  }

  switchStatus(item: ProjectUI): void {
    if (item.key !== 'inactive') {
      this.openModal(item);
    } else {
      this.showModal = false;
      this.store.dispatch(new actions.UnarchiveProject(item.id));
    }
  }

  setActive(status: any): string {
    return status === 'inactive' ? 'inactive' : 'active';
  }
}
