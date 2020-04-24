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

  @Effect()
  loadTimeEntriesRunning$: Observable<Action> = this.actions$.pipe(
    ofType(actions.EntryActionTypes.LOAD_TIME_ENTRIES_RUNNING),
    mergeMap(() =>
      this.entryService.getTimeEntriesRunning().pipe(
        map((entryRunning) => {
          return new actions.LoadTimeEntriesRunningSuccess(entryRunning);
        }),
        catchError((error) => of(new actions.LoadTimeEntriesRunningFail(error.error.message)))
      )
    )
  );

  @Effect()
  stopTimeEntriesRunning$: Observable<Action> = this.actions$.pipe(
    ofType(actions.EntryActionTypes.STOP_TIME_ENTRIES_RUNNING),
    map((action: actions.StopTimeEntriesRunning) => action.payload),
    mergeMap((entryId) =>
      this.entryService.stopEntryRunning(entryId).pipe(
        map(() => {
          return new actions.StopTimeEntriesRunningSuccess(entryId);
        }),
        catchError((error) => of(new actions.StopTimeEntriesRunningFail(error.error.message)))
      )
    )
  );
}
