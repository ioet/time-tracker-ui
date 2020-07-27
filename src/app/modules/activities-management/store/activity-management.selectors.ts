import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivityState } from './activity-management.reducers';

const getActivityState = createFeatureSelector<ActivityState>('activities');

export const allActivities = createSelector(getActivityState, (state: ActivityState) => state?.data);

export const activityIdToEdit = createSelector(getActivityState, (state: ActivityState) => state?.activityIdToEdit);

export const getActivityById = createSelector(allActivities, activityIdToEdit, (activities, activityId) => {
  if (activities && activityId) {
    return activities.find((activity) => {
      return activity.id === activityId;
    });
  }
});

export const getIsLoading = createSelector(getActivityState, (state: ActivityState) => state?.isLoading);
