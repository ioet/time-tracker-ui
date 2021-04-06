import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProjectTypeState } from './project-type.reducers';

const getProjectTypeState = createFeatureSelector<ProjectTypeState>('projectType');

export const allProjectTypes = createSelector(getProjectTypeState, (state: ProjectTypeState) => {
  return state?.data;
});

export const projectTypeIdToEdit = createSelector(getProjectTypeState, (state: ProjectTypeState) => {
  return state?.projectTypeIdToEdit;
});

export const getProjectTypeById = createSelector(
  allProjectTypes,
  projectTypeIdToEdit,
  (projectTypes, projectTypeId) => {
    if (projectTypes && projectTypeId) {
      return projectTypes.find((projectType) => {
        return projectType.id === projectTypeId;
      });
    }
  }
);
