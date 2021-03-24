import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../services/users.service';
import * as actions from './user.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UsersService, private toastrService: ToastrService) {}

  @Effect()
  loadUsers$: Observable<Action> = this.actions$.pipe(
    ofType(actions.UserActionTypes.LOAD_USERS),
    mergeMap(() =>
      this.userService.loadUsers().pipe(
        map((users) => {
          return new actions.LoadUsersSuccess(users);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.LoadUsersFail(error));
        })
      )
    )
  );

  @Effect()
  grantUserRole$: Observable<Action> = this.actions$.pipe(
    ofType(actions.UserActionTypes.GRANT_USER_ROLE),
    map((action: actions.GrantRoleUser) => action),
    mergeMap((action) =>
      this.userService.grantRole(action.userId, action.roleId).pipe(
        map((response) => {
          this.toastrService.success('Grant User Role Success');
          return new actions.GrantRoleUserSuccess(response);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.GrantRoleUserFail(error));
        })
      )
    )
  );

  @Effect()
  revokeUserRole$: Observable<Action> = this.actions$.pipe(
    ofType(actions.UserActionTypes.REVOKE_USER_ROLE),
    map((action: actions.RevokeRoleUser) => action),
    mergeMap((action) =>
      this.userService.revokeRole(action.userId, action.roleId).pipe(
        map((response) => {
          this.toastrService.success('Revoke User Role Success');
          return new actions.RevokeRoleUserSuccess(response);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.RevokeRoleUserFail(error));
        })
      )
    )
  );

  @Effect()
  addGroupToUser$: Observable<Action> = this.actions$.pipe(
    ofType(actions.UserActionTypes.ADD_GROUP_TO_USER),
    map((action: actions.AddGroupToUser) => action),
    mergeMap((action) =>
      this.userService.addGroupToUser(action.userId, action.groupName).pipe(
        map((response) => {
          this.toastrService.success('Add group to a user success');
          return new actions.AddGroupToUserSuccess(response);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.AddGroupToUserFail(error));
        })
      )
    )
  );

  @Effect()
  removeGroupToUser$: Observable<Action> = this.actions$.pipe(
    ofType(actions.UserActionTypes.REMOVE_GROUP_TO_USER),
    map((action: actions.RemoveGroupToUser) => action),
    mergeMap((action) =>
      this.userService.removeGroupToUser(action.userId, action.groupName).pipe(
        map((response) => {
          this.toastrService.success('Remove group to a user success');
          return new actions.RemoveGroupToUserSuccess(response);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.RemoveGroupToUserFail(error));
        })
      )
    )
  );
}
