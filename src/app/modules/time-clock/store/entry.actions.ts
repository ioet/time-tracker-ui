import { Action } from '@ngrx/store';
import { NewEntry } from '../../shared/models';

export enum EntryActionTypes {
  LOAD_ACTIVE_ENTRY = '[Entry] LOAD_ACTIVE_ENTRY',
  LOAD_ACTIVE_ENTRY_SUCCESS = '[Entry] LOAD_ACTIVE_ENTRY_SUCCESS',
  LOAD_ACTIVE_ENTRY_FAIL = '[Entry] LOAD_ACTIVE_ENTRY_FAIL',
  CREATE_ENTRY = '[Entry] CREATE_ENTRY',
  CREATE_ENTRY_SUCCESS = '[Entry] CREATE_ENTRY_SUCCESS',
  CREATE_ENTRY_FAIL = '[Entry] CREATE_ENTRY_FAIL',
  UDPATE_ACTIVE_ENTRY = '[Entry] UDPATE_ACTIVE_ENTRY',
  UDPATE_ACTIVE_ENTRY_SUCCESS = '[Entry] UDPATE_ACTIVE_ENTRY_SUCCESS',
  UDPATE_ACTIVE_ENTRY_FAIL = '[Entry] UDPATE_ACTIVE_ENTRY_FAIL',
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
  public readonly type = EntryActionTypes.UDPATE_ACTIVE_ENTRY;

  constructor(public payload: NewEntry) {}
}

export class UpdateActiveEntrySuccess implements Action {
  public readonly type = EntryActionTypes.UDPATE_ACTIVE_ENTRY_SUCCESS;

  constructor(public payload: NewEntry) {}
}

export class UpdateActiveEntryFail implements Action {
  public readonly type = EntryActionTypes.UDPATE_ACTIVE_ENTRY_FAIL;

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
  | UpdateActiveEntryFail;
