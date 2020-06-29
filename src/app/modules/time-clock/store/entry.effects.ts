import { INFO_DELETE_SUCCESSFULLY, INFO_SAVED_SUCCESSFULLY } from './../../shared/messages';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { EntryService } from '../services/entry.service';
import * as actions from './entry.actions';

@Injectable()
export class EntryEffects {
  constructor(private actions$: Actions, private entryService: EntryService, private toastrService: ToastrService) {
  }

  @Effect()
  switchEntryRunning$: Observable<Action> = this.actions$.pipe(
    ofType(actions.EntryActionTypes.SWITCH_TIME_ENTRY),
    switchMap((action: actions.SwitchTimeEntry) =>
      this.entryService.stopEntryRunning(action.idEntrySwitching).pipe(
        map((response) => {
          const stopDateForEntry = new Date(response.end_time);
          stopDateForEntry.setSeconds(stopDateForEntry.getSeconds() + 1 );
          return new actions.CreateEntry({ project_id: action.idProjectSwitching, start_date: stopDateForEntry.toISOString() });
        }),
        catchError((error) => {
          this.toastrService.warning(error.error.message);
          return of(new actions.StopTimeEntryRunningFail(error.error.message));
        })
      )
    )
  );

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
          if (activeEntry) {
            const today = new Date();
            const entryStartDate = new Date(activeEntry.start_date);
            const isSameDay = (today.getDate() === entryStartDate.getDate()
              && today.getMonth() === entryStartDate.getMonth()
              && today.getFullYear() === entryStartDate.getFullYear());
            if (isSameDay) {
              return new actions.LoadActiveEntrySuccess(activeEntry);
            } else {
              const endDate = new Date(activeEntry.start_date);
              endDate.setHours(23, 59, 59);
              return new actions.UpdateEntry({ id: activeEntry.id, end_date: endDate.toISOString() });
            }
          }
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
  updateEntry$: Observable<Action> = this.actions$.pipe(
    ofType(actions.EntryActionTypes.UPDATE_ENTRY),
    map((action: actions.UpdateEntry) => action.payload),
    mergeMap((entry) =>
      this.entryService.updateEntry(entry).pipe(
        map((entryResponse) => {
          this.toastrService.success(INFO_SAVED_SUCCESSFULLY);
          return new actions.UpdateEntrySuccess(entryResponse);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.UpdateEntryFail(error));
        })
      )
    )
  );


  @Effect()
  updateEntryRunning$: Observable<Action> = this.actions$.pipe(
    ofType(actions.EntryActionTypes.UPDATE_ENTRY_RUNNING),
    map((action: actions.UpdateEntry) => action.payload),
    mergeMap((entry) =>
      this.entryService.updateEntry(entry).pipe(
        map((entryResponse) => {
          return new actions.UpdateEntrySuccess(entryResponse);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.UpdateEntryFail(error));
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
        map((response) => {
          this.toastrService.success('You clocked-out successfully');
          return new actions.StopTimeEntryRunningSuccess(response);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.StopTimeEntryRunningFail(error.error.message));
        })
      )
    )
  );

  @Effect()
  loadEntriesByTimeRange$: Observable<Action> = this.actions$.pipe(
    ofType(actions.EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE),
    map((action: actions.LoadEntriesByTimeRange) => action),
    mergeMap((action) =>
      this.entryService.loadEntriesByTimeRange(action.timeRange, action.userId).pipe(
        map((response) => {
          return new actions.LoadEntriesByTimeRangeSuccess(response);
        }),
        catchError((error) => {
          return of(new actions.LoadEntriesByTimeRangeFail());
        })
      )
    )
  );

  @Effect()
  restartEntry$: Observable<Action> = this.actions$.pipe(
    ofType(actions.EntryActionTypes.RESTART_ENTRY),
    map((action: actions.RestartEntry) => action.entry),
    mergeMap((entry) =>
      this.entryService.restartEntry(entry.id).pipe(
        map((entryResponse) => {
          return new actions.RestartEntrySuccess(entryResponse);
        }),
        catchError((error) => {
          this.toastrService.error( error.error.message, 'This entry could not be restarted');
          return of(new actions.RestartEntryFail(error));
        })
      )
    )
  );
}
