import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';

import {ActivityManagementActionTypes, LoadActivitiesSuccess, LoadActivitiesFail} from './activity-management.actions';
import {Activity} from './../../shared/models/activity.model';
import {ActivityService} from './../services/activity.service';

@Injectable()
export class ActivityEffects {

    constructor(private actions$: Actions, private activityService: ActivityService) {}

    @Effect()
    getActivities$: Observable < Action > = this
        .actions$
        .pipe(ofType(ActivityManagementActionTypes.LOAD_ACTIVITIES),
        mergeMap(() => this.activityService.getActivities().pipe(map((activities: Activity[]) => {
            return new LoadActivitiesSuccess(activities);
        }), catchError((error) => of(new LoadActivitiesFail(error))))));

    // TODO: implement the proper code to delete an activity
        // @Effect()
    // deleteActivity$: Observable < Action > = this
    //     .actions$
    //     .pipe(ofType(ActivityManagementActionTypes.DELETE_ACTIVITY),
    //     mergeMap(() => this.activityService.deleteActivity().pipe(map((activities: Activity[]) => {
    //         return new LoadActivitiesSuccess(activities);
    //     }), catchError((error) => of(new LoadActivitiesFail(error))))));
}
