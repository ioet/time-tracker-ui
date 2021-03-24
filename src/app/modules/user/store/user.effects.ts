import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import * as actions from './user.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  @Effect()
  loadUserInfo$: Observable<Action> = this.actions$.pipe(
    ofType(actions.UserActionTypes.LOAD_USER),
    map((action: actions.LoadUser) => action.userId),
    mergeMap((userId: string) =>
      this.userService.loadUser(userId).pipe(
        map((response) => new actions.LoadUserSuccess(response)),
        catchError((error) => of(new actions.LoadUserFail(error)))
      )
    )
  );
}
