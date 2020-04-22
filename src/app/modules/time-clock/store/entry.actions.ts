import { Action } from '@ngrx/store';
import { NewEntry } from '../../shared/models';

export enum EntryActionTypes {
  CREATE_ENTRY = '[Entry] CREATE_ENTRY',
  CREATE_ENTRY_SUCCESS = '[Entry] CREATE_ENTRY_SUCCESS',
  CREATE_ENTRY_FAIL = '[Entry] CREATE_ENTRY_FAIL',
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

export type EntryActions = CreateEntry | CreateEntrySuccess | CreateEntryFail;
