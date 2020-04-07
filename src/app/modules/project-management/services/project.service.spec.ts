import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Project } from '../../shared/models';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;

  const projectsList: Project[] = [
    {
      id: '1',
      name: 'app 1',
      description: 'It is a good app',
    },
    {
      id: '2',
      name: 'app 2',
      description: 'It is a good app',
    },
    {
      id: '3',
      name: 'app 3',
      description: 'It is a good app',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', inject(
    [HttpClientTestingModule, ProjectService],
    (httpClient: HttpClientTestingModule, apiService: ProjectService) => {
      expect(apiService).toBeTruthy();
      expect(httpClient).toBeTruthy();
    }
  ));

  it('projects are read using GET from url', () => {
    const projectsFoundSize = projectsList.length;
    service.url = '/projects';
    service.getProjects().subscribe((projectsInResponse) => {
      expect(projectsInResponse.length).toBe(projectsFoundSize);
    });
    const getProjectsRequest = httpMock.expectOne(service.url);
    expect(getProjectsRequest.request.method).toBe('GET');
    getProjectsRequest.flush(projectsList);
  });

  it('create project using POST from url', () => {
    const project: Project[] = [{ id: '1', name: 'ccc', description: 'xxx' }];
    service.url = 'projects';
    service.createProject(project).subscribe((response) => {
      expect(response.length).toBe(1);
    });
    const createProjectsRequest = httpMock.expectOne(service.url);
    expect(createProjectsRequest.request.method).toBe('POST');
    createProjectsRequest.flush(project);
  });

  it('update project using PUT from url', () => {
    const project: Project = { id: '1', name: 'new name', description: 'description' };
    service.url = 'projects';
    service.updateProject(project).subscribe((response) => {
      expect(response.name).toBe('new name');
    });
    const updateProjectRequest = httpMock.expectOne(`${service.url}/${project.id}`);
    expect(updateProjectRequest.request.method).toBe('PUT');
    updateProjectRequest.flush(project);
  });
});
