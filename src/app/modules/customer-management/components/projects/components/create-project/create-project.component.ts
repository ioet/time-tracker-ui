import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { ProjectState } from '../store/project.reducer';
import * as actions from '../store/project.actions';
import { getProjectToEdit } from '../store/project.selectors';
import { Project, ProjectType } from 'src/app/modules/shared/models';
import { allProjectTypes, ProjectTypeState } from '../../../projects-type/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit, OnDestroy {
  projectForm;
  projectToEdit: Project;
  projectsTypes: ProjectType[] = [];

  projectTypesSubscription: Subscription;
  projectToEditSubscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<ProjectState>,
    private projectTypeStore: Store<ProjectTypeState>
  ) {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      project_type_id: [''],
    });
  }

  ngOnInit() {
    const projectToEditSubscription = this.store.pipe(select(getProjectToEdit));
    projectToEditSubscription.subscribe((project) => {
      this.projectToEdit = project;
      this.setDataToUpdate(this.projectToEdit);
    });

    const projectTypesSubscription = this.projectTypeStore.pipe(select(allProjectTypes));
    projectTypesSubscription.subscribe((projectsType) => {
      this.projectsTypes = projectsType;
    });
  }

  ngOnDestroy() {
    this.projectToEditSubscription.unsubscribe();
    this.projectTypesSubscription.unsubscribe();
  }

  onSubmit(formData) {
    this.projectForm.reset();
    if (this.projectToEdit) {
      const projectData = { id: this.projectToEdit.id, ...formData };
      this.store.dispatch(new actions.UpdateProject(projectData));
    } else {
      this.store.dispatch(new actions.CreateProject(formData));
    }
  }

  get name() {
    return this.projectForm.get('name');
  }

  get description() {
    return this.projectForm.get('description');
  }

  get project_type_id() {
    return this.projectForm.get('project_type_id');
  }

  setDataToUpdate(projectData: Project) {
    if (projectData) {
      this.projectForm.setValue({
        name: projectData.name,
        description: projectData.description,
        project_type_id: projectData.project_type_id,
      });
    }
  }

  cancelButton() {
    this.store.dispatch(new actions.ResetProjectToEdit());
  }
}
