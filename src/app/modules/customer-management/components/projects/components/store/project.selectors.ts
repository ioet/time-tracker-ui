import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectState } from './project.reducer';

const getProjectState = createFeatureSelector<ProjectState>('projects');

export const getCustomerProjects = createSelector(getProjectState, (state: ProjectState) => state);

export const getProjects = createSelector(getProjectState, (state: ProjectState) =>
  state?.projects.filter((item) => item.status !== 'inactive')
);

export const getRecentProjects = createSelector(getProjectState, (state: ProjectState) => state?.recentProjects);

export const getProjectToEdit = createSelector(getProjectState, (state: ProjectState) => state?.projectToEdit);

export const getIsLoading = createSelector(getProjectState, (state: ProjectState) => state?.isLoading);
