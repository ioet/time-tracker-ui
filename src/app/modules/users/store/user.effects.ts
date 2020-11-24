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
}
