import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Project } from '../../../interfaces';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  @Input() projects: Project[] = [];
  @Output() editProject = new EventEmitter();
  @Output() deleteProject = new EventEmitter();
  filterProjects = '';

  projectToDelete: Project;
  openDeleteModal: Boolean = false;

  constructor() {}

  ngOnInit(): void {
  }

  openModal(projectData) {
    this.projectToDelete = projectData;
    this.openDeleteModal = true;
  }

  removeProject(projectId) {
    this.deleteProject.emit(projectId);
    this.projectToDelete = null;
  }
}
