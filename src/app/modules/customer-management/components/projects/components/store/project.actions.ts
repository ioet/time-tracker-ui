import { Action } from '@ngrx/store';
import { Project } from '../../../../../shared/models';

export enum ProjectActionTypes {
  LOAD_PROJECTS = '[Projects] LOAD_PROJECTS',
  LOAD_PROJECTS_SUCCESS = '[Projects] LOAD_PROJECTS_SUCCESS',
  LOAD_PROJECTS_FAIL = '[Projects] LOAD_PROJECTS_FAIL',
  CREATE_PROJECT = '[Projects] CREATE_PROJECT',
  CREATE_PROJECT_SUCCESS = '[Projects] CREATE_PROJECT_SUCCESS',
  CREATE_PROJECT_FAIL = '[Projects] CREATE_PROJECT_FAIL',
  UPDATE_PROJECT = '[Projects] UPDATE_PROJECT',
  UPDATE_PROJECT_SUCCESS = '[Projects] UPDATE_PROJECT_SUCCESS',
  UPDATE_PROJECT_FAIL = '[Projects] UPDATE_PROJECT_FAIL',
  SET_PROJECT_TO_EDIT = '[Projects] SET_PROJECT_TO_EDIT',
  RESET_PROJECT_TO_EDIT = '[Projects] RESET_PROJECT_TO_EDIT',
  DELETE_PROJECT = '[Projects] DELETE_PROJECT',
  DELETE_PROJECT_SUCCESS = '[Projects] DELETE_PROJECT_SUCESS',
  DELETE_PROJECT_FAIL = '[Projects] DELETE_PROJECT_FAIL',
}

export class LoadProjects implements Action {
  public readonly type = ProjectActionTypes.LOAD_PROJECTS;
  constructor(public customerId?: string) {}
}

export class LoadProjectsSuccess implements Action {
  readonly type = ProjectActionTypes.LOAD_PROJECTS_SUCCESS;
  constructor(readonly payload: Project[]) {}
}

export class LoadProjectsFail implements Action {
  public readonly type = ProjectActionTypes.LOAD_PROJECTS_FAIL;

  constructor(public error: string) {}
}

export class CreateProject implements Action {
  public readonly type = ProjectActionTypes.CREATE_PROJECT;

  constructor(public payload: Project) {}
}

export class CreateProjectSuccess implements Action {
  public readonly type = ProjectActionTypes.CREATE_PROJECT_SUCCESS;

  constructor(public payload: Project) {}
}

export class CreateProjectFail implements Action {
  public readonly type = ProjectActionTypes.CREATE_PROJECT_FAIL;

  constructor(public error: string) {}
}

export class UpdateProject implements Action {
  public readonly type = ProjectActionTypes.UPDATE_PROJECT;

  constructor(public payload: Project) {}
}

export class UpdateProjectSuccess implements Action {
  public readonly type = ProjectActionTypes.UPDATE_PROJECT_SUCCESS;

  constructor(public payload: Project) {}
}

export class UpdateProjectFail implements Action {
  public readonly type = ProjectActionTypes.UPDATE_PROJECT_FAIL;

  constructor(public error: string) {}
}

export class SetProjectToEdit implements Action {
  public readonly type = ProjectActionTypes.SET_PROJECT_TO_EDIT;

  constructor(public payload: Project) {}
}

export class ResetProjectToEdit implements Action {
  public readonly type = ProjectActionTypes.RESET_PROJECT_TO_EDIT;
}

export class DeleteProject implements Action {
  public readonly type = ProjectActionTypes.DELETE_PROJECT;

  constructor(public projectId: string) {}
}

export class DeleteProjectSuccess implements Action {
  public readonly type = ProjectActionTypes.DELETE_PROJECT_SUCCESS;

  constructor(public projectId: string) {}
}

export class DeleteProjectFail implements Action {
  public readonly type = ProjectActionTypes.DELETE_PROJECT_FAIL;

  constructor(public error: string) {}
}

export type ProjectActions =
  | LoadProjects
  | LoadProjectsSuccess
  | LoadProjectsFail
  | CreateProject
  | CreateProjectSuccess
  | CreateProjectFail
  | UpdateProject
  | UpdateProjectSuccess
  | UpdateProjectFail
  | SetProjectToEdit
  | ResetProjectToEdit
  | DeleteProject
  | DeleteProjectSuccess
  | DeleteProjectFail;
