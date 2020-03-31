import { Activity } from './../../shared/models/activity.model';
import { Action } from '@ngrx/store';

export enum ActivityManagementActionTypes {
    LoadActivities = '[ActivityManagement] Load Activities',
    LoadActivitiesSuccess = '[ActivityManagement] Load Activities Successs',
    LoadActivitiesFail = '[ActivityManagement] Load Activities Fail',
}


export class LoadActivities implements Action {
    public readonly type = ActivityManagementActionTypes.LoadActivities;
}

export class LoadActivitiesSuccess implements Action {
    public readonly type = ActivityManagementActionTypes.LoadActivitiesSuccess;

    constructor(public payload: Activity[]) { }
}

export class LoadActivitiesFail implements Action {
    public readonly type = ActivityManagementActionTypes.LoadActivitiesFail;

    constructor(public error) { }
}

export type ActivityManagementActions = LoadActivities | LoadActivitiesSuccess | LoadActivitiesFail;
