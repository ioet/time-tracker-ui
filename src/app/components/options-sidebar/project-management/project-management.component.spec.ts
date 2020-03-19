import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ProjectManagementComponent } from './project-management.component';
import { Project } from '../../../interfaces/project';
import { ProjectService } from '../../../services/project.service';
import { of } from 'rxjs';

describe('ProjectManagementComponent', () => {
  let component: ProjectManagementComponent;
  let fixture: ComponentFixture<ProjectManagementComponent>;
  let projectService: ProjectService;

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

  const projectServiceStub = {
    getProjects() {
      const projectsMock = projects;
      return of(projectsMock);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManagementComponent ],
      providers: [ { provide: ProjectService, useValue: projectServiceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    projectService = TestBed.inject(ProjectService);
    component.projects = projects;
  });


  it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([ProjectService], (injectService: ProjectService) => {
      expect(injectService).toBe(projectService);
    })
  );

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

  it('should call getProjects method on init', () => {
    const preojectServiceSpy = spyOn(projectService, 'getProjects').and.callThrough();
    const componentSpy = spyOn(component, 'getProjects').and.callThrough();

    expect(preojectServiceSpy).not.toHaveBeenCalled();
    expect(componentSpy).not.toHaveBeenCalled();

    component.ngOnInit();

    expect(preojectServiceSpy).toHaveBeenCalledTimes(1);
    expect(componentSpy).toHaveBeenCalledTimes(1);
  });


  it('should call getProjects and return a list of projects', async(() => {

    spyOn(projectService, 'getProjects').and.returnValue(of(projects));

    component.ngOnInit();

    expect(component.projects).toEqual(projects);
  }));

  it('should delete a project #deleteProject', () => {
    const projectId = 1;

    component.deleteProject(projectId);
    expect(component.projects.length).toEqual(2);
  });
});
