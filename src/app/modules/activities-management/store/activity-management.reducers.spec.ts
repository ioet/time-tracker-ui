import { Activity } from './../../shared/models/activity.model';
import {
  LoadActivitiesFail,
  LoadActivities,
  CreateActivitySuccess,
  CreateActivityFail,
  CreateActivity,
  DeleteActivity,
  DeleteActivitySuccess,
} from './activity-management.actions';
import { LoadActivitiesSuccess } from './activity-management.actions';
import { activityManagementReducer, ActivityState } from './activity-management.reducers';
describe('activityManagementReducer', () => {
  const initialState: ActivityState = { data: [], isLoading: false, message: '' };

  it('on LoadActivities, isLoading is true', () => {
    const action = new LoadActivities();

    const state = activityManagementReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on LoadActivitiesSuccess, activitiesFound are saved in the store', () => {
    const activitiesFound: Activity[] = [{ id: '', name: '', description: '' }];
    const action = new LoadActivitiesSuccess(activitiesFound);

    const state = activityManagementReducer(initialState, action);

    expect(state.data).toEqual(activitiesFound);
  });

  it('on LoadActivitiesFail, message equal to Something went wrong fetching activities!', () => {
    const action = new LoadActivitiesFail('error');

    const state = activityManagementReducer(initialState, action);

    expect(state.message).toEqual('Something went wrong fetching activities!');
  });

  it('on CreateActivity, isLoading is true', () => {
    const activity: Activity = { id: '1', name: 'Training', description: 'It is good for learning' };
    const action = new CreateActivity(activity);

    const state = activityManagementReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on CreateActivitySuccess, activitiesFound are saved in the store', () => {
    const activity: Activity = { id: '1', name: 'Training', description: 'It is good for learning' };
    const action = new CreateActivitySuccess(activity);

    const state = activityManagementReducer(initialState, action);

    expect(state.data).toEqual([activity]);
    expect(state.isLoading).toEqual(false);
  });

  it('on CreateActivityFail, message equal to Something went wrong creating activities!', () => {
    const action = new CreateActivityFail('error');

    const state = activityManagementReducer(initialState, action);

    expect(state.message).toEqual('Something went wrong creating activities!');
    expect(state.isLoading).toEqual(false);
  });

  it('on DeleteActivity, message equal to Activity removed successfully!', () => {
    const activityToDeleteId = '1';
    const action = new DeleteActivity(activityToDeleteId);

    const state = activityManagementReducer(initialState, action);

    expect(state.message).toEqual('Activity removed successfully!');
  });
});
