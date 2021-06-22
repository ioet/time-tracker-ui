import { Activity } from '../../shared/models/activity.model';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { ActivityService } from '../services/activity.service';
import { ActivityManagementActionTypes } from './activity-management.actions';
import { ActivityEffects } from './activity-management.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { INFO_SAVED_SUCCESSFULLY, INFO_DELETE_SUCCESSFULLY } from '../../shared/messages';

describe('ActivityEffects', () => {
  let actions$: Observable<Action>;
  let effects: ActivityEffects;
  let service: ActivityService;
  let toastrService;
  const activity: Activity = { id: 'id', name: 'name', description: 'description', tenant_id: 'tenantId', status: 'inactive' };
  const activityList: Activity[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityEffects, provideMockActions(() => actions$)],
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      declarations: [],
    });
    effects = TestBed.inject(ActivityEffects);
    service = TestBed.inject(ActivityService);
    toastrService = TestBed.inject(ToastrService);
  });

  it('should be created', async () => {
    expect(effects).toBeTruthy();
  });

  it('action type is LOAD_ACTIVITIES_SUCCESS when service is executed sucessfully', async () => {
    actions$ = of({ type: ActivityManagementActionTypes.LOAD_ACTIVITIES });
    const serviceSpy = spyOn(service, 'getActivities');
    serviceSpy.and.returnValue(of(activityList));

    effects.getActivities$.subscribe((action) => {
      expect(action.type).toEqual(ActivityManagementActionTypes.LOAD_ACTIVITIES_SUCCESS);
    });
  });

  it('action type is LOAD_ACTIVITIES_FAIL when service fail in execution', async () => {
    actions$ = of({ type: ActivityManagementActionTypes.LOAD_ACTIVITIES });
    const serviceSpy = spyOn(service, 'getActivities');
    serviceSpy.and.returnValue(throwError({ error: { message: 'fail!' } }));
    spyOn(toastrService, 'error');

    effects.getActivities$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(ActivityManagementActionTypes.LOAD_ACTIVITIES_FAIL);
    });
  });

  it('action type is UPDATE_ACTIVITIES_SUCCESS when service is executed sucessfully', async () => {
    actions$ = of({ type: ActivityManagementActionTypes.UPDATE_ACTIVITY, activity });
    spyOn(service, 'updateActivity').and.returnValue(of(activity));
    spyOn(toastrService, 'success');

    effects.updateActivity$.subscribe((action) => {
      expect(toastrService.success).toHaveBeenCalledWith(INFO_SAVED_SUCCESSFULLY);
      expect(action.type).toEqual(ActivityManagementActionTypes.UPDATE_ACTIVITY_SUCCESS);
    });
  });

  it('action type is UPDATE_ACTIVITIES_FAIL when service fail in execution', async () => {
    actions$ = of({ type: ActivityManagementActionTypes.UPDATE_ACTIVITY, activity });
    spyOn(service, 'updateActivity').and.returnValue(throwError({ error: { message: 'fail!' } }));
    spyOn(toastrService, 'error');

    effects.updateActivity$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(ActivityManagementActionTypes.UPDATE_ACTIVITY_FAIL);
    });
  });

  it('action type is UNARCHIVE_ACTIVITY_SUCCESS when service is executed sucessfully', async () => {
    const activityId = 'activityId';
    actions$ = of({ type: ActivityManagementActionTypes.UNARCHIVE_ACTIVITY, activityId });
    spyOn(service, 'updateActivity').and.returnValue(of(activity));
    spyOn(toastrService, 'success');

    effects.unarchiveActivity$.subscribe((action) => {
      expect(toastrService.success).toHaveBeenCalledWith(INFO_SAVED_SUCCESSFULLY);
      expect(action.type).toEqual(ActivityManagementActionTypes.UNARCHIVE_ACTIVITY_SUCCESS);
    });
  });

  it('action type is UNARCHIVE_ACTIVITY_FAIL when service fail in execution', async () => {
    actions$ = of({ type: ActivityManagementActionTypes.UNARCHIVE_ACTIVITY, activity });
    spyOn(service, 'updateActivity').and.returnValue(throwError({ error: { message: 'fail!' } }));
    spyOn(toastrService, 'error');

    effects.unarchiveActivity$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(ActivityManagementActionTypes.UNARCHIVE_ACTIVITY_FAIL);
    });
  });

  it('action type is CREATE_ACTIVITY_SUCCESS when service is executed sucessfully', async () => {
    actions$ = of({ type: ActivityManagementActionTypes.CREATE_ACTIVITY, activity });
    spyOn(service, 'createActivity').and.returnValue(of(activity));
    spyOn(toastrService, 'success');

    effects.createActivity$.subscribe((action) => {
      expect(toastrService.success).toHaveBeenCalledWith(INFO_SAVED_SUCCESSFULLY);
      expect(action.type).toEqual(ActivityManagementActionTypes.CREATE_ACTIVITY_SUCCESS);
    });
  });

  it('action type is CREATE_ACTIVITY_FAIL when service fail in execution', async () => {
    actions$ = of({ type: ActivityManagementActionTypes.CREATE_ACTIVITY, activity });
    spyOn(service, 'createActivity').and.returnValue(throwError({ error: { message: 'fail!' } }));
    spyOn(toastrService, 'error');

    effects.createActivity$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(ActivityManagementActionTypes.CREATE_ACTIVITY_FAIL);
    });
  });

  it('action type is ARCHIVE_ACTIVITY_SUCCESS when service is executed sucessfully', async () => {
    const activityId = 'activityId';
    actions$ = of({ type: ActivityManagementActionTypes.ARCHIVE_ACTIVITY, activityId });
    spyOn(service, 'deleteActivity').and.returnValue(of({}));
    spyOn(toastrService, 'success');

    effects.archiveActivity$.subscribe((action) => {
      expect(toastrService.success).toHaveBeenCalledWith(INFO_DELETE_SUCCESSFULLY);
      expect(action.type).toEqual(ActivityManagementActionTypes.ARCHIVE_ACTIVITY_SUCCESS);
    });
  });

  it('action type is ARCHIVE_ACTIVITY_FAIL when service fail in execution', async () => {
    const activityId = 'activityId';
    actions$ = of({ type: ActivityManagementActionTypes.ARCHIVE_ACTIVITY, activityId });
    spyOn(service, 'deleteActivity').and.returnValue(throwError({ error: { message: 'fail!' } }));
    spyOn(toastrService, 'error');

    effects.archiveActivity$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(ActivityManagementActionTypes.ARCHIVE_ACTIVITY_FAIL);
    });
  });
});
