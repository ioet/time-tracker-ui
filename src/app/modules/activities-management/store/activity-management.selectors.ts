import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ActivityState } from './activity-management.reducers';

const getActivityState = createFeatureSelector<ActivityState>('activities');

export const allActivities = createSelector(getActivityState, (state: ActivityState) => {
  return state;
});
