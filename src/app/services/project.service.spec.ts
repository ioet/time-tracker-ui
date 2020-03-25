import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Project } from '../interfaces';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;

  const projects: Project[] = [{
    id: '1',
    name: 'app 1',
    details: 'It is a good app',
    status: 'inactive',
    completed: true
  },
  {
    id: '2',
    name: 'app 2',
    details: 'It is a good app',
    status: 'inactive',
    completed: false
  },
  {
    id: '3',
    name: 'app 3',
    details: 'It is a good app',
    status: 'active',
    completed: true
  }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach (() => {
    httpMock.verify ();
  });

  it('should create', inject([HttpClientTestingModule, ProjectService],
    (httpClient: HttpClientTestingModule, apiService: ProjectService) => {
      expect(apiService).toBeTruthy();
      expect(httpClient).toBeTruthy();
  }));

  it('should get projects  API/GET #getProjects', () => {
    service.getProjects().subscribe(projects => {
        expect(projects.length).toBe(3);
        expect(projects).toEqual(projects);
    });
    const request = httpMock.expectOne('assets/project.json');
    expect(request.request.method).toBe('GET');
    request.flush(projects);
    });

});
