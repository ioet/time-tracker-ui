import { createFeatureSelector, createSelector } from '@ngrx/store';

const getUserState = createFeatureSelector('user');

export const getUserInfo = createSelector(getUserState, (state: any) => state);

