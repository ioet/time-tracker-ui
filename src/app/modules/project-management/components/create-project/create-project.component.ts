import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Project } from '../../../shared/models';
import { ProjectState } from '../../store/project.reducer';
import * as actions from '../../store/project.actions';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnChanges, OnInit {
  projectForm;
  editProjectId;
  isUpdating = false;

  @Input() projectToEdit: Project;
  @Output() cancelForm = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private store: Store<ProjectState>) {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.projectToEdit) {
      this.projectForm.patchValue(this.projectToEdit);
      this.isUpdating = true;
    } else {
      this.projectForm.reset();
      this.isUpdating = false;
    }
  }

  get name() {
    return this.projectForm.get('name');
  }

  get description() {
    return this.projectForm.get('description');
  }

  onSubmit(formData) {
    const projectData = { ...this.projectToEdit, ...formData };
    if (this.isUpdating) {
      this.store.dispatch(new actions.UpdateProject(projectData));
    } else {
      this.store.dispatch(new actions.CreateProject(projectData));
    }
    this.reset();
  }

  reset() {
    this.projectForm.reset();
    this.cancelForm.emit();
  }
}
