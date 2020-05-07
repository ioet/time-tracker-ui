import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EntryState } from './entry.reducer';

const getEntryState = createFeatureSelector('entries');

export const getActiveTimeEntry = createSelector(getEntryState, (state: EntryState) => {
  return state.active;
});

export const getStatusMessage = createSelector(getEntryState, (state: EntryState) => state.message);

export const allEntries = createSelector(getEntryState, (state: EntryState) => state.entryList);
