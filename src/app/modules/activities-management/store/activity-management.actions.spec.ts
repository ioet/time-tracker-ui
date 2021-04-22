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

  it('ArchiveActivity type is ActivityManagementActionTypes.ARCHIVE_ACTIVITY', () => {
    const archiveActivity = new actions.ArchiveActivity('id_test');
    expect(archiveActivity.type).toEqual(actions.ActivityManagementActionTypes.ARCHIVE_ACTIVITY);
  });

  it('ArchiveActivitySuccess type is ActivityManagementActionTypes.ARCHIVE_ACTIVITY_SUCCESS', () => {
    const archiveActivitySuccess = new actions.ArchiveActivitySuccess({
      id: 'id_test',
      status: 'inactive'
    });
    expect(archiveActivitySuccess.type).toEqual(actions.ActivityManagementActionTypes.ARCHIVE_ACTIVITY_SUCCESS);
  });

  it('ArchiveActivityFail type is ActivityManagementActionTypes.ARCHIVE_ACTIVITY_FAIL', () => {
    const archiveActivityFail = new actions.ArchiveActivityFail('error');
    expect(archiveActivityFail.type).toEqual(actions.ActivityManagementActionTypes.ARCHIVE_ACTIVITY_FAIL);
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

  it('UnarchiveActivity type is ActivityManagementActionTypes.UNARCHIVE_ACTIVITY', () => {
    const unarchiveActivity = new actions.UnarchiveActivity('id_test');
    expect(unarchiveActivity.type).toEqual(actions.ActivityManagementActionTypes.UNARCHIVE_ACTIVITY);
  });

  it('UnarchiveActivitySuccess type is ActivityManagementActionTypes.UNARCHIVE_ACTIVITY_SUCCESS', () => {
    const unarchiveActivitySuccess = new actions.UnarchiveActivitySuccess({
      id: 'id_test',
      status: 'active'
    });
    expect(unarchiveActivitySuccess.type).toEqual(actions.ActivityManagementActionTypes.UNARCHIVE_ACTIVITY_SUCCESS);
  });

  it('UnarchiveActivityFail type is ActivityManagementActionTypes.UNARCHIVE_ACTIVITY_FAIL', () => {
    const unarchiveActivityFail = new actions.UnarchiveActivityFail('error');
    expect(unarchiveActivityFail.type).toEqual(actions.ActivityManagementActionTypes.UNARCHIVE_ACTIVITY_FAIL);
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
