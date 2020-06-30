import { Injectable } from '@angular/core';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TechnologyService } from '../services/technology.service';
import * as actions from './technology.actions';

@Injectable()
export class TechnologyEffects {

  constructor(private actions$: Actions, private technologyService: TechnologyService) { }

  @Effect()
  findTechnology$: Observable<Action> = this.actions$.pipe(
    ofType(actions.TechnologyActionTypes.FIND_TECHNOLOGIES),
    map((action: actions.FindTechnology) => action.payload),
    mergeMap((value) =>
      this.technologyService.getTechnologies(value.toLowerCase()).pipe(
        map((technology) => {
          return new actions.FindTechnologySuccess(technology);
        }),
        catchError((error) => {
          return of(new actions.FindTechnologyFail(error));
        })
      )
    )
  );
}
