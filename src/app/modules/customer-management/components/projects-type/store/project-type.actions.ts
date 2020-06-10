import { Action } from '@ngrx/store';

import { ProjectType } from '../../../../shared/models';

export enum ProjectTypeActionTypes {
  LOAD_PROJECT_TYPES = '[ProjectType] LOAD_PROJECT_TYPES',
  LOAD_PROJECT_TYPES_SUCCESS = '[ProjectType] LOAD_PROJECT_TYPES_SUCCESS',
  LOAD_PROJECT_TYPES_FAIL = '[ProjectType] LOAD_PROJECT_TYPES_FAIL',
  CREATE_PROJECT_TYPE = '[ProjectType] CREATE_PROJECT_TYPE',
  CREATE_PROJECT_TYPE_SUCCESS = '[ProjectType] CREATE_PROJECT_TYPE_SUCCESS',
  CREATE_PROJECT_TYPE_FAIL = '[ProjectType] CREATE_PROJECT_TYPE_FAIL',
  DELETE_PROJECT_TYPE = '[ProjectType] DELETE_PROJECT_TYPE',
  DELETE_PROJECT_TYPE_SUCCESS = '[ProjectType] DELETE_PROJECT_TYPE_SUCESS',
  DELETE_PROJECT_TYPE_FAIL = '[ProjectType] DELETE_PROJECT_TYPE_FAIL',
  UPDATE_PROJECT_TYPE = '[ProjectType] UPDATE_PROJECT_TYPE',
  UPDATE_PROJECT_TYPE_SUCCESS = '[ProjectType] UPDATE_PROJECT_TYPE_SUCCESS',
  UPDATE_PROJECT_TYPE_FAIL = '[ProjectType] UPDATE_PROJECT_TYPE_FAIL',
  SET_PROJECT_TYPE_ID_TO_EDIT = '[ProjectType] SET_PROJECT_TYPE_ID_TO_EDIT',
  RESET_PROJECT_TYPE_ID_TO_EDIT = '[ProjectType] RESET_PROJECT_TYPE_ID_TO_EDIT',
  DEFAULT_PROJECT_TYPE = '[ProjectType] DEFAULT_PROJECT_TYPE',
  CLEAN_PROJECT_TYPES = '[ProjectType] CLEAN_PROJECT_TYPES',
}

export class CleanProjectTypes implements Action {
  public readonly type = ProjectTypeActionTypes.CLEAN_PROJECT_TYPES;
  constructor() {}
}

export class LoadProjectTypes implements Action {
  public readonly type = ProjectTypeActionTypes.LOAD_PROJECT_TYPES;
  constructor(public customerId?: string) {}
}

export class LoadProjectTypesSuccess implements Action {
  public readonly type = ProjectTypeActionTypes.LOAD_PROJECT_TYPES_SUCCESS;

  constructor(public payload: ProjectType[]) {}
}

export class LoadProjectTypesFail implements Action {
  public readonly type = ProjectTypeActionTypes.LOAD_PROJECT_TYPES_FAIL;

  constructor(public error: string) {}
}

export class CreateProjectType implements Action {
  public readonly type = ProjectTypeActionTypes.CREATE_PROJECT_TYPE;

  constructor(public payload: ProjectType) {}
}

export class CreateProjectTypeSuccess implements Action {
  public readonly type = ProjectTypeActionTypes.CREATE_PROJECT_TYPE_SUCCESS;

  constructor(public payload: ProjectType) {}
}

export class CreateProjectTypeFail implements Action {
  public readonly type = ProjectTypeActionTypes.CREATE_PROJECT_TYPE_FAIL;

  constructor(public error: string) {}
}

export class DeleteProjectType implements Action {
  public readonly type = ProjectTypeActionTypes.DELETE_PROJECT_TYPE;

  constructor(public projectTypeId: string) {}
}

export class DeleteProjectTypeSuccess implements Action {
  public readonly type = ProjectTypeActionTypes.DELETE_PROJECT_TYPE_SUCCESS;

  constructor(public projectTypeId: string) {}
}

export class DeleteProjectTypeFail implements Action {
  public readonly type = ProjectTypeActionTypes.DELETE_PROJECT_TYPE_FAIL;

  constructor(public error: string) {}
}
export class UpdateProjectType implements Action {
  public readonly type = ProjectTypeActionTypes.UPDATE_PROJECT_TYPE;

  constructor(public payload: ProjectType) {}
}

export class UpdateProjectTypeSuccess implements Action {
  public readonly type = ProjectTypeActionTypes.UPDATE_PROJECT_TYPE_SUCCESS;

  constructor(public payload: ProjectType) {}
}

export class UpdateProjectTypeFail implements Action {
  public readonly type = ProjectTypeActionTypes.UPDATE_PROJECT_TYPE_FAIL;

  constructor(public error: string) {}
}

export class SetProjectTypeToEdit implements Action {
  public readonly type = ProjectTypeActionTypes.SET_PROJECT_TYPE_ID_TO_EDIT;

  constructor(public payload: string) {}
}

export class ResetProjectTypeToEdit implements Action {
  public readonly type = ProjectTypeActionTypes.RESET_PROJECT_TYPE_ID_TO_EDIT;
}

export class DefaultProjectTypes implements Action {
  public readonly type = ProjectTypeActionTypes.DEFAULT_PROJECT_TYPE;
}

export type ProjectTypeActions =
  | CleanProjectTypes
  | LoadProjectTypes
  | LoadProjectTypesSuccess
  | LoadProjectTypesFail
  | CreateProjectType
  | CreateProjectTypeSuccess
  | CreateProjectTypeFail
  | DeleteProjectType
  | DeleteProjectTypeSuccess
  | DeleteProjectTypeFail
  | UpdateProjectType
  | UpdateProjectTypeSuccess
  | UpdateProjectTypeFail
  | SetProjectTypeToEdit
  | ResetProjectTypeToEdit
  | DefaultProjectTypes;
