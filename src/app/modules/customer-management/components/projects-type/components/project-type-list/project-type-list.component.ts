import { ToastrService } from 'ngx-toastr';
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

  constructor(private store: Store<ProjectTypeState>, private toastrService: ToastrService) {}

  ngOnInit(): void {
    const projectTypes$ = this.store.pipe(select(allProjectTypes));
    projectTypes$.subscribe((response) => {
      this.projectTypes = response;
    });
  }

  deleteProjectType(projectTypeId: string) {
    this.store.dispatch(new DeleteProjectType(projectTypeId));
    this.toastrService.success('Information has been removed successfully');
  }

  updateProjectType(projectTypeId: string) {
    this.store.dispatch(new SetProjectTypeToEdit(projectTypeId));
  }
}
