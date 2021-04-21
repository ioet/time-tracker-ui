import { Activity, Status } from './../../shared/models/activity.model';
import * as actions from './activity-management.actions';
import { activityManagementReducer, ActivityState } from './activity-management.reducers';

describe('activityManagementReducer', () => {
  const initialState: ActivityState = { data: [], isLoading: false, message: '', activityIdToEdit: '' };
  const activity: Activity = { id: '1', name: 'Training', description: 'It is good for learning', status: 'inactive' };

  it('on LoadActivities, isLoading is true', () => {
    const action = new actions.LoadActivities();

    const state = activityManagementReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on LoadActivitiesSuccess, activitiesFound are saved in the store', () => {
    const activitiesFound: Activity[] = [{ id: '', name: '', description: '' }];
    const action = new actions.LoadActivitiesSuccess(activitiesFound);

    const state = activityManagementReducer(initialState, action);

    expect(state.data).toEqual(activitiesFound);
  });

  it('loading is false on LoadActivitiesFail', () => {
    const action = new actions.LoadActivitiesFail('error');

    const state = activityManagementReducer(initialState, action);

    expect(state.isLoading).toBeFalsy();
  });

  it('on CreateActivity, isLoading is true', () => {
    const action = new actions.CreateActivity(activity);

    const state = activityManagementReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on CreateActivitySuccess, activitiesFound are saved in the store', () => {
    const action = new actions.CreateActivitySuccess(activity);

    const state = activityManagementReducer(initialState, action);

    expect(state.data).toEqual([activity]);
    expect(state.isLoading).toEqual(false);
  });

  it('is Loading false on CreateActivityFail', () => {
    const action = new actions.CreateActivityFail('error');

    const state = activityManagementReducer(initialState, action);

    expect(state.isLoading).toEqual(false);
  });

  fit('on ArchiveActivity, isLoading is true', () => {
    const activityToDeleteId = '1';
    const action = new actions.ArchiveActivity(activityToDeleteId);

    const state = activityManagementReducer(initialState, action);
    expect(state.isLoading).toBeTrue();
  });

  fit('on ArchiveActivitySuccess, message equal to Activity archived successfully!', () => {
    const currentActivity = { ...activity };
    currentActivity.status = 'active';
    const currentState: ActivityState = { data: [currentActivity], isLoading: false, message: '', activityIdToEdit: '' };
    const activityArchived: Status = { id: '1', status: 'inactive' };
    const action = new actions.ArchiveActivitySuccess(activityArchived);
    const state = activityManagementReducer(currentState, action);

    expect(state.data).toEqual([activity]);
    expect(state.message).toEqual('Activity archived successfully!');
  });

  it('on ArchiveActivityFail, message equal to Something went wrong deleting activity!', () => {
    const activityToDeleteId = '1';
    const action = new actions.ArchiveActivityFail(activityToDeleteId);

    const state = activityManagementReducer(initialState, action);
    expect(state.isLoading).toEqual(false);
    expect(state.message).toEqual('Something went wrong deleting activity!');
  });

  it('on UpdateActivity, isLoading is true', () => {
    const action = new actions.UpdateActivity(activity);

    const state = activityManagementReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on UpdateActivitySuccess, activitiesFound are saved in the store', () => {
    const currentState: ActivityState = { data: [activity], isLoading: false, message: '', activityIdToEdit: '1' };
    const activityEdited: Activity = { id: '1', name: 'Test', description: 'edit test' };

    const action = new actions.UpdateActivitySuccess(activityEdited);

    const state = activityManagementReducer(currentState, action);

    expect(state.data).toEqual([activityEdited]);
    expect(state.isLoading).toEqual(false);
  });

  it('on UpdateActivityFail, message equal to Something went wrong creating activities!', () => {
    const action = new actions.UpdateActivityFail('error');

    const state = activityManagementReducer(initialState, action);

    expect(state.message).toEqual('Something went wrong updating activities!');
    expect(state.isLoading).toEqual(false);
  });


  fit('on UnarchiveActivity, isLoading is true', () => {
    const action = new actions.UnarchiveActivity('id_test');

    const state = activityManagementReducer(initialState, action);

    expect(state.isLoading).toBeTrue();
  });

  fit('on UnarchiveActivitySuccess, status activity is change to \"active\" in the store', () => {
    const currentState: ActivityState = { data: [activity], isLoading: false, message: '', activityIdToEdit: '1' };
    const activityEdited: Status = { id: '1', status: 'active' };
    const expectedActivity: Activity = { id: '1', name: 'Training', description: 'It is good for learning', status: 'active' };
    const action = new actions.UnarchiveActivitySuccess(activityEdited);
    const state = activityManagementReducer(currentState, action);

    expect(state.data).toEqual([expectedActivity]);
    expect(state.isLoading).toBeFalse();
  });

  fit('on UnarchiveActivityFail, message equal to \"Something went wrong unarchiving activities!\"', () => {
    const action = new actions.UnarchiveActivityFail('error');

    const state = activityManagementReducer(initialState, action);

    expect(state.message).toEqual('Something went wrong unarchiving activities!');
    expect(state.isLoading).toBeFalse();
  });

  it('on SetActivityToEdit, should save the activityId to edit', () => {
    const action = new actions.SetActivityToEdit(activity.id);

    const state = activityManagementReducer(initialState, action);

    expect(state.activityIdToEdit).toEqual('1');
  });

  it('on ResetActivityToEdit, should clean the activityIdToEdit variable', () => {
    const action = new actions.ResetActivityToEdit();

    const state = activityManagementReducer(initialState, action);

    expect(state.activityIdToEdit).toEqual('');
  });
});
