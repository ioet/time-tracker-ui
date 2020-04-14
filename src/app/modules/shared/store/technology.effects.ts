import { Injectable } from '@angular/core';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TechnologyService } from '../services/technology.service';
import * as actions from './technology.actions';

@Injectable()
export class TechnologyEffects {
  constructor(private actions$: Actions, private technologyService: TechnologyService) {}

  @Effect()
  loadTechnology$: Observable<Action> = this.actions$.pipe(
    ofType(actions.TechnologyActionTypes.LOAD_TECHNOLOGY),
    map((action: actions.LoadTechnology) => action.payload),
    mergeMap((value) =>
      this.technologyService.getTechnologies(value).pipe(
        map((technology) => {
          return new actions.LoadTechnologySuccess(technology);
        }),
        catchError((error) => of(new actions.LoadTechnologyFail(error)))
      )
    )
  );
}
