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
  loadActiveEntry$: Observable<Action> = this.actions$.pipe(
    ofType(actions.EntryActionTypes.LOAD_ACTIVE_ENTRY),
    mergeMap(() =>
      this.entryService.loadActiveEntry().pipe(
        map((activeEntry) => {
          return new actions.LoadActiveEntrySuccess(activeEntry);
        }),
        catchError((error) => of(new actions.LoadActiveEntryFail(error)))
      )
    )
  );

  @Effect()
  loadEntries$: Observable<Action> = this.actions$.pipe(
    ofType(actions.EntryActionTypes.LOAD_ENTRIES),
    mergeMap(() =>
      this.entryService.loadEntries().pipe(
        map((entries) => new actions.LoadEntriesSuccess(entries)),
        catchError((error) => of(new actions.LoadEntriesFail(error)))
      )
    )
  );

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
  deleteEntry$: Observable<Action> = this.actions$.pipe(
    ofType(actions.EntryActionTypes.DELETE_ENTRY),
    map((action: actions.DeleteEntry) => action.entryId),
    mergeMap((entryId) =>
      this.entryService.deleteEntry(entryId).pipe(
        map(() => new actions.DeleteEntrySuccess(entryId)),
        catchError((error) => of(new actions.DeleteEntryFail(error)))
      )
    )
  );

  @Effect()
  updateActiveEntry$: Observable<Action> = this.actions$.pipe(
    ofType(actions.EntryActionTypes.UPDATE_ACTIVE_ENTRY),
    map((action: actions.UpdateActiveEntry) => action.payload),
    mergeMap((project) =>
      this.entryService.updateActiveEntry(project).pipe(
        map((projectData) => {
          return new actions.UpdateActiveEntrySuccess(projectData);
        }),
        catchError((error) => of(new actions.UpdateActiveEntryFail(error)))
      )
    )
  );

  @Effect()
  stopTimeEntryRunning$: Observable<Action> = this.actions$.pipe(
    ofType(actions.EntryActionTypes.STOP_TIME_ENTRY_RUNNING),
    map((action: actions.StopTimeEntryRunning) => action.payload),
    mergeMap((timeEntryId) =>
      this.entryService.stopEntryRunning(timeEntryId).pipe(
        map(() => {
          return new actions.StopTimeEntryRunningSuccess(timeEntryId);
        }),
        catchError((error) => of(new actions.StopTimeEntryRunningFail(error.error.message)))
      )
    )
  );
}
