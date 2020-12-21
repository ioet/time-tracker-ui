import { Action } from '@ngrx/store';
import { Entry, NewEntry } from '../../shared/models';
import { TimeEntriesTimeRange } from '../models/time-entries-time-range';
import { TimeEntriesSummary } from '../models/time.entry.summary';

export enum EntryActionTypes {
  LOAD_ENTRIES_SUMMARY = '[Entry] LOAD_ENTRIES_SUMMARY',
  LOAD_ENTRIES_SUMMARY_SUCCESS = '[Entry] LOAD_ENTRIES_SUMMARY_SUCCESS',
  LOAD_ENTRIES_SUMMARY_FAIL = '[Entry] LOAD_ENTRIES_SUMMARY_FAIL',
  LOAD_ACTIVE_ENTRY = '[Entry] LOAD_ACTIVE_ENTRY',
  LOAD_ACTIVE_ENTRY_SUCCESS = '[Entry] LOAD_ACTIVE_ENTRY_SUCCESS',
  LOAD_ACTIVE_ENTRY_FAIL = '[Entry] LOAD_ACTIVE_ENTRY_FAIL',
  LOAD_ENTRIES = '[Entry] LOAD_ENTRIES',
  LOAD_ENTRIES_SUCCESS = '[Entry] LOAD_ENTRIES_SUCCESS',
  LOAD_ENTRIES_FAIL = '[Entry] LOAD_ENTRIES_FAIL',
  CLOCK_IN = '[Entry] CLOCK_IN',
  CLOCK_IN_SUCCESS = '[Entry] CLOCK_IN_SUCCESS',
  CREATE_ENTRY = '[Entry] CREATE_ENTRY',
  CREATE_ENTRY_SUCCESS = '[Entry] CREATE_ENTRY_SUCCESS',
  CREATE_ENTRY_FAIL = '[Entry] CREATE_ENTRY_FAIL',
  UPDATE_ENTRY_RUNNING = '[Entry] UPDATE_ENTRY_RUNNING',
  UPDATE_ENTRY = '[Entry] UPDATE_ENTRY',
  UPDATE_ENTRY_SUCCESS = '[Entry] UPDATE_ENTRY_SUCCESS',
  UPDATE_CURRENT_OR_LAST_ENTRY = '[Entry] UPDATE_CURRENT_OR_LAST_ENTRY',
  UPDATE_CURRENT_OR_LAST_ENTRY_FAIL = '[Entry] UPDATE_CURRENT_OR_LAST_ENTRY_FAIL',
  UPDATE_ENTRY_FAIL = '[Entry] UPDATE_ENTRY_FAIL',
  DELETE_ENTRY = '[Entry] DELETE_ENTRY',
  DELETE_ENTRY_SUCCESS = '[Entry] DELETE_ENTRY_SUCCESS',
  DELETE_ENTRY_FAIL = '[Entry] DELETE_ENTRY_FAIL',
  STOP_TIME_ENTRY_RUNNING = '[Entry] STOP_TIME_ENTRIES_RUNNING',
  STOP_TIME_ENTRY_RUNNING_SUCCESS = '[Entry] STOP_TIME_ENTRIES_RUNNING_SUCCESS',
  STOP_TIME_ENTRY_RUNNING_FAILED = '[Entry] STOP_TIME_ENTRIES_RUNNING_FAILED',
  DEFAULT_ENTRY = '[Entry] DEFAULT_ENTRY',
  CLEAN_ENTRY_CREATE_ERROR = '[Entry] CLEAN_ENTRY_CREATE_ERROR',
  CLEAN_ENTRY_UPDATE_ERROR = '[Entry] CLEAN_ENTRY_UPDATE_ERROR',
  LOAD_ENTRIES_BY_TIME_RANGE = '[Entry] LOAD_ENTRIES_BY_TIME_RANGE',
  LOAD_ENTRIES_BY_TIME_RANGE_SUCCESS = '[Entry] LOAD_ENTRIES_BY_TIME_RANGE_SUCCESS',
  LOAD_ENTRIES_BY_TIME_RANGE_FAIL = '[Entry] LOAD_ENTRIES_BY_TIME_RANGE_FAIL',
  SWITCH_TIME_ENTRY = '[Entry] SWITCH_TIME_ENTRY',
  SWITCH_TIME_ENTRY_FAIL = '[Entry] SWITCH_TIME_ENTRY_FAIL',
  RESTART_ENTRY = '[Entry] RESTART_ENTRY',
  RESTART_ENTRY_SUCCESS = '[Entry] RESTART_ENTRY_SUCCESS',
  RESTART_ENTRY_FAIL = '[Entry] RESTART_ENTRY_FAIL',
}

