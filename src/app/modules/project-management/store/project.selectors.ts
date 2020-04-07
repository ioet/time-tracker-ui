import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from './project.reducer';

const getProjectState = createFeatureSelector<AppState>('projects');

export const allProjects = createSelector(getProjectState, (state: AppState) => {
  return state;
});
