import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { projectReducer } from '../modules/project-management/store/project.reducer';
import { activityManagementReducer } from '../modules/activities-management/store/activity-management.reducers';
import { environment } from '../../environments/environment';

export interface State {
  projects;
  activities;
}

export const reducers: ActionReducerMap<State> = {
  projects: projectReducer,
  activities: activityManagementReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
