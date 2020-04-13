import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ActivityState } from './activity-management.reducers';

const getActivityState = createFeatureSelector<ActivityState>('activities');

export const allActivities = createSelector(getActivityState, (state: ActivityState) => {
  return state.data;
});

export const activityIdtoEdit = createSelector(getActivityState, (state: ActivityState) => {
  return state.activityIdToEdit;
});

export const getActivityById = createSelector(allActivities, activityIdtoEdit, (activities, activityId) => {
  if (activities && activityId) {
    return activities.find((activity) => {
      return activity.id === activityId;
    });
  }
});
