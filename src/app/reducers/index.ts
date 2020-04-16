import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { projectReducer } from '../modules/project-management/store/project.reducer';
import { activityManagementReducer } from '../modules/activities-management/store/activity-management.reducers';
import { technologyReducer } from '../modules/shared/store/technology.reducers';
import { environment } from '../../environments/environment';

export interface State {
  projects;
  activities;
  technologies;
}

export const reducers: ActionReducerMap<State> = {
  projects: projectReducer,
  activities: activityManagementReducer,
  technologies: technologyReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