export class ClockIn implements Action {
  public readonly type = EntryActionTypes.CLOCK_IN;
  constructor(readonly payload: NewEntry) {}
}

export class ClockInSuccess implements Action {
  public readonly type = EntryActionTypes.CLOCK_IN_SUCCESS;
  constructor() {}
}

export class SwitchTimeEntry implements Action {
  public readonly type = EntryActionTypes.SWITCH_TIME_ENTRY;
  constructor(readonly idEntrySwitching: string, readonly idProjectSwitching) {}
}

export class SwitchTimeEntryFail implements Action {
  public readonly type = EntryActionTypes.SWITCH_TIME_ENTRY_FAIL;
  constructor(readonly error: string) {}
}

export class LoadEntriesSummary implements Action {
  public readonly type = EntryActionTypes.LOAD_ENTRIES_SUMMARY;
}

export class LoadEntriesSummarySuccess implements Action {
  readonly type = EntryActionTypes.LOAD_ENTRIES_SUMMARY_SUCCESS;

  constructor(readonly payload: TimeEntriesSummary) {
  }
}

export class LoadEntriesSummaryFail implements Action {
  readonly type = EntryActionTypes.LOAD_ENTRIES_SUMMARY_FAIL;
}

export class LoadActiveEntry implements Action {
  public readonly type = EntryActionTypes.LOAD_ACTIVE_ENTRY;
}

export class LoadActiveEntrySuccess implements Action {
  readonly type = EntryActionTypes.LOAD_ACTIVE_ENTRY_SUCCESS;

  constructor(readonly payload) {
  }
}

export class LoadActiveEntryFail implements Action {
  public readonly type = EntryActionTypes.LOAD_ACTIVE_ENTRY_FAIL;

  constructor(public error: string) {
  }
}

export class LoadEntries implements Action {
  public readonly type = EntryActionTypes.LOAD_ENTRIES;

  constructor(public month: number, public year: number) {
  }
}

export class LoadEntriesSuccess implements Action {
  readonly type = EntryActionTypes.LOAD_ENTRIES_SUCCESS;

  constructor(readonly payload: Entry[]) {
  }
}

export class LoadEntriesFail implements Action {
  public readonly type = EntryActionTypes.LOAD_ENTRIES_FAIL;

  constructor(public error: string) {
  }
}

export class CreateEntry implements Action {
  public readonly type = EntryActionTypes.CREATE_ENTRY;

  constructor(public payload: NewEntry) {
  }
}

export class CreateEntrySuccess implements Action {
  public readonly type = EntryActionTypes.CREATE_ENTRY_SUCCESS;
  constructor(public payload: Entry) {}
}

export class CreateEntryFail implements Action {
  public readonly type = EntryActionTypes.CREATE_ENTRY_FAIL;

  constructor(public error: string) {
  }
}

export class DeleteEntry implements Action {
  public readonly type = EntryActionTypes.DELETE_ENTRY;

  constructor(public entryId: string) {
  }
}

export class DeleteEntrySuccess implements Action {
  public readonly type = EntryActionTypes.DELETE_ENTRY_SUCCESS;

  constructor(public entryId: string) {
  }
}

export class DeleteEntryFail implements Action {
  public readonly type = EntryActionTypes.DELETE_ENTRY_FAIL;

  constructor(public error: string) {
  }
}

export class UpdateEntryRunning implements Action {
  public readonly type = EntryActionTypes.UPDATE_ENTRY_RUNNING;

  constructor(public payload) {
  }
}

export class UpdateEntry implements Action {
  public readonly type = EntryActionTypes.UPDATE_ENTRY;

  constructor(public payload) {
  }
}

