import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import {
  ActivityManagementActionTypes,
  LoadActivitiesSuccess,
  LoadActivitiesFail,
  DeleteActivitySuccess,
} from './activity-management.actions';
import * as actions from './activity-management.actions';
import { Activity } from './../../shared/models/activity.model';
import { ActivityService } from './../services/activity.service';

@Injectable()
export class ActivityEffects {
  constructor(private actions$: Actions, private activityService: ActivityService) {}

  parameterFieldName = 'activityId';

  @Effect()
  getActivities$: Observable<Action> = this.actions$.pipe(
    ofType(ActivityManagementActionTypes.LOAD_ACTIVITIES),
    mergeMap(() =>
      this.activityService.getActivities().pipe(
        map((activities: Activity[]) => {
          return new LoadActivitiesSuccess(activities);
        }),
        catchError((error) => of(new LoadActivitiesFail(error)))
      )
    )
  );

  @Effect()
  deleteActivity$: Observable<Action> = this.actions$.pipe(
    ofType(ActivityManagementActionTypes.DELETE_ACTIVITY),
    map((action: actions.DeleteActivity) => action.activityId),
    mergeMap((activityId) =>
      this.activityService.deleteActivity(activityId).pipe(
        map(() => {
          return new DeleteActivitySuccess(activityId);
        })
      )
    )
  );
}
