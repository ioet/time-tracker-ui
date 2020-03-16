import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagementComponent } from './project-management.component';
import { Project } from '../../../interfaces/project';

describe('ProjectManagementComponent', () => {
  let component: ProjectManagementComponent;
  let fixture: ComponentFixture<ProjectManagementComponent>;
  const projects: Project[] = [{
    id: 1,
    name: 'app 1',
    details: 'It is a good app',
    status: 'inactive',
    completed: true
  },
  {
    id: 2,
    name: 'app 2',
    details: 'It is a good app',
    status: 'inactive',
    completed: false
  },
  {
    id: 3,
    name: 'app 3',
    details: 'It is a good app',
    status: 'active',
    completed: true
  }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.projects = projects;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a project #updateProject', () => {
    const project = {
      name: 'app 4',
      details: 'It is a good app',
      status: 'inactive',
      completed: true
    };

    component.editedProjectId = null;
    component.updateProject(project);
    expect(component.projects.length).toEqual(4);
  });

  it('should edit a project #updateProject', () => {
    const project = {
      id: 1,
      name: 'app test',
      details: 'It is a excelent app',
      status: 'inactive',
      completed: true
    };

    component.editedProjectId = 1;
    component.updateProject(project);
    expect(component.projects.length).toEqual(3);
    expect(component.projects[0].name).toBe('app test');
    expect(component.projects[0].details).toBe('It is a excelent app');
    expect(component.projects[0].status).toBe('inactive');
    expect(component.projects[0].completed).toBe(true);
  });

  it('should filter the project to edit #editProject', () => {
    const editProjectId = 2;
    component.editProject(editProjectId);
    expect(component.project.name).toBe('app 2');
  });

  it('should clean the project #cancelForm', () => {
    const project = {
      id: 1,
      name: 'app 1',
      details: 'It is a good app',
      status: 'inactive',
      completed: true
    };

    component.project = project;
    component.cancelForm();
    expect(component.project).toBe(null);
  });
});
