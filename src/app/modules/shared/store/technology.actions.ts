import { Action } from '@ngrx/store';
import { Technology } from '../models/technology.model';

export enum TechnologyActionTypes {
  FIND_TECHNOLOGIES = '[Technology] FIND_TECHNOLOGIES',
  FIND_TECHNOLOGIES_SUCESS = '[Technology] FIND_TECHNOLOGIES_SUCESS',
  FIND_TECHNOLOGIES_FAIL = '[Technology] FIND_TECHNOLOGIES_FAIL ',
}

export class FindTechnology implements Action {
  public readonly type = TechnologyActionTypes.FIND_TECHNOLOGIES;

  constructor(readonly payload: string) {}
}

export class FindTechnologySuccess implements Action {
  readonly type = TechnologyActionTypes.FIND_TECHNOLOGIES_SUCESS;

  constructor(readonly payload: Technology) {}
}

export class FindTechnologyFail implements Action {
  public readonly type = TechnologyActionTypes.FIND_TECHNOLOGIES_FAIL;

  constructor(public error: string) {}
}

export type TechnologyActions = FindTechnology | FindTechnologySuccess | FindTechnologyFail;
