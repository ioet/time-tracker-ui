import { Action } from '@ngrx/store';
import { NewEntry } from '../../shared/models';

export enum EntryActionTypes {
  LOAD_ACTIVE_ENTRY = '[Entry] LOAD_ACTIVE_ENTRY',
  LOAD_ACTIVE_ENTRY_SUCCESS = '[Entry] LOAD_ACTIVE_ENTRY_SUCCESS',
  LOAD_ACTIVE_ENTRY_FAIL = '[Entry] LOAD_ACTIVE_ENTRY_FAIL',
  CREATE_ENTRY = '[Entry] CREATE_ENTRY',
  CREATE_ENTRY_SUCCESS = '[Entry] CREATE_ENTRY_SUCCESS',
  CREATE_ENTRY_FAIL = '[Entry] CREATE_ENTRY_FAIL',
  UPDATE_ACTIVE_ENTRY = '[Entry] UPDATE_ACTIVE_ENTRY',
  UPDATE_ACTIVE_ENTRY_SUCCESS = '[Entry] UPDATE_ACTIVE_ENTRY_SUCCESS',
  UPDATE_ACTIVE_ENTRY_FAIL = '[Entry] UPDATE_ACTIVE_ENTRY_FAIL',
  STOP_TIME_ENTRY_RUNNING = '[Entry] STOP_TIME_ENTRIES_RUNNING',
  STOP_TIME_ENTRY_RUNNING_SUCCESS = '[Entry] STOP_TIME_ENTRIES_RUNNING_SUCCESS',
  STOP_TIME_ENTRY_RUNNING_FAILED = '[Entry] STOP_TIME_ENTRIES_RUNNING_FAILED',
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

export class UpdateActiveEntry implements Action {
  public readonly type = EntryActionTypes.UPDATE_ACTIVE_ENTRY;

  constructor(public payload: NewEntry) {}
}

export class UpdateActiveEntrySuccess implements Action {
  public readonly type = EntryActionTypes.UPDATE_ACTIVE_ENTRY_SUCCESS;

  constructor(public payload: NewEntry) {}
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

export type EntryActions =
  | LoadActiveEntry
  | LoadActiveEntrySuccess
  | LoadActiveEntryFail
  | CreateEntry
  | CreateEntrySuccess
  | CreateEntryFail
  | UpdateActiveEntry
  | UpdateActiveEntrySuccess
  | UpdateActiveEntryFail
  | StopTimeEntryRunning
  | StopTimeEntryRunningSuccess
  | StopTimeEntryRunningFail;