export class UpdateEntrySuccess implements Action {
  public readonly type = EntryActionTypes.UPDATE_ENTRY_SUCCESS;

  constructor(public payload: Entry) {
  }
}

export class UpdateEntryFail implements Action {
  public readonly type = EntryActionTypes.UPDATE_ENTRY_FAIL;

  constructor(public error: string) {
  }
}

export class UpdateCurrentOrLastEntry implements Action {
  public readonly type = EntryActionTypes.UPDATE_CURRENT_OR_LAST_ENTRY;

  constructor(public payload) {
  }
}
export class UpdateCurrentOrLastEntryFail implements Action {
  public readonly type = EntryActionTypes.UPDATE_CURRENT_OR_LAST_ENTRY_FAIL;

  constructor(public error: string) {
  }
}
export class StopTimeEntryRunning implements Action {
  public readonly type = EntryActionTypes.STOP_TIME_ENTRY_RUNNING;

  constructor(readonly payload: string) {
  }
}

export class StopTimeEntryRunningSuccess implements Action {
  public readonly type = EntryActionTypes.STOP_TIME_ENTRY_RUNNING_SUCCESS;

  constructor(readonly payload) {
  }
}

export class StopTimeEntryRunningFail implements Action {
  public readonly type = EntryActionTypes.STOP_TIME_ENTRY_RUNNING_FAILED;

  constructor(public error: string) {
  }
}

export class CleanEntryCreateError implements Action {
  public readonly type = EntryActionTypes.CLEAN_ENTRY_CREATE_ERROR;

  constructor(public error: boolean) {
  }
}

export class CleanEntryUpdateError implements Action {
  public readonly type = EntryActionTypes.CLEAN_ENTRY_UPDATE_ERROR;

  constructor(public error: boolean) {
  }
}

export class DefaultEntry implements Action {
  public readonly type = EntryActionTypes.DEFAULT_ENTRY;
}

export class LoadEntriesByTimeRange implements Action {
  public readonly type = EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE;

  constructor(readonly timeRange: TimeEntriesTimeRange, readonly userId: string = '*') {
  }
}

export class LoadEntriesByTimeRangeSuccess implements Action {
  readonly type = EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE_SUCCESS;

  constructor(readonly payload: Entry[]) {
  }
}

export class LoadEntriesByTimeRangeFail implements Action {
  readonly type = EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE_FAIL;
}

export class RestartEntry implements Action {
  readonly type = EntryActionTypes.RESTART_ENTRY;

  constructor(readonly entry: Entry) {
  }
}

export class RestartEntrySuccess implements Action {
  readonly type = EntryActionTypes.RESTART_ENTRY_SUCCESS;

  constructor(readonly payload: Entry) {
  }
}

export class RestartEntryFail implements Action {
  public readonly type = EntryActionTypes.RESTART_ENTRY_FAIL;

  constructor(public error: string) {
  }
}

export type EntryActions =
  | ClockIn
  | ClockInSuccess
  | LoadEntriesSummary
  | LoadEntriesSummarySuccess
  | LoadEntriesSummaryFail
  | LoadActiveEntry
  | LoadActiveEntrySuccess
  | LoadActiveEntryFail
  | LoadEntries
  | LoadEntriesSuccess
  | LoadEntriesFail
  | CreateEntry
  | CreateEntrySuccess
  | CreateEntryFail
  | UpdateEntryRunning
  | UpdateEntry
  | UpdateEntrySuccess
  | UpdateEntryFail
  | DeleteEntry
  | DeleteEntrySuccess
  | DeleteEntryFail
  | StopTimeEntryRunning
  | StopTimeEntryRunningSuccess
  | StopTimeEntryRunningFail
  | CleanEntryCreateError
  | CleanEntryUpdateError
  | DefaultEntry
  | LoadEntriesByTimeRange
  | LoadEntriesByTimeRangeSuccess
  | LoadEntriesByTimeRangeFail
  | SwitchTimeEntry
  | SwitchTimeEntryFail
  | RestartEntry
  | RestartEntrySuccess
  | RestartEntryFail
  | UpdateCurrentOrLastEntry
  | UpdateCurrentOrLastEntryFail;
