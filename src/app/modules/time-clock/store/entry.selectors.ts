import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EntryState } from './entry.reducer';

const getEntryState = createFeatureSelector('entries');

export const allEntries = createSelector(getEntryState, (state: EntryState) => {
  return state;
});

export const selectProjects = (state) => state.projects.projectList;
export const selectEntries = (state) => state.entries.active;

export const getActiveTimeEntry = createSelector(getEntryState, (state: EntryState) => {
  return state.active;
});

export const getStatusMessage = createSelector(getEntryState, (state: EntryState) => {
  if (state) {
    return state.message;
  }
});
