import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Activity } from '../../shared/models';
import { ActivityService } from './activity.service';

describe('Activity Service', () => {
  let service: ActivityService;
  let httpMock: HttpTestingController;

  const activities: Activity[] = [
    { id: '1', name: 'aaa', description: 'xxx' },
    { id: '2', name: 'bbb', description: 'yyy' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(ActivityService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('services are ready to be used', inject(
    [HttpClientTestingModule, ActivityService],
    (httpClient: HttpClientTestingModule, activityService: ActivityService) => {
      expect(activityService).toBeTruthy();
      expect(httpClient).toBeTruthy();
    }
  ));

  it('activities are read using GET from baseUrl', () => {
    const activitiesFoundSize = activities.length;
    service.baseUrl = 'foo';
    service.getActivities().subscribe((activitiesInResponse) => {
      expect(activitiesInResponse.length).toBe(activitiesFoundSize);
    });
    const getActivitiesRequest = httpMock.expectOne(service.baseUrl);
    expect(getActivitiesRequest.request.method).toBe('GET');
    getActivitiesRequest.flush(activities);
  });

  it('create activity using POST from baseUrl', () => {
    const activity: Activity[] = [{ id: '1', name: 'ccc', description: 'xxx' }];

    service.baseUrl = 'activities';

    service.createActivity(activity).subscribe((response) => {
      expect(response.length).toBe(1);
    });
    const createActivitiesRequest = httpMock.expectOne(service.baseUrl);
    expect(createActivitiesRequest.request.method).toBe('POST');
    createActivitiesRequest.flush(activity);
  });

  it('activities are delete using DELETE from baseUrl', () => {
    const url = `${service.baseUrl}/1`;
    service.deleteActivity(activities[0].id).subscribe((activitiesInResponse) => {
      expect(activitiesInResponse.filter((activity) => activity.id !== activities[0].id)).toEqual([activities[1]]);
    });
    const deleteActivitiesRequest = httpMock.expectOne(url);
    expect(deleteActivitiesRequest.request.method).toBe('DELETE');
    deleteActivitiesRequest.flush(activities);
  });

  it('update activity using PUT from baseUrl', () => {
    const activity = { id: '1', name: 'aaa', description: 'bbb' };

    service.baseUrl = 'activities' + '/' + activity.id;

    service.updateActivity(activity).subscribe((response) => {
      expect(response.name).toBe('aaa');
    });
    const updateActivitiesRequest = httpMock.expectOne(`${service.baseUrl}/${activity.id}`);
    expect(updateActivitiesRequest.request.method).toBe('PUT');
    updateActivitiesRequest.flush(activity);
  });
});
