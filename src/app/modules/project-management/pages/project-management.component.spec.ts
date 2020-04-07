import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Project } from '../../shared/models';
import { ProjectService } from './../services/project.service';
import { ProjectManagementComponent } from './project-management.component';

describe('ProjectsManagementComponent', () => {
  let component: ProjectManagementComponent;
  let projectService: ProjectService;
  const projectsFromApi: Project[] = [{ id: '123', name: 'aaa', description: 'xxx' }];

  const project: Project = {
    id: '1',
    name: 'app 1',
    description: 'It is a good app',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectManagementComponent],
      providers: [ProjectService, HttpClient, HttpHandler],
    });
    component = TestBed.createComponent(ProjectManagementComponent).componentInstance;
    projectService = TestBed.inject(ProjectService);
    spyOn(projectService, 'getProjects').and.returnValue(of(projectsFromApi));
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should filter the project to edit #editProject', () => {
    component.editProject(project);
    expect(component.project.name).toBe('app 1');
  });

  it('should clean the project #cancelForm', () => {
    const projectData = {
      id: '1',
      name: 'app 1',
      description: 'It is a good app',
    };

    component.project = projectData;
    component.cancelForm();
    expect(component.project).toBe(null);
  });
});
