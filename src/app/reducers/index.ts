import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { projectReducer } from '../modules/customer-management/components/projects/components/store/project.reducer';
import { activityManagementReducer } from '../modules/activities-management/store/activity-management.reducers';
import { technologyReducer } from '../modules/shared/store/technology.reducers';
import { customerManagementReducer } from '../modules/customer-management/store/customer-management.reducers';
import { projectTypeReducer } from '../modules/customer-management/components/projects-type/store/project-type.reducers';
import { entryReducer } from '../modules/time-clock/store/entry.reducer';
import { environment } from '../../environments/environment';
import { userReducer } from '../modules/login/store/user.reducer';
import { userReducer as usersReducer } from '../modules/users/store/user.reducers';
export interface State {
  projects;
  activities;
  technologies;
  customers;
  projectType;
  entries;
  users;
  user;
}

export const reducers: ActionReducerMap<State> = {
  projects: projectReducer,
  activities: activityManagementReducer,
  customers: customerManagementReducer,
  technologies: technologyReducer,
  projectType: projectTypeReducer,
  entries: entryReducer,
  users: usersReducer,
  user: userReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
