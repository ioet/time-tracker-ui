import { Action } from '@ngrx/store';
import { Technology } from '../models/technology.model';

export enum TechnologyActionTypes {
  LOAD_TECHNOLOGY = '[Technology] LOAD_TECHNOLOGY',
  LOAD_TECHNOLOGY_SUCCESS = '[Technology] LOAD_TECHNOLOGY_SUCCESS',
  LOAD_TECHNOLOGY_FAIL = '[Technology] LOAD_TECHNOLOGY_FAIL',
}

export class LoadTechnology implements Action {
  public readonly type = TechnologyActionTypes.LOAD_TECHNOLOGY;

  constructor(readonly payload: string) {}
}

export class LoadTechnologySuccess implements Action {
  readonly type = TechnologyActionTypes.LOAD_TECHNOLOGY_SUCCESS;

  constructor(readonly payload: Technology) {}
}

export class LoadTechnologyFail implements Action {
  public readonly type = TechnologyActionTypes.LOAD_TECHNOLOGY_FAIL;

  constructor(public error: string) {}
}

export type TechnologyActions = LoadTechnology | LoadTechnologySuccess | LoadTechnologyFail;
