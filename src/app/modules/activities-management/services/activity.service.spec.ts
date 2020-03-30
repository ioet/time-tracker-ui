import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Activity } from '../../shared/models';
import { ActivityService } from './activity.service';

describe('Activity Service', () => {
  let service: ActivityService;
  let httpMock: HttpTestingController;

  const activities: Activity[] = [
      { id: '1', name: 'aaa', description: 'xxx' },
      { id: '2', name: 'bbb', description: 'yyy' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(ActivityService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('services are ready to be used', inject([ HttpClientTestingModule, ActivityService ],
    (httpClient: HttpClientTestingModule, activityService: ActivityService) => {
    expect(activityService).toBeTruthy();
    expect(httpClient).toBeTruthy();
  }));

  it('activities are read using GET from assets/activities.json URL', () => {
    const activitiesFoundSize = activities.length;
    service
      .getActivities()
      .subscribe(activitiesInResponse => {
        expect(activitiesInResponse.length).toBe(activitiesFoundSize);
      });
    const getActivitiesRequest = httpMock.expectOne('assets/activities.json');
    expect(getActivitiesRequest.request.method).toBe('GET');
    getActivitiesRequest.flush(activities);
  });
});
