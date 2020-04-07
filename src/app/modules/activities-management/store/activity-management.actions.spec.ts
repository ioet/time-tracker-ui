import * as actions from './activity-management.actions';

describe('LoadActivitiesSuccess', () => {
  it('LoadActivitiesSuccess type is ActivityManagementActionTypes.LOAD_ACTIVITIES_SUCCESS', () => {
    const loadActivitiesSuccess = new actions.LoadActivitiesSuccess([]);
    expect(loadActivitiesSuccess.type).toEqual(actions.ActivityManagementActionTypes.LOAD_ACTIVITIES_SUCCESS);
  });

  it('LoadActivitiesFail type is ActivityManagementActionTypes.LOAD_ACTIVITIES_FAIL', () => {
    const loadActivitiesFail = new actions.LoadActivitiesFail('error');
    expect(loadActivitiesFail.type).toEqual(actions.ActivityManagementActionTypes.LOAD_ACTIVITIES_FAIL);
  });

  it('CreateActivitySuccess type is ActivityManagementActionTypes.CREATE_ACTIVITY_SUCCESS', () => {
    const createActivitySuccess = new actions.CreateActivitySuccess({
      id: '1',
      name: 'Training',
      description: 'It is good for learning',
    });
    expect(createActivitySuccess.type).toEqual(actions.ActivityManagementActionTypes.CREATE_ACTIVITY_SUCCESS);
  });

  it('CreateActivityFail type is ActivityManagementActionTypes.CREATE_ACTIVITY_FAIL', () => {
    const createActivityFail = new actions.CreateActivityFail('error');
    expect(createActivityFail.type).toEqual(actions.ActivityManagementActionTypes.CREATE_ACTIVITY_FAIL);
  });

  it('UpdateActivitySuccess type is ActivityManagementActionTypes.UPDATE_ACTIVITY_SUCCESS', () => {
    const updateActivitySuccess = new actions.UpdateActivitySuccess({
      id: '1',
      name: 'Training',
      description: 'test description',
    });
    expect(updateActivitySuccess.type).toEqual(actions.ActivityManagementActionTypes.UPDATE_ACTIVITY_SUCCESS);
  });

  it('UpdateActivityFail type is ActivityManagementActionTypes.UPDATE_ACTIVITY_FAIL', () => {
    const updateActivityFail = new actions.UpdateActivityFail('error');
    expect(updateActivityFail.type).toEqual(actions.ActivityManagementActionTypes.UPDATE_ACTIVITY_FAIL);
  });

  it('SetActivityToEdit type is ActivityManagementActionTypes.SET_ACTIVITY_ID_TO_EDIT', () => {
    const setActivityToEdit = new actions.SetActivityToEdit('123');
    expect(setActivityToEdit.type).toEqual(actions.ActivityManagementActionTypes.SET_ACTIVITY_ID_TO_EDIT);
  });

  it('ResetActivityToEdit type is ActivityManagementActionTypes.RESET_ACTIVITY_ID_TO_EDIT', () => {
    const resetActivityToEdit = new actions.ResetActivityToEdit();
    expect(resetActivityToEdit.type).toEqual(actions.ActivityManagementActionTypes.RESET_ACTIVITY_ID_TO_EDIT);
  });
});
