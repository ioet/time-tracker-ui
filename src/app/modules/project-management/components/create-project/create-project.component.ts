import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Project } from '../../../shared/models';
import * as actions from '../../store/project.actions';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnChanges, OnInit {
  projectForm;
  editProjectId;
  isEdit = false;

  @Input() projectToEdit: Project;
  @Output() cancelForm = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private store: Store<any>) {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.projectToEdit) {
      this.projectForm.patchValue(this.projectToEdit);
      this.isEdit = true;
    } else {
      this.projectForm.reset();
      this.isEdit = false;
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
    if (!this.isEdit) {
      this.store.dispatch(new actions.PostProject(projectData));
    } else {
      this.store.dispatch(new actions.PutProject(projectData));
    }
    this.reset();
  }

  reset() {
    this.projectForm.reset();
    this.cancelForm.emit();
  }
}
