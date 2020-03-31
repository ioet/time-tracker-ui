import { ActivityState } from './activity-management.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getActivityState = createFeatureSelector<ActivityState>('activities');

export const allActivities = createSelector(getActivityState, (state: ActivityState) => {
    return state;
});
