import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { ProjectType } from '../../../../../shared/models';
import { projectTypeIdToEdit, ProjectTypeState } from '../../store';
import { CreateProjectType, ResetProjectTypeToEdit, UpdateProjectType, getProjectTypeById } from '../../store';
import { getCustomerId } from 'src/app/modules/customer-management/store/customer-management.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-project-type',
  templateUrl: './create-project-type.component.html',
  styleUrls: ['./create-project-type.component.scss'],
})
export class CreateProjectTypeComponent implements OnInit, OnDestroy {
  @Input() hasChange: boolean;
  @Output() hasChangedEvent = new EventEmitter<boolean>();
  projectTypeForm: FormGroup;
  projectTypeToEdit: ProjectType;
  customerId: string;
  getCustomerIdSubscription: Subscription;
  projectTypeIdToEditSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private store: Store<ProjectTypeState>) {
    this.projectTypeForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    const projectTypeIdToEdit$ = this.store.pipe(select(projectTypeIdToEdit));
    this.projectTypeIdToEditSubscription = projectTypeIdToEdit$.subscribe((projectTypeId: string) => {
      if (projectTypeId === null) {
        this.projectTypeForm.reset();
      }
    });

    const projectType$ = this.store.pipe(select(getProjectTypeById));
    projectType$.subscribe((projectType) => {
      this.projectTypeToEdit = projectType;
      this.setDataToUpdate(this.projectTypeToEdit);
    });
    const getCustomerId$ = this.store.pipe(select(getCustomerId));
    this.getCustomerIdSubscription = getCustomerId$.subscribe((customerId) => {
      this.customerId = customerId;
    });
  }

  get name() {
    return this.projectTypeForm.get('name');
  }
  get description() {
    return this.projectTypeForm.get('description');
  }

  setDataToUpdate(projectTypeData: ProjectType) {
    this.projectTypeForm.reset();
    if (projectTypeData) {
      this.projectTypeForm.setValue({
        name: projectTypeData.name,
        description: projectTypeData.description,
      });
    }
  }

  onSubmit(projectTypeData) {
    this.projectTypeForm.reset();
    if (this.projectTypeToEdit) {
      const projectType = {
        ...projectTypeData,
        id: this.projectTypeToEdit.id,
      };
      this.store.dispatch(new UpdateProjectType(projectType));
      this.hasChangedEvent.emit(this.hasChange = false);
    } else {
      this.store.dispatch(new CreateProjectType({ ...projectTypeData, customer_id: this.customerId }));
      this.projectTypeForm.get('description').setValue('');
    }
  }

  cancelButton() {
    this.store.dispatch(new ResetProjectTypeToEdit());
    this.hasChangedEvent.emit(this.hasChange = false);
  }

  ngOnDestroy(): void {
    this.getCustomerIdSubscription.unsubscribe();
    this.projectTypeIdToEditSubscription.unsubscribe();
  }

  onInputChangeProjectType(searchValue: string): void {
    return searchValue ? this.hasChangedEvent.emit(this.hasChange = true) :
      this.hasChangedEvent.emit(this.hasChange = false);
  }
}
