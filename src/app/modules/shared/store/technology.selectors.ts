import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TechnologyState } from './technology.reducers';

const getTechnologyState = createFeatureSelector<TechnologyState>('technologies');

export const allTechnologies = createSelector(getTechnologyState, (state: TechnologyState) => {
  return state;
});
