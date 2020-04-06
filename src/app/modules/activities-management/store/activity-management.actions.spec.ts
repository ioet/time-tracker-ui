import { LoadActivitiesFail, CreateActivitySuccess, CreateActivityFail } from './activity-management.actions';
import { LoadActivitiesSuccess, ActivityManagementActionTypes } from './activity-management.actions';

describe('LoadActivitiesSuccess', () => {
  it('LoadActivitiesSuccess type is ActivityManagementActionTypes.LOAD_ACTIVITIES_SUCCESS', () => {
    const loadActivitiesSuccess = new LoadActivitiesSuccess([]);
    expect(loadActivitiesSuccess.type).toEqual(ActivityManagementActionTypes.LOAD_ACTIVITIES_SUCCESS);
  });

  it('LoadActivitiesFail type is ActivityManagementActionTypes.LOAD_ACTIVITIES_FAIL', () => {
    const loadActivitiesFail = new LoadActivitiesFail('error');
    expect(loadActivitiesFail.type).toEqual(ActivityManagementActionTypes.LOAD_ACTIVITIES_FAIL);
  });

  it('CreateActivitySuccess type is ActivityManagementActionTypes.CREATE_ACTIVITY_SUCCESS', () => {
    const createActivitySuccess = new CreateActivitySuccess({
      id: '1',
      name: 'Training',
      description: 'It is good for learning',
    });
    expect(createActivitySuccess.type).toEqual(ActivityManagementActionTypes.CREATE_ACTIVITY_SUCCESS);
  });

  it('CreateActivityFail type is ActivityManagementActionTypes.CREATE_ACTIVITY_FAIL', () => {
    const createActivityFail = new CreateActivityFail('error');
    expect(createActivityFail.type).toEqual(ActivityManagementActionTypes.CREATE_ACTIVITY_FAIL);
  });
});
