import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EntryState } from './entry.reducer';

const getEntryState = createFeatureSelector('entries');

export const getEntriesSummary  = createSelector(getEntryState, (state: EntryState) => {
  return state.timeEntriesSummary;
});

export const getActiveTimeEntry = createSelector(getEntryState, (state: EntryState) => {
  return state.active;
});

export const getCreateError = createSelector(getEntryState, (state: EntryState) => {
  return state.createError;
});

export const getUpdateError = createSelector(getEntryState, (state: EntryState) => {
  return state.updateError;
});
export const getStatusMessage = createSelector(getEntryState, (state: EntryState) => state.message);

export const allEntries = createSelector(getEntryState, (state: EntryState) => state.entryList);
