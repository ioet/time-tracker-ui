import { LoadActivitiesFail, DeleteActivity } from './activity-management.actions';
import { LoadActivitiesSuccess, ActivityManagementActionTypes } from './activity-management.actions';

describe('LoadActivitiesSuccess', () => {

  it('LoadActivitiesSuccess type is LOAD_ACTIVITIES_SUCCESS', () => {
    const loadActivitiesSuccess = new LoadActivitiesSuccess([]);
    expect(loadActivitiesSuccess.type).toEqual(ActivityManagementActionTypes.LOAD_ACTIVITIES_SUCCESS);
  });

  it('LoadActivitiesFail type is LOAD_ACTIVITIES_FAIL', () => {
    const loadActivitiesFail = new LoadActivitiesFail('error');
    expect(loadActivitiesFail.type).toEqual(ActivityManagementActionTypes.LOAD_ACTIVITIES_FAIL);
  });

  it('action DeleteActivity type is DELETE_ACTIVITY', () => {
    const action = new DeleteActivity('1');
    expect(action.type).toEqual(ActivityManagementActionTypes.DELETE_ACTIVITY);
  });

});
