import { Component, OnInit } from '@angular/core';
import { Project } from '../../../interfaces/project';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})
export class ProjectManagementComponent implements OnInit {

  editedProjectId;

  project: Project;

  projects: Project[] = [];

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.getProjects();
  }

  updateProject(projectData): void {
    if (this.editedProjectId) {
      const projectIndex = this.projects.findIndex((project => project.id === this.editedProjectId));
      this.projects[projectIndex].name = projectData.name;
      this.projects[projectIndex].details = projectData.details;
      this.projects[projectIndex].status = projectData.status;
      this.projects[projectIndex].completed = projectData.completed;
    } else {
      const newProject: Project = { id: this.projects.length + 1, name: projectData.name,
        details: projectData.details, status: projectData.status, completed: false
      };
      this.projects = this.projects.concat(newProject);
    }
    console.log(this.projects);
  }

  editProject(projectId) {
    this.editedProjectId = projectId;
    this.project = this.projects.filter((project) => project.id === projectId)[0];
  }

  deleteProject(projectId): void {
    this.projects = this.projects.filter((project) => project.id !== projectId);
  }

  cancelForm() {
    this.project = null;
  }

   getProjects() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }
}
