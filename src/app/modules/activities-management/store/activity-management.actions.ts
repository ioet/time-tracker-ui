import { Action } from '@ngrx/store';

import { Activity } from './../../shared/models/activity.model';

export enum ActivityManagementActionTypes {
  LOAD_ACTIVITIES = '[ActivityManagement] LOAD_ACTIVITIES',
  LOAD_ACTIVITIES_SUCCESS = '[ActivityManagement] LOAD_ACTIVITIES_SUCCESS',
  LOAD_ACTIVITIES_FAIL = '[ActivityManagement] LOAD_ACTIVITIES_FAIL',
  CREATE_ACTIVITY = '[ActivityManagement] CREATE_ACTIVITY',
  CREATE_ACTIVITY_SUCCESS = '[ActivityManagement] CREATE_ACTIVITY_SUCCESS',
  CREATE_ACTIVITY_FAIL = '[ActivityManagement] CREATE_ACTIVITY_FAIL',
}

export class LoadActivities implements Action {
  public readonly type = ActivityManagementActionTypes.LOAD_ACTIVITIES;
}

export class LoadActivitiesSuccess implements Action {
  public readonly type = ActivityManagementActionTypes.LOAD_ACTIVITIES_SUCCESS;

  constructor(public payload: Activity[]) {}
}

export class LoadActivitiesFail implements Action {
  public readonly type = ActivityManagementActionTypes.LOAD_ACTIVITIES_FAIL;

  constructor(public error: string) {}
}

export class CreateActivity implements Action {
  public readonly type = ActivityManagementActionTypes.CREATE_ACTIVITY;

  constructor(public payload: Activity) {}
}

export class CreateActivitySuccess implements Action {
  public readonly type = ActivityManagementActionTypes.CREATE_ACTIVITY_SUCCESS;

  constructor(public payload: Activity) {}
}

export class CreateActivityFail implements Action {
  public readonly type = ActivityManagementActionTypes.CREATE_ACTIVITY_FAIL;

  constructor(public error: string) {}
}

export type ActivityManagementActions =
  | LoadActivities
  | LoadActivitiesSuccess
  | LoadActivitiesFail
  | CreateActivity
  | CreateActivitySuccess
  | CreateActivityFail;
