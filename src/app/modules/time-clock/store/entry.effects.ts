import { INFO_DELETE_SUCCESSFULLY, INFO_SAVED_SUCCESSFULLY } from './../../shared/messages';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { EntryService } from '../services/entry.service';
import * as actions from './entry.actions';
import * as moment from 'moment';

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
          const stopDateForEntry = new Date(response.end_date);
          stopDateForEntry.setSeconds(stopDateForEntry.getSeconds() + 1);
          const entry = {
            project_id: action.idProjectSwitching,
            start_date: stopDateForEntry.toISOString(),
            timezone_offset: new Date().getTimezoneOffset(),
            technologies: []
          };
          return new actions.ClockIn(entry);
        }),
        catchError((error) => {
          this.toastrService.warning('We could not perform this operation, try again later');
          return of(new actions.StopTimeEntryRunningFail(error));
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
          this.toastrService.warning('Your summary information could not be loaded');
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
          } else {
            return new actions.LoadActiveEntryFail('No active entry found');
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
    map((action: actions.LoadEntries) => action),
    mergeMap((date) =>
      this.entryService.loadEntries({ month: date.month, year: date.year }).pipe(
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
  clockIn$: Observable<Action> = this.actions$.pipe(
    ofType(actions.EntryActionTypes.CLOCK_IN),
    map((action: actions.ClockIn) => action.payload),
    mergeMap((entry) =>
      this.entryService.findEntriesByProjectId(entry.project_id).pipe(
        map((entriesFound) => {
          if (entriesFound && entriesFound.length > 0) {
            const dataToUse = entriesFound[0];
            entry = { ...entry };
            entry.description = dataToUse.description;
            entry.technologies = dataToUse.technologies ? dataToUse.technologies : [];
            entry.uri = dataToUse.uri;
            entry.activity_id = dataToUse.activity_id;
          }
          return new actions.CreateEntry(entry);
        }),
        catchError((error) => {
          if (error.status === 404) {
            return of(new actions.CreateEntry(entry));
          } else {
            this.toastrService.error('We could not clock in you, try again later.');
            return of(new actions.CreateEntryFail('Error'));
          }
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
  updateCurrentOrLastEntry$: Observable<Action> = this.actions$.pipe(
    ofType(actions.EntryActionTypes.UPDATE_CURRENT_OR_LAST_ENTRY),
    map((action: actions.UpdateCurrentOrLastEntry) => action.payload),
    switchMap((entry) =>
      this.entryService.loadEntries({
        month : new Date().getMonth() + 1,
        year: new Date().getFullYear()
      }).pipe(
        map((entries) => {
          const lastEntry = entries[1];
          const isStartTimeInLastEntry = lastEntry && moment(entry.start_date).isBefore(lastEntry.end_date);
          if (isStartTimeInLastEntry) {
            return new actions.UpdateEntry({ id: lastEntry.id, end_date: entry.start_date });
          } else {
            this.toastrService.success('You change the time-in successfully');
            return new actions.UpdateEntryRunning(entry);
          }
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.UpdateCurrentOrLastEntryFail('error'));
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
          this.toastrService.error(error.error.message, 'This entry could not be restarted');
          return of(new actions.RestartEntryFail(error));
        })
      )
    )
  );
}
