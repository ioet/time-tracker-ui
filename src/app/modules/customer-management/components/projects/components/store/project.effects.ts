import { INFO_SAVED_SUCCESSFULLY, INFO_DELETE_SUCCESSFULLY } from '../../../../../shared/messages';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { ProjectService } from '../services/project.service';
import * as actions from './project.actions';
import { ToastrService } from 'ngx-toastr';
import { Status } from 'src/app/modules/shared/models';

@Injectable()
export class ProjectEffects {
  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private toastrService: ToastrService
  ) { }

  @Effect()
  loadProjects$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ProjectActionTypes.LOAD_PROJECTS),
    mergeMap(() =>
      this.projectService.getAllProjects().pipe(
        map((projects) => {
          return new actions.LoadProjectsSuccess(projects);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.LoadProjectsFail(error));
        })
      )
    )
  );

  @Effect()
  loadCustomerProjects$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ProjectActionTypes.LOAD_CUSTOMER_PROJECTS),
    mergeMap((customerId) =>
      this.projectService.getProjects(customerId).pipe(
        map((project) => {
          return new actions.LoadCustomerProjectsSuccess(project);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.LoadCustomerProjectsFail(error));
        })
      )
    )
  );

  @Effect()
  loadRecentProjects$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ProjectActionTypes.LOAD_PROJECTS),
    mergeMap(() =>
      this.projectService.getRecentProjects().pipe(
        map((projects) => {
          return new actions.LoadRecentProjectsSuccess(projects);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.LoadRecentProjectsFail(error));
        })
      )
    )
  );

  @Effect()
  createProject$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ProjectActionTypes.CREATE_PROJECT),
    map((action: actions.CreateProject) => action.payload),
    mergeMap((project) =>
      this.projectService.createProject(project).pipe(
        map((projectData) => {
          this.toastrService.success(INFO_SAVED_SUCCESSFULLY);
          return new actions.CreateProjectSuccess(projectData);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.CreateProjectFail(error));
        })
      )
    )
  );

  @Effect()
  updateProject$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ProjectActionTypes.UPDATE_PROJECT),
    map((action: actions.UpdateProject) => action.payload),
    mergeMap((project) =>
      this.projectService.updateProject(project).pipe(
        map((projectData) => {
          this.toastrService.success(INFO_SAVED_SUCCESSFULLY);
          return new actions.UpdateProjectSuccess(projectData);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.UpdateProjectFail(error));
        })
      )
    )
  );

  @Effect()
  deleteProject$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ProjectActionTypes.DELETE_PROJECT),
    map((action: actions.DeleteProject) => action.projectId),
    mergeMap((projectId) =>
      this.projectService.deleteProject(projectId).pipe(
        map(() => {
          this.toastrService.success(INFO_DELETE_SUCCESSFULLY);
          return new actions.DeleteProjectSuccess(projectId);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.DeleteProjectFail(error));
        })
      )
    )
  );

  @Effect()
  unarchiveProject$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ProjectActionTypes.UNARCHIVE_PROJECT),
    map((action: actions.UnarchiveProject) => ({
      id: action.payload,
      status: 'active',
    })),
    mergeMap((project: Status) =>
      this.projectService.updateProject(project).pipe(
        map((projectData) => {
          this.toastrService.success(INFO_SAVED_SUCCESSFULLY);
          return new actions.UnarchiveProjectSuccess(projectData);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.UnarchiveProjectFail(error));
        })
      )
    )
  );
}
