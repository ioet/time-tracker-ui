import { Action } from '@ngrx/store';
import { User } from '../models/users';

export enum UserActionTypes {
  LOAD_USERS = '[User] LOAD_USERS',
  LOAD_USERS_SUCCESS = '[User] LOAD_USERS_SUCCESS',
  LOAD_USERS_FAIL = '[User] LOAD_USERS_FAIL',
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

export class DefaultUser implements Action {
  public readonly type = UserActionTypes.DEFAULT_USER;
}

export type UserActions = LoadUsers | LoadUsersSuccess | LoadUsersFail | DefaultUser;
