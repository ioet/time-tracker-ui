import { Action } from '@ngrx/store';

import { Activity } from './../../shared/models/activity.model';

export enum ActivityManagementActionTypes {
  LOAD_ACTIVITIES = '[ActivityManagement] LOAD_ACTIVITIES',
  LOAD_ACTIVITIES_SUCCESS = '[ActivityManagement] LOAD_ACTIVITIES_SUCCESS',
  LOAD_ACTIVITIES_FAIL = '[ActivityManagement] LOAD_ACTIVITIES_FAIL',
  CREATE_ACTIVITY = '[ActivityManagement] CREATE_ACTIVITY',
  CREATE_ACTIVITY_SUCCESS = '[ActivityManagement] CREATE_ACTIVITY_SUCCESS',
  CREATE_ACTIVITY_FAIL = '[ActivityManagement] CREATE_ACTIVITY_FAIL',
  DELETE_ACTIVITY = '[ActivityManagement] DELETE_ACTIVITY',
  DELETE_ACTIVITY_SUCCESS = '[ActivityManagement] DELETE_ACTIVITY_SUCESS',
  DELETE_ACTIVITY_FAIL = '[ActivityManagement] DELETE_ACTIVITY_FAIL',
  UPDATE_ACTIVITY = '[ActivityManagement] UPDATE_ACTIVITY',
  UPDATE_ACTIVITY_SUCCESS = '[ActivityManagement] UPDATE_ACTIVITY_SUCCESS',
  UPDATE_ACTIVITY_FAIL = '[ActivityManagement] UPDATE_ACTIVITY_FAIL',
  SET_ACTIVITY_ID_TO_EDIT = '[ActivityManagement] SET_ACTIVITY_ID_TO_EDIT',
  RESET_ACTIVITY_ID_TO_EDIT = '[ActivityManagement] RESET_ACTIVITY_ID_TO_EDIT',
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

export class DeleteActivity implements Action {
  public readonly type = ActivityManagementActionTypes.DELETE_ACTIVITY;

  constructor(public activityId: string) {}
}

export class DeleteActivitySuccess implements Action {
  public readonly type = ActivityManagementActionTypes.DELETE_ACTIVITY_SUCCESS;

  constructor(public activityId: string) {}
}

export class DeleteActivityFail implements Action {
  public readonly type = ActivityManagementActionTypes.DELETE_ACTIVITY_FAIL;

  constructor(public error: string) {}
}
export class UpdateActivity implements Action {
  public readonly type = ActivityManagementActionTypes.UPDATE_ACTIVITY;

  constructor(public payload: Activity) {}
}

export class UpdateActivitySuccess implements Action {
  public readonly type = ActivityManagementActionTypes.UPDATE_ACTIVITY_SUCCESS;

  constructor(public payload: Activity) {}
}

export class UpdateActivityFail implements Action {
  public readonly type = ActivityManagementActionTypes.UPDATE_ACTIVITY_FAIL;

  constructor(public error: string) {}
}

export class SetActivityToEdit implements Action {
  public readonly type = ActivityManagementActionTypes.SET_ACTIVITY_ID_TO_EDIT;

  constructor(public payload: string) {}
}

export class ResetActivityToEdit implements Action {
  public readonly type = ActivityManagementActionTypes.RESET_ACTIVITY_ID_TO_EDIT;
}

export type ActivityManagementActions =
  | LoadActivities
  | LoadActivitiesSuccess
  | LoadActivitiesFail
  | CreateActivity
  | CreateActivitySuccess
  | CreateActivityFail
  | DeleteActivity
  | DeleteActivitySuccess
  | DeleteActivityFail
  | UpdateActivity
  | UpdateActivitySuccess
  | UpdateActivityFail
  | SetActivityToEdit
  | ResetActivityToEdit;
