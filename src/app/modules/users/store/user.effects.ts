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
  addUserToGroup$: Observable<Action> = this.actions$.pipe(
    ofType(actions.UserActionTypes.ADD_USER_TO_GROUP),
    map((action: actions.AddUserToGroup) => action),
    mergeMap((action) =>
      this.userService.addUserToGroup(action.userId, action.groupName).pipe(
        map((response) => {
          this.toastrService.success('Add user to group success');
          return new actions.AddUserToGroupSuccess(response);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.AddUserToGroupFail(error));
        })
      )
    )
  );

  @Effect()
  removeUserFromGroup$: Observable<Action> = this.actions$.pipe(
    ofType(actions.UserActionTypes.REMOVE_USER_FROM_GROUP),
    map((action: actions.RemoveUserFromGroup) => action),
    mergeMap((action) =>
      this.userService.removeUserFromGroup(action.userId, action.groupName).pipe(
        map((response) => {
          this.toastrService.success('Remove user from group success');
          return new actions.RemoveUserFromGroupSuccess(response);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.RemoveUserFromGroupFail(error));
        })
      )
    )
  );

  @Effect()
  grantUserRole$: Observable<Action> = this.actions$.pipe(
    ofType(actions.UserActionTypes.GRANT_USER_ROLE),
    map((action: actions.GrantUserRole) => action),
    mergeMap((action) =>
      this.userService.grantRole(action.userId, action.roleId).pipe(
        map((response) => {
          this.toastrService.success('User role successfully granted');
          return new actions.GrantUserRoleSuccess(response);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.GrantUserRoleFail(error));
        })
      )
    )
  );

  @Effect()
  revokeUserRole$: Observable<Action> = this.actions$.pipe(
    ofType(actions.UserActionTypes.REVOKE_USER_ROLE),
    map((action: actions.RevokeUserRole) => action),
    mergeMap((action) =>
      this.userService.revokeRole(action.userId, action.roleId).pipe(
        map((response) => {
          this.toastrService.success('User role successfully revoked');
          return new actions.RevokeUserRoleSuccess(response);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.RevokeUserRoleFail(error));
        })
      )
    )
  );
}
