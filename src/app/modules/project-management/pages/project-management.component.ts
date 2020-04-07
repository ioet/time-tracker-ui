import { Component, OnInit } from '@angular/core';
import { Project } from '../../shared/models';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss'],
})
export class ProjectManagementComponent implements OnInit {
  project: Project;

  constructor() {}

  ngOnInit(): void {}

  editProject(project) {
    this.project = project;
  }

  cancelForm() {
    this.project = null;
  }
}
