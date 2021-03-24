import { Action } from '@ngrx/store';
import { User } from '../models/users';

export enum UserActionTypes {
  LOAD_USERS = '[User] LOAD_USERS',
  LOAD_USERS_SUCCESS = '[User] LOAD_USERS_SUCCESS',
  LOAD_USERS_FAIL = '[User] LOAD_USERS_FAIL',
  GRANT_USER_ROLE = '[User] GRANT_USER_ROLE',
  GRANT_USER_ROLE_SUCCESS = '[User] GRANT_USER_ROLE_SUCCESS',
  GRANT_USER_ROLE_FAIL = '[User] GRANT_USER_ROLE_FAIL',
  REVOKE_USER_ROLE = '[User] REVOKE_USER_ROLE',
  REVOKE_USER_ROLE_SUCCESS = '[User] REVOKE_USER_ROLE_SUCCESS',
  REVOKE_USER_ROLE_FAIL = '[User] REVOKE_USER_ROLE_FAIL',
  ADD_GROUP_TO_USER = '[User] ADD_GROUP_TO_USER',
  ADD_GROUP_TO_USER_SUCCESS = '[User] ADD_GROUP_TO_USER_SUCCESS',
  ADD_GROUP_TO_USER_FAIL = '[User] ADD_GROUP_TO_USER_FAIL',
  REMOVE_GROUP_TO_USER = '[User] REMOVE_GROUP_TO_USER',
  REMOVE_GROUP_TO_USER_SUCCESS = '[User] REMOVE_GROUP_TO_USER_SUCCESS',
  REMOVE_GROUP_TO_USER_FAIL = '[User] REMOVE_GROUP_TO_USER_FAIL',
  DEFAULT_USER = '[USER] DEFAULT_USER',
}

export class LoadUsers implements Action {
  public readonly type = UserActionTypes.LOAD_USERS;
}

export class LoadUsersSuccess implements Action {
  readonly type = UserActionTypes.LOAD_USERS_SUCCESS;
  constructor(readonly payload: User[]) {}
}

export class LoadUsersFail implements Action {
  public readonly type = UserActionTypes.LOAD_USERS_FAIL;
  constructor(public error: string) {}
}

export class GrantRoleUser implements Action {
  public readonly type = UserActionTypes.GRANT_USER_ROLE;
  constructor(public userId: string, public roleId: string) {}
}

export class GrantRoleUserSuccess implements Action {
  public readonly type = UserActionTypes.GRANT_USER_ROLE_SUCCESS;
  constructor(public payload: User) {}
}

export class GrantRoleUserFail implements Action {
  public readonly type = UserActionTypes.GRANT_USER_ROLE_FAIL;
  constructor(public error: string) {}
}

export class RevokeRoleUser implements Action {
  public readonly type = UserActionTypes.REVOKE_USER_ROLE;
  constructor(public userId: string, public roleId: string) {}
}

export class RevokeRoleUserSuccess implements Action {
  public readonly type = UserActionTypes.REVOKE_USER_ROLE_SUCCESS;
  constructor(public payload: User) {}
}

export class RevokeRoleUserFail implements Action {
  public readonly type = UserActionTypes.REVOKE_USER_ROLE_FAIL;
  constructor(public error: string) {}
}

export class AddGroupToUser implements Action {
  public readonly type = UserActionTypes.ADD_GROUP_TO_USER;
  constructor(public userId: string, public groupName: string) {}
}

export class AddGroupToUserSuccess implements Action {
  public readonly type = UserActionTypes.ADD_GROUP_TO_USER_SUCCESS;
  constructor(readonly payload: User) {}
}

export class AddGroupToUserFail implements Action {
  public readonly type = UserActionTypes.ADD_GROUP_TO_USER_FAIL;
  constructor(public error: string) {}
}

export class RemoveGroupToUser implements Action {
  public readonly type = UserActionTypes.REMOVE_GROUP_TO_USER;
  constructor(public userId: string, public groupName: string) {}
}

export class RemoveGroupToUserSuccess implements Action {
  public readonly type = UserActionTypes.REMOVE_GROUP_TO_USER_SUCCESS;
  constructor(readonly payload: User) {}
}

export class RemoveGroupToUserFail implements Action {
  public readonly type = UserActionTypes.REMOVE_GROUP_TO_USER_FAIL;
  constructor(public error: string) {}
}

export class DefaultUser implements Action {
  public readonly type = UserActionTypes.DEFAULT_USER;
}

export type UserActions =
  | LoadUsers
  | LoadUsersSuccess
  | LoadUsersFail
  | DefaultUser
  | GrantRoleUser
  | GrantRoleUserSuccess
  | GrantRoleUserFail
  | RevokeRoleUser
  | RevokeRoleUserSuccess
  | RevokeRoleUserFail
  | AddGroupToUser
  | AddGroupToUserSuccess
  | AddGroupToUserFail
  | RemoveGroupToUser
  | RemoveGroupToUserSuccess
  | RemoveGroupToUserFail;
