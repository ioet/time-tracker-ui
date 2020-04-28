import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as actions from './project-type.actions';
import { ProjectType } from '../../../../shared/models';
import { ProjectTypeService } from '../services/project-type.service';

@Injectable()
export class ProjectTypeEffects {
  constructor(private actions$: Actions, private projectTypeService: ProjectTypeService) {}

  @Effect()
  getProjectTypes$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ProjectTypeActionTypes.LOAD_PROJECT_TYPES),
    mergeMap((customerId) =>
      this.projectTypeService.getProjectTypes(customerId).pipe(
        map((projectTypes: ProjectType[]) => {
          return new actions.LoadProjectTypesSuccess(projectTypes);
        }),
        catchError((error) => of(new actions.LoadProjectTypesFail(error)))
      )
    )
  );

  @Effect()
  createProjectType$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ProjectTypeActionTypes.CREATE_PROJECT_TYPE),
    map((action: actions.CreateProjectType) => action.payload),
    mergeMap((projectType) =>
      this.projectTypeService.createProjectType(projectType).pipe(
        map((projectTypeData) => {
          return new actions.CreateProjectTypeSuccess(projectTypeData);
        }),
        catchError((error) => of(new actions.CreateProjectTypeFail(error)))
      )
    )
  );

  @Effect()
  deleteProjectType$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ProjectTypeActionTypes.DELETE_PROJECT_TYPE),
    map((action: actions.DeleteProjectType) => action.projectTypeId),
    mergeMap((protectTypeId) =>
      this.projectTypeService.deleteProjectType(protectTypeId).pipe(
        map(() => {
          return new actions.DeleteProjectTypeSuccess(protectTypeId);
        }),
        catchError((error) => of(new actions.DeleteProjectTypeFail(error)))
      )
    )
  );

  @Effect()
  updateProjectType$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ProjectTypeActionTypes.UPDATE_PROJECT_TYPE),
    map((action: actions.UpdateProjectType) => action.payload),
    mergeMap((projectType) =>
      this.projectTypeService.updateProjectType(projectType).pipe(
        map((projectTypeData) => {
          return new actions.UpdateProjectTypeSuccess(projectTypeData);
        }),
        catchError((error) => of(new actions.UpdateProjectTypeFail(error)))
      )
    )
  );
}
