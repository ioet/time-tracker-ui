import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../../environments/environment';
import { userReducer } from '../modules/user/store/user.reducer';
import { entryReducer } from '../modules/time-clock/store/entry.reducer';
import { technologyReducer } from '../modules/shared/store/technology.reducers';
import { userReducer as usersReducer } from '../modules/users/store/user.reducers';
import { customerManagementReducer } from '../modules/customer-management/store/customer-management.reducers';
import { activityManagementReducer } from '../modules/activities-management/store/activity-management.reducers';
import { projectReducer } from '../modules/customer-management/components/projects/components/store/project.reducer';
import { projectTypeReducer } from '../modules/customer-management/components/projects-type/store/project-type.reducers';
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

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: [{ user: ['groups'] }], rehydrate: true })(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [localStorageSyncReducer]
  : [localStorageSyncReducer];
