import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Project } from '../../../../../shared/models';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;

  const projectsList: Project[] = [
    {
      id: '1',
      name: 'app 1',
      description: 'It is a good app',
      project_type_id: '123',
    },
    {
      id: '2',
      name: 'app 2',
      description: 'It is a good app',
      project_type_id: '123',
    },
    {
      id: '3',
      name: 'app 3',
      description: 'It is a good app',
      project_type_id: '123',
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
    service.getProjects({ customerId: 'xyz' }).subscribe((projectsInResponse) => {
      expect(projectsInResponse.length).toBe(projectsFoundSize);
    });
    const getProjectsRequest = httpMock.expectOne(`${service.url}?customer_id=xyz`);
    expect(getProjectsRequest.request.method).toBe('GET');
    getProjectsRequest.flush(projectsList);
  });

  it('recent projects are read using GET from url/recent', () => {
    const projectsFoundSize = projectsList.length;
    service.getRecentProjects().subscribe((projectsInResponse) => {
      expect(projectsInResponse.length).toBe(projectsFoundSize);
    });
    const getProjectsRequest = httpMock.expectOne(`${service.url}/recent`);
    expect(getProjectsRequest.request.method).toBe('GET');
    getProjectsRequest.flush(projectsList);
  });

  it('create project using POST from url', () => {
    const project: Project[] = [{ id: '1', name: 'ccc', description: 'xxx', project_type_id: '123' }];
    service.url = 'projects';
    service.createProject(project).subscribe((response) => {
      expect(response.length).toBe(1);
    });
    const createProjectsRequest = httpMock.expectOne(service.url);
    expect(createProjectsRequest.request.method).toBe('POST');
    createProjectsRequest.flush(project);
  });

  it('update project using PUT from url', () => {
    const project: Project = { id: '1', name: 'new name', description: 'description', project_type_id: '123' };
    service.url = 'projects';
    service.updateProject(project).subscribe((response) => {
      expect(response.name).toBe('new name');
    });
    const updateProjectRequest = httpMock.expectOne(`${service.url}/${project.id}`);
    expect(updateProjectRequest.request.method).toBe('PUT');
    updateProjectRequest.flush(project);
  });

  it('delete project using DELETE from baseUrl', () => {
    const url = `${service.url}/1`;
    service.deleteProject(projectsList[0].id).subscribe((projectsInResponse) => {
      expect(projectsInResponse.filter((project) => project.id !== projectsList[0].id).length).toEqual(2);
    });
    const deleteActivitiesRequest = httpMock.expectOne(url);
    expect(deleteActivitiesRequest.request.method).toBe('DELETE');
    deleteActivitiesRequest.flush(projectsList);
  });
});
