import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../models/user';

const getUserState = createFeatureSelector<any>('user');

export const getUserInfo = createSelector(getUserState, (state: User) => state);
export const getUserGroups = createSelector(getUserState, (state: User) => state.groups);
