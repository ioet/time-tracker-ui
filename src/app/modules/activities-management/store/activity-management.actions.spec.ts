import { LoadActivitiesFail } from './activity-management.actions';
import { LoadActivitiesSuccess, ActivityManagementActionTypes } from './activity-management.actions';

describe('LoadActivitiesSuccess', () => {

  it('LoadActivitiesSuccess type is ActivityManagementActionTypes.LoadActivitiesSuccess', () => {
    const loadActivitiesSuccess = new LoadActivitiesSuccess([]);
    expect(loadActivitiesSuccess.type).toEqual(ActivityManagementActionTypes.LoadActivitiesSuccess);
  });

  it('LoadActivitiesFail type is ActivityManagementActionTypes.LoadActivitiesFail', () => {
    const loadActivitiesFail = new LoadActivitiesFail('error');
    expect(loadActivitiesFail.type).toEqual(ActivityManagementActionTypes.LoadActivitiesFail);
  });

});
