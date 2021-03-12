import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import * as actions from './user.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {
  }

  @Effect()
  loadUser$: Observable<Action> = this.actions$.pipe(
    ofType(actions.UserActionTypes.LOAD_USER),
    map((action: actions.LoadUser) => action.userId),
    mergeMap((userId) =>
      this.userService.loadUser(userId).pipe(
        map((response) => {
          return new actions.LoadUserSuccess(response);
        }),
        catchError((error) => {
          return of(new actions.LoadUserFail(error));
        })
      )
    )
  );

}
