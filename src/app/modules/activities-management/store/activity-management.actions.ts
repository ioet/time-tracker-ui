import { Action } from '@ngrx/store';

import { Activity, ActivityStatus } from './../../shared/models/activity.model';

export enum ActivityManagementActionTypes {
  LOAD_ACTIVITIES = '[ActivityManagement] LOAD_ACTIVITIES',
  LOAD_ACTIVITIES_SUCCESS = '[ActivityManagement] LOAD_ACTIVITIES_SUCCESS',
  LOAD_ACTIVITIES_FAIL = '[ActivityManagement] LOAD_ACTIVITIES_FAIL',
  CREATE_ACTIVITY = '[ActivityManagement] CREATE_ACTIVITY',
  CREATE_ACTIVITY_SUCCESS = '[ActivityManagement] CREATE_ACTIVITY_SUCCESS',
  CREATE_ACTIVITY_FAIL = '[ActivityManagement] CREATE_ACTIVITY_FAIL',
  ARCHIVE_ACTIVITY = '[ActivityManagement] ARCHIVE_ACTIVITY',
  ARCHIVE_ACTIVITY_SUCCESS = '[ActivityManagement] ARCHIVE_ACTIVITY_SUCCESS',
  ARCHIVE_ACTIVITY_FAIL = '[ActivityManagement] ARCHIVE_ACTIVITY_FAIL',
  UPDATE_ACTIVITY = '[ActivityManagement] UPDATE_ACTIVITY',
  UPDATE_ACTIVITY_SUCCESS = '[ActivityManagement] UPDATE_ACTIVITY_SUCCESS',
  UPDATE_ACTIVITY_FAIL = '[ActivityManagement] UPDATE_ACTIVITY_FAIL',
  UNARCHIVE_ACTIVITY = '[ActivityManagement] UNARCHIVE_ACTIVITY',
  UNARCHIVE_ACTIVITY_SUCCESS = '[ActivityManagement] UNARCHIVE_ACTIVITY_SUCCESS',
  UNARCHIVE_ACTIVITY_FAIL = '[ActivityManagement] UNARCHIVE_ACTIVITY_FAIL',
  SET_ACTIVITY_ID_TO_EDIT = '[ActivityManagement] SET_ACTIVITY_ID_TO_EDIT',
  RESET_ACTIVITY_ID_TO_EDIT = '[ActivityManagement] RESET_ACTIVITY_ID_TO_EDIT',
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

  constructor(public error: string) { }
}

export class CreateActivity implements Action {
  public readonly type = ActivityManagementActionTypes.CREATE_ACTIVITY;

  constructor(public payload: Activity) { }
}

export class CreateActivitySuccess implements Action {
  public readonly type = ActivityManagementActionTypes.CREATE_ACTIVITY_SUCCESS;

  constructor(public payload: Activity) { }
}

export class CreateActivityFail implements Action {
  public readonly type = ActivityManagementActionTypes.CREATE_ACTIVITY_FAIL;

  constructor(public error: string) { }
}

export class ArchiveActivity implements Action {
  public readonly type = ActivityManagementActionTypes.ARCHIVE_ACTIVITY;

  constructor(public activityId: string) { }
}

export class ArchiveActivitySuccess implements Action {
  public readonly type = ActivityManagementActionTypes.ARCHIVE_ACTIVITY_SUCCESS;

  constructor(public payload: ActivityStatus) { }
}

export class ArchiveActivityFail implements Action {
  public readonly type = ActivityManagementActionTypes.ARCHIVE_ACTIVITY_FAIL;

  constructor(public error: string) { }
}

export class UpdateActivity implements Action {
  public readonly type = ActivityManagementActionTypes.UPDATE_ACTIVITY;

  constructor(public payload: Activity) { }
}

export class UpdateActivitySuccess implements Action {
  public readonly type = ActivityManagementActionTypes.UPDATE_ACTIVITY_SUCCESS;

  constructor(public payload: Activity) { }
}

export class UpdateActivityFail implements Action {
  public readonly type = ActivityManagementActionTypes.UPDATE_ACTIVITY_FAIL;

  constructor(public error: string) { }
}

export class UnarchiveActivity implements Action {
  public readonly type = ActivityManagementActionTypes.UNARCHIVE_ACTIVITY;

  constructor(public payload: string) { }
}
export class UnarchiveActivitySuccess implements Action {
  public readonly type = ActivityManagementActionTypes.UNARCHIVE_ACTIVITY_SUCCESS;

  constructor(public payload: ActivityStatus) { }
}
export class UnarchiveActivityFail implements Action {
  public readonly type = ActivityManagementActionTypes.UNARCHIVE_ACTIVITY_FAIL;

  constructor(public error: string) { }
}

export class SetActivityToEdit implements Action {
  public readonly type = ActivityManagementActionTypes.SET_ACTIVITY_ID_TO_EDIT;

  constructor(public payload: string) { }
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
  | ArchiveActivity
  | ArchiveActivitySuccess
  | ArchiveActivityFail
  | UpdateActivity
  | UpdateActivitySuccess
  | UpdateActivityFail
  | UnarchiveActivity
  | UnarchiveActivitySuccess
  | UnarchiveActivityFail
  | SetActivityToEdit
  | ResetActivityToEdit;
