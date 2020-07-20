import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProjectState } from './project.reducer';

const getProjectState = createFeatureSelector<ProjectState>('projects');

export const getCustomerProjects = createSelector(getProjectState, (state: ProjectState) => {
  return state;
});

export const getProjects = createSelector(getProjectState, (state: ProjectState) => {
  return state.projects;
});

export const getProjectToEdit = createSelector(getProjectState, (state: ProjectState) => {
  return state.projectToEdit;
});

export const getIsLoading = createSelector(getProjectState, (state: ProjectState) => {
  return state.isLoading;
});
