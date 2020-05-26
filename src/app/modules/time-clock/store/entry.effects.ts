import { INFO_SAVED_SUCCESSFULLY, INFO_DELETE_SUCCESSFULLY } from './../../shared/messages';
import { Injectable } from '@angular/core';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { EntryService } from '../services/entry.service';
import * as actions from './entry.actions';

@Injectable()
export class EntryEffects {
  constructor(private actions$: Actions, private entryService: EntryService, private toastrService: ToastrService) {}

  @Effect()
  loadEntriesSummary$: Observable<Action> = this.actions$.pipe(
    ofType(actions.EntryActionTypes.LOAD_ENTRIES_SUMMARY),
    mergeMap(() =>
      this.entryService.summary().pipe(
        map((response) => {
          return new actions.LoadEntriesSummarySuccess(response);
        }),
        catchError((error) => {
          this.toastrService.warning(`Your summary information could not be loaded`);
          return of(new actions.LoadEntriesSummaryFail());
        })
      )
    )
  );

  @Effect()
  loadActiveEntry$: Observable<Action> = this.actions$.pipe(
    ofType(actions.EntryActionTypes.LOAD_ACTIVE_ENTRY),
    mergeMap(() =>
      this.entryService.loadActiveEntry().pipe(
        map((activeEntry) => {
          return new actions.LoadActiveEntrySuccess(activeEntry);
        }),
        catchError((error) => {
          return of(new actions.LoadActiveEntryFail(error));
        })
      )
    )
  );

  @Effect()
  loadEntries$: Observable<Action> = this.actions$.pipe(
    ofType(actions.EntryActionTypes.LOAD_ENTRIES),
    map((action: actions.LoadEntries) => action.month),
    mergeMap((month) =>
      this.entryService.loadEntries(month).pipe(
        map((entries) => new actions.LoadEntriesSuccess(entries)),
        catchError((error) => {
          this.toastrService.warning(`The data could not be loaded`);
          return of(new actions.LoadEntriesFail(error));
        })
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
          if (entryData.end_date === null) {
            this.toastrService.success('You clocked-in successfully');
          } else {
            this.toastrService.success(INFO_SAVED_SUCCESSFULLY);
          }
          return new actions.CreateEntrySuccess(entryData);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.CreateEntryFail(error.error.message));
        })
      )
    )
  );

  @Effect()
  deleteEntry$: Observable<Action> = this.actions$.pipe(
    ofType(actions.EntryActionTypes.DELETE_ENTRY),
    map((action: actions.DeleteEntry) => action.entryId),
    mergeMap((entryId) =>
      this.entryService.deleteEntry(entryId).pipe(
        map(() => {
          this.toastrService.success(INFO_DELETE_SUCCESSFULLY);
          return new actions.DeleteEntrySuccess(entryId);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.DeleteEntryFail(error));
        })
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
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.UpdateActiveEntryFail(error));
        })
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
          this.toastrService.success('You clocked-out successfully');
          return new actions.StopTimeEntryRunningSuccess(timeEntryId);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.StopTimeEntryRunningFail(error.error.message));
        })
      )
    )
  );
}
