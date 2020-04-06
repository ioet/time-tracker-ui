import { Action } from '@ngrx/store';

import { Activity } from './../../shared/models/activity.model';

export enum ActivityManagementActionTypes {
    LOAD_ACTIVITIES = '[ActivityManagement] Load Activities',
    LOAD_ACTIVITIES_SUCCESS = '[ActivityManagement] Load Activities Successs',
    LOAD_ACTIVITIES_FAIL = '[ActivityManagement] Load Activities Fail',
    DELETE_ACTIVITY = '[ActivityManagement] Delete Activity',
    DELETE_ACTIVITY_SUCCESS = '[ActivityManagement] Delete Activity Success',
}

export class DeleteActivity implements Action {
    public readonly type = ActivityManagementActionTypes.DELETE_ACTIVITY;

    constructor(public activityId: string) { }
}

export class DeleteActivitySuccess implements Action {
    public readonly type = ActivityManagementActionTypes.DELETE_ACTIVITY_SUCCESS;

    constructor(public activityId: string) { }
}

export class LoadActivities implements Action {
    public readonly type = ActivityManagementActionTypes.LOAD_ACTIVITIES;
}

export class LoadActivitiesSuccess implements Action {
    public readonly type = ActivityManagementActionTypes.LOAD_ACTIVITIES_SUCCESS;

    constructor(public payload: Activity[]) { }
}

export class LoadActivitiesFail implements Action {
    public readonly type = ActivityManagementActionTypes.LOAD_ACTIVITIES_FAIL;

    constructor(public error) { }
}

export type ActivityManagementActions
= DeleteActivitySuccess | DeleteActivity |
LoadActivities | LoadActivitiesSuccess | LoadActivitiesFail;
