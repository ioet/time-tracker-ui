import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { of, Subscription } from 'rxjs';
import { Activity } from '../../shared/models';
import { ActivityService } from './../services/activity.service';
import { ActivitiesManagementComponent } from './activities-management.component';
import { ActionsSubject } from '@ngrx/store';

describe('ActivitiesManagementComponent', () => {
  let component: ActivitiesManagementComponent;
  let fixture: ComponentFixture<ActivitiesManagementComponent>;
  let activityService: ActivityService;
  const activitiesFromApi: Activity[] = [{ id: '123', name: 'aaa', description: 'xxx' }];

  beforeEach(async(() => {
    const actionSub: ActionsSubject = new ActionsSubject();
    TestBed.configureTestingModule({
      declarations: [ActivitiesManagementComponent],
      providers: [ActivityService, HttpClient, HttpHandler, { provide: ActionsSubject, useValue: actionSub }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    activityService = TestBed.inject(ActivityService);
    spyOn(activityService, 'getActivities').and.returnValue(of(activitiesFromApi));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call #setDataNotification with action #ngOnInit', () => {
    const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
    spyOn(component, 'setDataNotification');
    const action = {
      type: '[ActivityManagement] CREATE_ACTIVITY_SUCCESS',
    };
    actionSubject.next(action);

    component.ngOnInit();
    expect(component.setDataNotification).toHaveBeenCalledWith(action.type);
  });

  it('should destroy the subscription', () => {
    component.actionsSubscription = new Subscription();
    const subscription = spyOn(component.actionsSubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(subscription).toHaveBeenCalledTimes(1);
  });

  it('#setDataNotification should show an success notification with DELETE_ACTIVITY_SUCCESS case', () => {
    const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
    const action = {
      type: '[ActivityManagement] DELETE_ACTIVITY_SUCESS',
    };
    actionSubject.next(action);

    component.setDataNotification(action.type);
    expect(component.showNotification).toBeTrue();
    expect(component.isError).toBeFalse();
  });

  it('#setDataNotification should show an error notification with CREATE_ACTIVITY_FAIL case', () => {
    const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
    const action = {
      type: '[ActivityManagement] CREATE_ACTIVITY_FAIL',
    };
    actionSubject.next(action);

    component.setDataNotification(action.type);
    expect(component.showNotification).toBeTrue();
    expect(component.isError).toBeTrue();
  });

  it('#setDataNotification should not show an error notification with incorrect action', () => {
    const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
    const action = {
      type: '[ActivityManagement] TEST',
    };
    actionSubject.next(action);

    component.setDataNotification(action.type);
    expect(component.showNotification).toBeFalse();
    expect(component.isError).toBeFalse();
  });
});
