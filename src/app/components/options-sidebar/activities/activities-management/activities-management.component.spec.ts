import { HttpClient, HttpHandler } from '@angular/common/http';
import { Activity } from './../model/activity';
import { of } from 'rxjs';
import { ActivityService } from './../services/activity.service';
import { async, TestBed } from '@angular/core/testing';

import { ActivitiesManagementComponent } from './activities-management.component';

describe('ActivitiesManagementComponent', () => {
  let component: ActivitiesManagementComponent;
  let activityService: ActivityService;
  const activitiesFromApi: Activity[] = [{id: '123', name: 'aaa', description: 'xxx'}];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesManagementComponent],
      providers: [ ActivityService, HttpClient, HttpHandler ]
    });
    component = TestBed.createComponent(ActivitiesManagementComponent).componentInstance;
    activityService = TestBed.get(ActivityService);
    spyOn(activityService, 'getActivities').and.returnValue(of(activitiesFromApi));
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load activities', () => {
    component.ngOnInit();
    expect(component.activities).toBe(activitiesFromApi);
  });
});
