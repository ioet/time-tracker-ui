import { Action } from '@ngrx/store';
import { Project } from '../../shared/models';

export enum ProjectActionTypes {
  GET_PROJECTS = '[Projects] GET_PROJECTS',
  GET_PROJECTS_SUCCESS = '[Projects] GET_PROJECTS_SUCCESS',
  GET_PROJECTS_FAIL = '[Projects] GET_PROJECTS_FAIL',
  POST_PROJECT = '[Projects] POST_PROJECT',
  POST_PROJECT_SUCCESS = '[Projects] POST_PROJECT_SUCCESS',
  POST_PROJECT_FAIL = '[Projects] POST_PROJECT_FAIL',
  PUT_PROJECT = '[Projects] PUT_PROJECT',
  PUT_PROJECT_SUCCESS = '[Projects] PUT_PROJECT_SUCCESS',
  PUT_PROJECT_FAIL = '[Projects] PUT_PROJECT_FAIL',
}

export class GetProjectsLoad implements Action {
  public readonly type = ProjectActionTypes.GET_PROJECTS;
}

export class GetProjectsSuccess implements Action {
  readonly type = ProjectActionTypes.GET_PROJECTS_SUCCESS;
  constructor(readonly payload: Project[]) {}
}

export class GetProjectsFail implements Action {
  public readonly type = ProjectActionTypes.GET_PROJECTS_FAIL;

  constructor(public error: string) {}
}

export class PostProject implements Action {
  public readonly type = ProjectActionTypes.POST_PROJECT;

  constructor(public payload: Project) {}
}

export class PostProjectSuccess implements Action {
  public readonly type = ProjectActionTypes.POST_PROJECT_SUCCESS;

  constructor(public payload: Project) {}
}

export class PostProjectFail implements Action {
  public readonly type = ProjectActionTypes.POST_PROJECT_FAIL;

  constructor(public error: string) {}
}

export class PutProject implements Action {
  public readonly type = ProjectActionTypes.PUT_PROJECT;

  constructor(public payload: Project) {}
}

export class PutProjectSuccess implements Action {
  public readonly type = ProjectActionTypes.PUT_PROJECT_SUCCESS;

  constructor(public payload: Project) {}
}

export class PutProjectFail implements Action {
  public readonly type = ProjectActionTypes.PUT_PROJECT_FAIL;

  constructor(public error: string) {}
}

export type ProjectActions =
  | GetProjectsLoad
  | GetProjectsSuccess
  | GetProjectsFail
  | PostProject
  | PostProjectSuccess
  | PostProjectFail
  | PutProject
  | PutProjectSuccess
  | PutProjectFail;
