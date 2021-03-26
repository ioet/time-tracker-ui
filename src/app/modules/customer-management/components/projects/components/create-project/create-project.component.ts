import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { ProjectState } from '../store/project.reducer';
import * as actions from '../store/project.actions';
import { getProjectToEdit } from '../store/project.selectors';
import { Project, ProjectType } from 'src/app/modules/shared/models';
import { allProjectTypes, ProjectTypeState } from '../../../projects-type/store';
import { Subscription } from 'rxjs';
import { getCustomerId } from 'src/app/modules/customer-management/store/customer-management.selectors';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit, OnDestroy {
  @Input() hasChange: boolean;
  @Output() hasChangedEvent = new EventEmitter<boolean>();
  projectForm;
  projectToEdit: Project;
  projectsTypes: ProjectType[] = [];
  customerId: string;

  projectTypesSubscription: Subscription;
  projectToEditSubscription: Subscription;
  getCustomerIdSubscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<ProjectState>,
    private projectTypeStore: Store<ProjectTypeState>
  ) {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      project_type_id: [null],
    });
  }

  ngOnInit() {
    const projectToEdit$ = this.store.pipe(select(getProjectToEdit));
    this.projectToEditSubscription = projectToEdit$.subscribe((project) => {
      this.projectToEdit = project;
      this.setDataToUpdate(this.projectToEdit);
    });

    const projectsTypes$ = this.projectTypeStore.pipe(select(allProjectTypes));
    this.projectTypesSubscription = projectsTypes$.subscribe((projectsType) => {
      this.projectsTypes = projectsType;
    });
    const getCustomerId$ = this.store.pipe(select(getCustomerId));
    this.getCustomerIdSubscription = getCustomerId$.subscribe((customerId) => {
      this.customerId = customerId;
    });
  }

  ngOnDestroy() {
    this.projectToEditSubscription.unsubscribe();
    this.projectTypesSubscription.unsubscribe();
    this.getCustomerIdSubscription.unsubscribe();
  }

  onSubmit(formData) {
    if (formData.project_type_id === '') {
      formData.project_type_id = null;
    }
    this.projectForm.reset();
    if (this.projectToEdit) {
      const projectData = { id: this.projectToEdit.id, ...formData };
      this.store.dispatch(new actions.UpdateProject(projectData));
    } else {
      this.store.dispatch(new actions.CreateProject({ ...formData, customer_id: this.customerId }));
    }
    this.resetValuesForm();
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
    this.projectForm.reset();
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
    this.hasChangedEvent.emit(this.hasChange = false);
  }

  resetValuesForm() {
    this.projectForm.reset();
  }

  onInputChangeProject(searchValue: string): void {
    return searchValue ? this.hasChangedEvent.emit(this.hasChange = true) :
      this.hasChangedEvent.emit(this.hasChange = false);
  }
}
