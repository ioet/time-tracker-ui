import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Project } from '../../../interfaces/project';
import { Output, EventEmitter } from '@angular/core';
import { ProjectListComponent } from '../project-list/project-list.component';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  projectForm;
  editProjectId;
  projectStatus = ['', 'Active', 'Inactive'];

  @Input() projectToEdit: Project;
  @Output() savedProject = new EventEmitter();
  @Output() cancelForm = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      details: ['', Validators.required],
      status: ['', Validators.required],
      completed: [false]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.projectToEdit) {
      this.editProjectId = this.projectToEdit.id;
      this.projectForm.setValue({name: this.projectToEdit.name, details: this.projectToEdit.details,
        status: this.projectToEdit.status, completed: this.projectToEdit.completed});
    }
  }

  get name() {
    return this.projectForm.get('name');
  }

  get details() {
    return this.projectForm.get('details');
  }

  get status() {
    return this.projectForm.get('status');
  }

  onSubmit(projectData) {
    this.reset();
    this.savedProject.emit(projectData);
  }
  reset() {
    this.projectForm.reset();
    this.cancelForm.emit();
  }

}
