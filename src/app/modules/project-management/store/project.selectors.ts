import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProjectState } from './project.reducer';

const getProjectState = createFeatureSelector<ProjectState>('projects');

export const allProjects = createSelector(getProjectState, (state: ProjectState) => {
  return state;
});
