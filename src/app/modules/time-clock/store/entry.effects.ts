import { Injectable } from '@angular/core';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { EntryService } from '../services/entry.service';
import * as actions from './entry.actions';

@Injectable()
export class EntryEffects {
  constructor(private actions$: Actions, private entryService: EntryService) {}

  @Effect()
  createEntry$: Observable<Action> = this.actions$.pipe(
    ofType(actions.EntryActionTypes.CREATE_ENTRY),
    map((action: actions.CreateEntry) => action.payload),
    mergeMap((entry) =>
      this.entryService.createEntry(entry).pipe(
        map((entryData) => {
          return new actions.CreateEntrySuccess(entryData);
        }),
        catchError((error) => of(new actions.CreateEntryFail(error.error.message)))
      )
    )
  );
}
