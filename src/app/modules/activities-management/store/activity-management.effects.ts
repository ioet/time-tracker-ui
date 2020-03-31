import { ActivityManagementActionTypes, LoadActivitiesSuccess, LoadActivitiesFail } from './activity-management.actions';
import { Activity } from './../../shared/models/activity.model';
import { ActivityService } from './../services/activity.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class ActivityEffects {

    constructor(private actions$: Actions, private activityService: ActivityService) { }

    @Effect()
    getActivities$: Observable<Action> = this.actions$.pipe(
        ofType(ActivityManagementActionTypes.LoadActivities),
        mergeMap(() =>
            this.activityService.getActivities().pipe(
                map((activities: Activity[]) => {
                    return new LoadActivitiesSuccess(activities);
                }),
                catchError((error) =>
                    of(new LoadActivitiesFail(error)))
            )
        ));
}
