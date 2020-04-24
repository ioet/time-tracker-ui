import { Action } from '@ngrx/store';
import { NewEntry, Entry, EntryRunning } from '../../shared/models';

export enum EntryActionTypes {
  CREATE_ENTRY = '[Entry] CREATE_ENTRY',
  CREATE_ENTRY_SUCCESS = '[Entry] CREATE_ENTRY_SUCCESS',
  CREATE_ENTRY_FAIL = '[Entry] CREATE_ENTRY_FAIL',
  LOAD_TIME_ENTRIES_RUNNING = '[Entry] LOAD_TIME_ENTRIES_RUNNING',
  LOAD_TIME_ENTRIES_RUNNING_SUCCESS = '[Entry] LOAD_TIME_ENTRIES_RUNNING_SUCCESS',
  LOAD_TIME_ENTRIES_RUNNING_FAILED = '[Entry] LOAD_TIME_ENTRIES_RUNNING_FAILED',
  STOP_TIME_ENTRIES_RUNNING = '[Entry] STOP_TIME_ENTRIES_RUNNING',
  STOP_TIME_ENTRIES_RUNNING_SUCCESS = '[Entry] STOP_TIME_ENTRIES_RUNNING_SUCCESS',
  STOP_TIME_ENTRIES_RUNNING_FAILED = '[Entry] STOP_TIME_ENTRIES_RUNNING_FAILED',
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

export class LoadTimeEntriesRunning implements Action {
  public readonly type = EntryActionTypes.LOAD_TIME_ENTRIES_RUNNING;
}

export class LoadTimeEntriesRunningSuccess implements Action {
  public readonly type = EntryActionTypes.LOAD_TIME_ENTRIES_RUNNING_SUCCESS;
  constructor(readonly payload: EntryRunning[]) {}
}

export class LoadTimeEntriesRunningFail implements Action {
  public readonly type = EntryActionTypes.LOAD_TIME_ENTRIES_RUNNING_FAILED;
  constructor(public error: string) {}
}

export class StopTimeEntriesRunning implements Action {
  public readonly type = EntryActionTypes.STOP_TIME_ENTRIES_RUNNING;
  constructor(readonly payload: string) {}
}

export class StopTimeEntriesRunningSuccess implements Action {
  public readonly type = EntryActionTypes.STOP_TIME_ENTRIES_RUNNING_SUCCESS;
  constructor(readonly payload: string) {}
}

export class StopTimeEntriesRunningFail implements Action {
  public readonly type = EntryActionTypes.STOP_TIME_ENTRIES_RUNNING_FAILED;
  constructor(public error: string) {}
}

export type EntryActions =
  | CreateEntry
  | CreateEntrySuccess
  | CreateEntryFail
  | LoadTimeEntriesRunning
  | LoadTimeEntriesRunningSuccess
  | LoadTimeEntriesRunningFail
  | StopTimeEntriesRunning
  | StopTimeEntriesRunningSuccess
  | StopTimeEntriesRunningFail;
