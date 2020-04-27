import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EntryState } from './entry.reducer';

const getEntryState = createFeatureSelector('entries');

export const allEntries = createSelector(getEntryState, (state: EntryState) => {
  return state;
});

export const selectProjects = (state) => state.projects.projectList;
export const selectEntries = (state) => state.entries.active;

export const selectActiveEntry = createSelector(selectProjects, selectEntries, (selectedProject, selectedEntry) => {
  if (selectedProject && selectedEntry) {
    return selectedProject.find((project) => project.id === selectedEntry.project_id);
  }
});
