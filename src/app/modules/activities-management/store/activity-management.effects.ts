import { INFO_SAVED_SUCCESSFULLY, INFO_DELETE_SUCCESSFULLY } from '../../shared/messages';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import * as actions from './activity-management.actions';
import { Activity, ActivityStatus } from './../../shared/models/activity.model';
import { ActivityService } from './../services/activity.service';

@Injectable()
export class ActivityEffects {
  constructor(
    private actions$: Actions,
    private activityService: ActivityService,
    private toastrService: ToastrService
  ) { }

  @Effect()
  getActivities$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActivityManagementActionTypes.LOAD_ACTIVITIES),
    mergeMap(() =>
      this.activityService.getActivities().pipe(
        map((activities: Activity[]) => {
          return new actions.LoadActivitiesSuccess(activities);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.LoadActivitiesFail(error));
        })
      )
    )
  );

  @Effect()
  createActivity$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActivityManagementActionTypes.CREATE_ACTIVITY),
    map((action: actions.CreateActivity) => action.payload),
    mergeMap((activity) =>
      this.activityService.createActivity(activity).pipe(
        map((activityData) => {
          this.toastrService.success(INFO_SAVED_SUCCESSFULLY);
          return new actions.CreateActivitySuccess(activityData);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.CreateActivityFail(error));
        })
      )
    )
  );

  @Effect()
  archiveActivity$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActivityManagementActionTypes.ARCHIVE_ACTIVITY),
    map((action: actions.ArchiveActivity) => ({
      id: action.activityId,
      status: 'inactive'
    })),
    mergeMap((activity: ActivityStatus) =>
      this.activityService.deleteActivity(activity.id).pipe(
        map(() => {
          this.toastrService.success(INFO_DELETE_SUCCESSFULLY);
          return new actions.ArchiveActivitySuccess(activity);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.ArchiveActivityFail(error));
        })
      )
    )
  );

  @Effect()
  updateActivity$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActivityManagementActionTypes.UPDATE_ACTIVITY),
    map((action: actions.UpdateActivity) => action.payload),
    mergeMap((activity) =>
      this.activityService.updateActivity(activity).pipe(
        map((activityData) => {
          this.toastrService.success(INFO_SAVED_SUCCESSFULLY);
          return new actions.UpdateActivitySuccess(activityData);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.UpdateActivityFail(error));
        })
      )
    )
  );

  @Effect()
  unarchiveActivity$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActivityManagementActionTypes.UNARCHIVE_ACTIVITY),
    map((action: actions.UnarchiveActivity) => ({
      id: action.payload,
      status: 'active'
    })
    ),
    mergeMap((activity: ActivityStatus) =>
      this.activityService.updateActivity(activity).pipe(
        map((activityData) => {
          this.toastrService.success(INFO_SAVED_SUCCESSFULLY);
          return new actions.UnarchiveActivitySuccess(activityData);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.UnarchiveActivityFail(error));
        })
      )
    )
  );
}
