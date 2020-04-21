import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { projectReducer } from '../modules/project-management/store/project.reducer';
import { activityManagementReducer } from '../modules/activities-management/store/activity-management.reducers';
import { technologyReducer } from '../modules/shared/store/technology.reducers';
import { customerManagementReducer } from '../modules/customer-management/store/customer-management.reducers';
import { projectTypeReducer } from '../modules/customer-management/components/projects-type/store/project-type.reducers';
import { environment } from '../../environments/environment';

export interface State {
  projects;
  activities;
  technologies;
  customers;
  projectType;
}

export const reducers: ActionReducerMap<State> = {
  projects: projectReducer,
  activities: activityManagementReducer,
  customers: customerManagementReducer,
  technologies: technologyReducer,
  projectType: projectTypeReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
