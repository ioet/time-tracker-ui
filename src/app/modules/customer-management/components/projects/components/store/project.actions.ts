import { Action } from '@ngrx/store';
import { Project, Status } from '../../../../../shared/models';

export enum ProjectActionTypes {
  LOAD_PROJECTS = '[Projects] LOAD_PROJECTS',
  LOAD_PROJECTS_SUCCESS = '[Projects] LOAD_PROJECTS_SUCCESS',
  LOAD_PROJECTS_FAIL = '[Projects] LOAD_PROJECTS_FAIL',
  LOAD_CUSTOMER_PROJECTS = '[Projects] LOAD_CUSTOMER_PROJECTS',
  LOAD_CUSTOMER_PROJECTS_SUCCESS = '[Projects] LOAD_CUSTOMER_PROJECTS_SUCCESS',
  LOAD_CUSTOMER_PROJECTS_FAIL = '[Projects] LOAD_CUSTOMER_PROJECTS_FAIL',
  LOAD_RECENT_PROJECTS_SUCCESS = '[Projects] LOAD_RECENT_PROJECTS_SUCCESS',
  LOAD_RECENT_PROJECTS_FAIL = '[Projects] LOAD_RECENT_PROJECTS_FAIL',
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
  CLEAN_CUSTOMER_PROJECTS = '[Projects] CLEAN_CUSTOMER_PROJECTS',
  UNARCHIVE_PROJECT = '[Projects] UNARCHIVE_PROJECT',
  UNARCHIVE_PROJECT_SUCCESS = '[Projects] UNARCHIVE_PROJECT_SUCCESS',
  UNARCHIVE_PROJECT_FAIL = '[Projects] UNARCHIVE_PROJECT_FAIL',
}

export class CleanCustomerProjects implements Action {
  public readonly type = ProjectActionTypes.CLEAN_CUSTOMER_PROJECTS;
  constructor() {}
}

export class LoadProjects implements Action {
  public readonly type = ProjectActionTypes.LOAD_PROJECTS;
  constructor() {}
}

export class LoadProjectsSuccess implements Action {
  readonly type = ProjectActionTypes.LOAD_PROJECTS_SUCCESS;
  constructor(readonly payload: Project[]) {}
}

export class LoadProjectsFail implements Action {
  public readonly type = ProjectActionTypes.LOAD_PROJECTS_FAIL;
  constructor(public error: string) {}
}

export class LoadCustomerProjects implements Action {
  public readonly type = ProjectActionTypes.LOAD_CUSTOMER_PROJECTS;
  constructor(public customerId: string) {}
}

export class LoadCustomerProjectsSuccess implements Action {
  readonly type = ProjectActionTypes.LOAD_CUSTOMER_PROJECTS_SUCCESS;
  constructor(readonly payload: Project[]) {}
}

export class LoadCustomerProjectsFail implements Action {
  public readonly type = ProjectActionTypes.LOAD_CUSTOMER_PROJECTS_FAIL;
  constructor(public error: string) {}
}

export class LoadRecentProjectsSuccess implements Action {
  readonly type = ProjectActionTypes.LOAD_RECENT_PROJECTS_SUCCESS;
  constructor(readonly payload: Project[]) {}
}

export class LoadRecentProjectsFail implements Action {
  public readonly type = ProjectActionTypes.LOAD_RECENT_PROJECTS_FAIL;
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

export class UnarchiveProject implements Action {
  public readonly type = ProjectActionTypes.UNARCHIVE_PROJECT;

  constructor(public payload: string) {}
}

export class UnarchiveProjectSuccess implements Action {
  public readonly type = ProjectActionTypes.UNARCHIVE_PROJECT_SUCCESS;

  constructor(public payload: Status) {}
}

export class UnarchiveProjectFail implements Action {
  public readonly type = ProjectActionTypes.UNARCHIVE_PROJECT_FAIL;

  constructor(public error: string) {}
}

export type ProjectActions =
  | CleanCustomerProjects
  | LoadProjects
  | LoadProjectsSuccess
  | LoadProjectsFail
  | LoadCustomerProjects
  | LoadCustomerProjectsSuccess
  | LoadCustomerProjectsFail
  | LoadRecentProjectsSuccess
  | LoadRecentProjectsFail
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
  | DeleteProjectFail
  | UnarchiveProject
  | UnarchiveProjectSuccess
  | UnarchiveProjectFail;
