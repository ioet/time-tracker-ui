import { Action, createAction, props } from '@ngrx/store';

import { User } from '../users/models/users';
import { Activity, ActivityStatus } from '../shared/models/activity.model';

export const LOAD_ACTIVITIES = '[ActivityManagement] LOAD_ACTIVITIES';
export const LOAD_ACTIVITIES_SUCCESS = '[ActivityManagement] LOAD_ACTIVITIES_SUCCESS';
export const LOAD_ACTIVITIES_FAIL = '[ActivityManagement] LOAD_ACTIVITIES_FAIL';
export const CREATE_ACTIVITY = '[ActivityManagement] CREATE_ACTIVITY';
export const CREATE_ACTIVITY_SUCCESS = '[ActivityManagement] CREATE_ACTIVITY_SUCCESS';
export const CREATE_ACTIVITY_FAIL = '[ActivityManagement] CREATE_ACTIVITY_FAIL';
export const ARCHIVE_ACTIVITY = '[ActivityManagement] ARCHIVE_ACTIVITY';
export const ARCHIVE_ACTIVITY_SUCCESS = '[ActivityManagement] ARCHIVE_ACTIVITY_SUCCESS';
export const ARCHIVE_ACTIVITY_FAIL = '[ActivityManagement] ARCHIVE_ACTIVITY_FAIL';
export const UPDATE_ACTIVITY = '[ActivityManagement] UPDATE_ACTIVITY';
export const UPDATE_ACTIVITY_SUCCESS = '[ActivityManagement] UPDATE_ACTIVITY_SUCCESS';
export const UPDATE_ACTIVITY_FAIL = '[ActivityManagement] UPDATE_ACTIVITY_FAIL';
export const UNARCHIVE_ACTIVITY = '[ActivityManagement] UNARCHIVE_ACTIVITY';
export const UNARCHIVE_ACTIVITY_SUCCESS = '[ActivityManagement] UNARCHIVE_ACTIVITY_SUCCESS';
export const UNARCHIVE_ACTIVITY_FAIL = '[ActivityManagement] UNARCHIVE_ACTIVITY_FAIL';
export const SET_ACTIVITY_ID_TO_EDIT = '[ActivityManagement] SET_ACTIVITY_ID_TO_EDIT';
export const RESET_ACTIVITY_ID_TO_EDIT = '[ActivityManagement] RESET_ACTIVITY_ID_TO_EDIT';
export const DEFAULT_ACTIVITY = '[ActivityManagement] DEFAULT_ACTIVITY';

export class Load implements Action{
  public readonly type = LOAD_ACTIVITIES;
}
export const actionsBaseActionssSuccess = createAction(
  '[BaseActions] Actions BaseActionss Success',
  props<{ data: any }>()
);

export const actionsBaseActionssFailure = createAction(
  '[BaseActions] Actions BaseActionss Failure',
  props<{ error: any }>()
);
