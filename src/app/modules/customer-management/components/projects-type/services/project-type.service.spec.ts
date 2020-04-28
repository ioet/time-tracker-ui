import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProjectType } from '../../../../shared/models';
import { ProjectTypeService } from './project-type.service';

describe('Activity Service', () => {
  let service: ProjectTypeService;
  let httpMock: HttpTestingController;

  const projectTypes: ProjectType[] = [
    { id: '1', name: 'aaa', description: 'xxx' },
    { id: '2', name: 'bbb', description: 'yyy' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(ProjectTypeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('services are ready to be used', inject(
    [HttpClientTestingModule, ProjectTypeService],
    (httpClient: HttpClientTestingModule, projectTypeService: ProjectTypeService) => {
      expect(projectTypeService).toBeTruthy();
      expect(httpClient).toBeTruthy();
    }
  ));

  it('projectTypes are read using GET from baseUrl', () => {
    const projectTypesFoundSize = projectTypes.length;
    service.baseUrl = '/project-types';
    service.getProjectTypes({ customerId: 'xyz' }).subscribe((projecttypesInResponse) => {
      expect(projecttypesInResponse.length).toBe(projectTypesFoundSize);
    });
    const getProjectTypesRequest = httpMock.expectOne(`${service.baseUrl}?customer_id=xyz`);
    expect(getProjectTypesRequest.request.method).toBe('GET');
    getProjectTypesRequest.flush(projectTypes);
  });

  it('create ProjectType using POST from baseUrl', () => {
    const activity: ProjectType[] = [{ id: '1', name: 'ccc', description: 'xxx' }];

    service.baseUrl = 'project-type';

    service.createProjectType(activity).subscribe((response) => {
      expect(response.length).toBe(1);
    });
    const createProjectTypesRequest = httpMock.expectOne(service.baseUrl);
    expect(createProjectTypesRequest.request.method).toBe('POST');
    createProjectTypesRequest.flush(activity);
  });

  it('ProjectTypes are delete using DELETE from baseUrl', () => {
    const url = `${service.baseUrl}/1`;
    service.deleteProjectType(projectTypes[0].id).subscribe((projectTypesInResponse) => {
      expect(projectTypesInResponse.filter((activity) => activity.id !== projectTypes[0].id)).toEqual([
        projectTypes[1],
      ]);
    });
    const getProjectTypesRequest = httpMock.expectOne(url);
    expect(getProjectTypesRequest.request.method).toBe('DELETE');
    getProjectTypesRequest.flush(projectTypes);
  });

  it('update activity using PUT from baseUrl', () => {
    const projectType = { id: '1', name: 'aaa', description: 'bbb' };

    service.baseUrl = 'project-type' + '/' + projectType.id;

    service.updateProjectType(projectType).subscribe((response) => {
      expect(response.name).toBe('aaa');
    });
    const updateProjectTypeRequest = httpMock.expectOne(`${service.baseUrl}/${projectType.id}`);
    expect(updateProjectTypeRequest.request.method).toBe('PUT');
    updateProjectTypeRequest.flush(projectType);
  });
});
