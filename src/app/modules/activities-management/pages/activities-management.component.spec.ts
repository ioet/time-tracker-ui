import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { of, Subscription } from 'rxjs';
import { Activity } from '../../shared/models';
import { ActivityService } from './../services/activity.service';
import { ActivitiesManagementComponent } from './activities-management.component';
import { ActionsSubject } from '@ngrx/store';
import { ActivityManagementActionTypes } from '../store';
import { ToastrService, ToastrModule, IndividualConfig } from 'ngx-toastr';

describe('ActivitiesManagementComponent', () => {
  let component: ActivitiesManagementComponent;
  let fixture: ComponentFixture<ActivitiesManagementComponent>;
  let activityService: ActivityService;
  const activitiesFromApi: Activity[] = [{ id: '123', name: 'aaa', description: 'xxx' }];
  const toastrService = {
    success: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { },
    error: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { }
  };
  let injectedToastrService;

  beforeEach(async(() => {
    const actionSub: ActionsSubject = new ActionsSubject();
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      declarations: [ActivitiesManagementComponent],
      providers: [ActivityService, HttpClient, HttpHandler,
        { provide: ActionsSubject, useValue: actionSub },
        { provide: ToastrService, useValue: toastrService }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    injectedToastrService = TestBed.inject(ToastrService);
    console.log(injectedToastrService);
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

  it('has a succesfull message on CREATE_ACTIVITY_SUCCESS', () => {
    spyOn(injectedToastrService, 'success');
    component.setDataNotification(ActivityManagementActionTypes.CREATE_ACTIVITY_SUCCESS);

    expect(injectedToastrService.success).toHaveBeenCalled();
  });

  it('has a succesfull message on UPDATE_ACTIVITY_SUCCESS', () => {
    spyOn(injectedToastrService, 'success');
    component.setDataNotification(ActivityManagementActionTypes.UPDATE_ACTIVITY_SUCCESS);

    expect(injectedToastrService.success).toHaveBeenCalled();
  });

  it('should destroy the subscription', () => {
    component.actionsSubscription = new Subscription();
    const subscription = spyOn(component.actionsSubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(subscription).toHaveBeenCalledTimes(1);
  });

  it('#setDataNotification should show an success notification with DELETE_ACTIVITY_SUCCESS case', () => {
    spyOn(injectedToastrService, 'success').and.returnValue(of(activitiesFromApi));
    const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
    const action = {
      type: '[ActivityManagement] DELETE_ACTIVITY_SUCESS',
    };
    actionSubject.next(action);

    component.setDataNotification(action.type);
    expect(injectedToastrService.success).toHaveBeenCalled();
  });

  it('shows an error notification with CREATE_ACTIVITY_FAIL case', () => {
    spyOn(injectedToastrService, 'error');

    component.setDataNotification(ActivityManagementActionTypes.CREATE_ACTIVITY_FAIL);

    expect(injectedToastrService.error).toHaveBeenCalled();
  });

  it('shows an error notification with UPDATE_ACTIVITY_FAIL case', () => {
    spyOn(injectedToastrService, 'error');

    component.setDataNotification(ActivityManagementActionTypes.UPDATE_ACTIVITY_FAIL);

    expect(injectedToastrService.error).toHaveBeenCalled();
  });

  it('shows an error notification with DELETE_ACTIVITY_FAIL case', () => {
    spyOn(injectedToastrService, 'error');

    component.setDataNotification(ActivityManagementActionTypes.DELETE_ACTIVITY_FAIL);

    expect(injectedToastrService.error).toHaveBeenCalled();
  });

  it('#setDataNotification should not show an error notification with incorrect action', () => {
    spyOn(injectedToastrService, 'success').and.returnValue(of(activitiesFromApi));
    const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
    const action = {
      type: '[ActivityManagement] TEST',
    };
    actionSubject.next(action);

    component.setDataNotification(action.type);
  });
});
