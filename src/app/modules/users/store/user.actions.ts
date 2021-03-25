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
  ADD_USER_TO_GROUP = '[User] ADD_USER_TO_GROUP',
  ADD_USER_TO_GROUP_SUCCESS = '[User] ADD_USER_TO_GROUP_SUCCESS',
  ADD_USER_TO_GROUP_FAIL = '[User] ADD_USER_TO_GROUP_FAIL',
  REMOVE_USER_FROM_GROUP = '[User] REMOVE_USER_FROM_GROUP',
  REMOVE_USER_FROM_GROUP_SUCCESS = '[User] REMOVE_USER_FROM_GROUP_SUCCESS',
  REMOVE_USER_FROM_GROUP_FAIL = '[User] REMOVE_USER_FROM_GROUP_FAIL',
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

export class AddUserToGroup implements Action {
  public readonly type = UserActionTypes.ADD_USER_TO_GROUP;
  constructor(public userId: string, public groupName: string) {}
}

export class AddUserToGroupSuccess implements Action {
  public readonly type = UserActionTypes.ADD_USER_TO_GROUP_SUCCESS;
  constructor(readonly payload: User) {}
}

export class AddUserToGroupFail implements Action {
  public readonly type = UserActionTypes.ADD_USER_TO_GROUP_FAIL;
  constructor(public error: string) {}
}

export class RemoveUserFromGroup implements Action {
  public readonly type = UserActionTypes.REMOVE_USER_FROM_GROUP;
  constructor(public userId: string, public groupName: string) {}
}

export class RemoveUserFromGroupSuccess implements Action {
  public readonly type = UserActionTypes.REMOVE_USER_FROM_GROUP_SUCCESS;
  constructor(readonly payload: User) {}
}

export class RemoveUserFromGroupFail implements Action {
  public readonly type = UserActionTypes.REMOVE_USER_FROM_GROUP_FAIL;
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
  | AddUserToGroup
  | AddUserToGroupSuccess
  | AddUserToGroupFail
  | RemoveUserFromGroup
  | RemoveUserFromGroupSuccess
  | RemoveUserFromGroupFail;
