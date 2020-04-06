import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as actions from './activity-management.actions';
import { Activity } from './../../shared/models/activity.model';
import { ActivityService } from './../services/activity.service';

@Injectable()
export class ActivityEffects {
  constructor(private actions$: Actions, private activityService: ActivityService) {}

  @Effect()
  getActivities$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActivityManagementActionTypes.LOAD_ACTIVITIES),
    mergeMap(() =>
      this.activityService.getActivities().pipe(
        map((activities: Activity[]) => {
          return new actions.LoadActivitiesSuccess(activities);
        }),
        catchError((error) => of(new actions.LoadActivitiesFail(error)))
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
          return new actions.CreateActivitySuccess(activityData);
        }),
        catchError((error) => of(new actions.CreateActivityFail(error)))
      )
    )
  );
}
