import { Component, OnInit } from '@angular/core';
import { ITEMS_PER_PAGE } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';

import { DeleteProjectType, SetProjectTypeToEdit, allProjectTypes } from '../../store';
import { ProjectTypeState } from '../../store';
import { ProjectType } from '../../../../../shared/models';

@Component({
  selector: 'app-project-type-list',
  templateUrl: './project-type-list.component.html',
  styleUrls: ['./project-type-list.component.scss'],
})
export class ProjectTypeListComponent implements OnInit {
  projectTypes: ProjectType[] = [];

  initPage2 = 1;
  itemsPerPage = ITEMS_PER_PAGE;
  showModal = false;
  idToDelete: string;
  message: string;

  constructor(private store: Store<ProjectTypeState>) {}

  ngOnInit(): void {
    const projectTypes$ = this.store.pipe(select(allProjectTypes));
    projectTypes$.subscribe((response) => {
      this.projectTypes = response;
    });
  }

  deleteProjectType() {
    this.store.dispatch(new DeleteProjectType(this.idToDelete));
    this.showModal = false;
  }

  updateProjectType(projectTypeId: string) {
    this.store.dispatch(new SetProjectTypeToEdit(projectTypeId));
  }

  openModal(item: ProjectType) {
    this.idToDelete = item.id;
    this.message = `Are you sure you want to delete ${item.name}?`;
    this.showModal = true;
  }
}
