import { INFO_SAVED_SUCCESSFULLY, INFO_DELETE_SUCCESSFULLY } from '../../../../shared/messages';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as actions from './project-type.actions';
import { ProjectType } from '../../../../shared/models';
import { ProjectTypeService } from '../services/project-type.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ProjectTypeEffects {
  constructor(
    private actions$: Actions,
    private projectTypeService: ProjectTypeService,
    private toastrService: ToastrService
  ) { }

  @Effect()
  getProjectTypes$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ProjectTypeActionTypes.LOAD_PROJECT_TYPES),
    mergeMap((customerId) =>
      this.projectTypeService.getProjectTypes(customerId).pipe(
        map((projectTypes: ProjectType[]) => {
          return new actions.LoadProjectTypesSuccess(projectTypes);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.LoadProjectTypesFail(error));
        })
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
          this.toastrService.success(INFO_SAVED_SUCCESSFULLY);
          return new actions.CreateProjectTypeSuccess(projectTypeData);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.CreateProjectTypeFail(error));
        })
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
          this.toastrService.success(INFO_DELETE_SUCCESSFULLY);
          return new actions.DeleteProjectTypeSuccess(protectTypeId);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.DeleteProjectTypeFail(error));
        })
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
          this.toastrService.success(INFO_SAVED_SUCCESSFULLY);
          return new actions.UpdateProjectTypeSuccess(projectTypeData);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.UpdateProjectTypeFail(error));
        })
      )
    )
  );
}
