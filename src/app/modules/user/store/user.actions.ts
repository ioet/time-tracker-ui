import { Action } from '@ngrx/store';
import { User } from '../models/user';

export enum UserActionTypes {
  LOAD_USER = '[User] LOAD_USER',
  LOAD_USER_SUCCESS = '[User] LOAD_USER_SUCCESS',
  LOAD_USER_FAIL = '[User] LOAD_USER_FAIL',
  DEFAULT_USER = '[User] DEFAULT_USER',
}

export class LoadUser implements Action {
  public readonly type = UserActionTypes.LOAD_USER;
  constructor(readonly userId: string) {}
}

export class LoadUserSuccess implements Action {
  public readonly type = UserActionTypes.LOAD_USER_SUCCESS;

  constructor(readonly payload: User) {}
}

export class LoadUserFail implements Action {
  public readonly type = UserActionTypes.LOAD_USER_FAIL;

  constructor(public error: string) {}
}

export class DefaultUser implements Action {
  public readonly type = UserActionTypes.DEFAULT_USER;
}

export type UserActions = LoadUser | LoadUserSuccess | LoadUserFail | DefaultUser;
