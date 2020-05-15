import { TimeEntriesSummary } from '../models/time.entry.summary';
import { Action } from '@ngrx/store';
import { NewEntry, Entry } from '../../shared/models';

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
  CREATE_ENTRY = '[Entry] CREATE_ENTRY',
  CREATE_ENTRY_SUCCESS = '[Entry] CREATE_ENTRY_SUCCESS',
  CREATE_ENTRY_FAIL = '[Entry] CREATE_ENTRY_FAIL',
  UPDATE_ACTIVE_ENTRY = '[Entry] UPDATE_ACTIVE_ENTRY',
  UPDATE_ACTIVE_ENTRY_SUCCESS = '[Entry] UPDATE_ACTIVE_ENTRY_SUCCESS',
  UPDATE_ACTIVE_ENTRY_FAIL = '[Entry] UPDATE_ACTIVE_ENTRY_FAIL',
  DELETE_ENTRY = '[Entry] DELETE_ENTRY',
  DELETE_ENTRY_SUCCESS = '[Entry] DELETE_ENTRY_SUCCESS',
  DELETE_ENTRY_FAIL = '[Entry] DELETE_ENTRY_FAIL',
  STOP_TIME_ENTRY_RUNNING = '[Entry] STOP_TIME_ENTRIES_RUNNING',
  STOP_TIME_ENTRY_RUNNING_SUCCESS = '[Entry] STOP_TIME_ENTRIES_RUNNING_SUCCESS',
  STOP_TIME_ENTRY_RUNNING_FAILED = '[Entry] STOP_TIME_ENTRIES_RUNNING_FAILED',
  DEFAULT_ENTRY = '[Entry] DEFAULT_ENTRY',
  CLEAN_ENTRY_CREATE_ERROR = '[Entry] CLEAN_ENTRY_CREATE_ERROR',
  CLEAN_ENTRY_UPDATE_ERROR = '[Entry] CLEAN_ENTRY_UPDATE_ERROR',
}

export class LoadEntriesSummary implements Action {
  public readonly type = EntryActionTypes.LOAD_ENTRIES_SUMMARY;
}

export class LoadEntriesSummarySuccess implements Action {
  readonly type = EntryActionTypes.LOAD_ENTRIES_SUMMARY_SUCCESS;
  constructor(readonly payload: TimeEntriesSummary) {}
}

export class LoadEntriesSummaryFail implements Action {
  readonly type = EntryActionTypes.LOAD_ENTRIES_SUMMARY_FAIL;
}

export class LoadActiveEntry implements Action {
  public readonly type = EntryActionTypes.LOAD_ACTIVE_ENTRY;
}

export class LoadActiveEntrySuccess implements Action {
  readonly type = EntryActionTypes.LOAD_ACTIVE_ENTRY_SUCCESS;
  constructor(readonly payload: NewEntry[]) {}
}

export class LoadActiveEntryFail implements Action {
  public readonly type = EntryActionTypes.LOAD_ACTIVE_ENTRY_FAIL;

  constructor(public error: string) {}
}

export class LoadEntries implements Action {
  public readonly type = EntryActionTypes.LOAD_ENTRIES;
}

export class LoadEntriesSuccess implements Action {
  readonly type = EntryActionTypes.LOAD_ENTRIES_SUCCESS;
  constructor(readonly payload: Entry[]) {}
}

export class LoadEntriesFail implements Action {
  public readonly type = EntryActionTypes.LOAD_ENTRIES_FAIL;

  constructor(public error: string) {}
}

export class CreateEntry implements Action {
  public readonly type = EntryActionTypes.CREATE_ENTRY;

  constructor(public payload: NewEntry) {}
}

export class CreateEntrySuccess implements Action {
  public readonly type = EntryActionTypes.CREATE_ENTRY_SUCCESS;

  constructor(public payload: NewEntry) {}
}

export class CreateEntryFail implements Action {
  public readonly type = EntryActionTypes.CREATE_ENTRY_FAIL;

  constructor(public error: string) {}
}

export class DeleteEntry implements Action {
  public readonly type = EntryActionTypes.DELETE_ENTRY;

  constructor(public entryId: string) {}
}

export class DeleteEntrySuccess implements Action {
  public readonly type = EntryActionTypes.DELETE_ENTRY_SUCCESS;

  constructor(public entryId: string) {}
}

export class DeleteEntryFail implements Action {
  public readonly type = EntryActionTypes.DELETE_ENTRY_FAIL;

  constructor(public error: string) {}
}
export class UpdateActiveEntry implements Action {
  public readonly type = EntryActionTypes.UPDATE_ACTIVE_ENTRY;

  constructor(public payload: NewEntry) {}
}

export class UpdateActiveEntrySuccess implements Action {
  public readonly type = EntryActionTypes.UPDATE_ACTIVE_ENTRY_SUCCESS;

  constructor(public payload: Entry) {}
}

export class UpdateActiveEntryFail implements Action {
  public readonly type = EntryActionTypes.UPDATE_ACTIVE_ENTRY_FAIL;

  constructor(public error: string) {}
}

export class StopTimeEntryRunning implements Action {
  public readonly type = EntryActionTypes.STOP_TIME_ENTRY_RUNNING;
  constructor(readonly payload: string) {}
}

export class StopTimeEntryRunningSuccess implements Action {
  public readonly type = EntryActionTypes.STOP_TIME_ENTRY_RUNNING_SUCCESS;
  constructor(readonly payload: string) {}
}

export class StopTimeEntryRunningFail implements Action {
  public readonly type = EntryActionTypes.STOP_TIME_ENTRY_RUNNING_FAILED;
  constructor(public error: string) {}
}

export class CleanEntryCreateError implements Action {
  public readonly type = EntryActionTypes.CLEAN_ENTRY_CREATE_ERROR;
  constructor(public error: boolean) {}
}

export class CleanEntryUpdateError implements Action {
  public readonly type = EntryActionTypes.CLEAN_ENTRY_UPDATE_ERROR;
  constructor(public error: boolean) {}
}
export class DefaultEntry implements Action {
  public readonly type = EntryActionTypes.DEFAULT_ENTRY;
}

export type EntryActions =
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
  | UpdateActiveEntry
  | UpdateActiveEntrySuccess
  | UpdateActiveEntryFail
  | DeleteEntry
  | DeleteEntrySuccess
  | DeleteEntryFail
  | StopTimeEntryRunning
  | StopTimeEntryRunningSuccess
  | StopTimeEntryRunningFail
  | CleanEntryCreateError
  | CleanEntryUpdateError
  | DefaultEntry;
