import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntryState } from './entry.reducer';

export const getEntryState = createFeatureSelector<EntryState>('entries');

export const getIdEntryRunning = createSelector(getEntryState, (entryRunning) => {
  const key = 'id';
  if (entryRunning.entryRunningData) {
    return entryRunning.entryRunningData[key];
  }
});

export const getStatusMessage = createSelector(getEntryState, (messageState) => {
  if (messageState) {
    return messageState.message;
  }
});
