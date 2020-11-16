import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducers';

export const getUserState = createFeatureSelector<UserState>('users');

export const getIsLoading = createSelector(getUserState, (state: UserState) => {
  return state.isLoading;
});
