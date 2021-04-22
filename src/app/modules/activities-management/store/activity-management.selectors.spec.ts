import * as selectors from './activity-management.selectors';

describe('ActivityManagement Selectors', () => {

  it('reads activityIdtoEdit from state', () => {
    const activityId = 'id';
    const activityIdFound = selectors.activityIdToEdit.projector({ activityIdToEdit: activityId });
    expect(activityIdFound).toBe(activityId);
  });

  it('returns the activity with id that matches from the list', () => {
    const activityId = 'id';
    const activities = [{ id: 'id', name: 'abc', description: 'xxx' },
    { id: '2', name: 'xyz', description: 'yyy' }];
    const activityFound = selectors.getActivityById.projector(activities, activityId);
    expect(activityFound).toEqual(activities[0]);
  });

  it('should return all the data in the state when the selector allActivities is called', () => {
    const activities = [{ id: 'id', name: 'abc', description: 'xxx' },
    { id: '2', name: 'xyz', description: 'yyy' }];
    const activityState = { data: activities };

    expect(selectors.allActivities.projector(activityState)).toBe(activities);
  });

  it('should return all active data in the state when the selector allActiveActivities is called', () => {
    const activities = [{ id: 'id', name: 'abc', description: 'xxx', status: 'active' },
    { id: '2', name: 'xyz', description: 'yyy', status: 'inactive' },
    { id: '3', name: 'xyzw', description: 'www', status: 'active' }];
    const activityState = { data: activities };
    const filteredActivities = activities.filter((item) => item.status === 'active');

    expect(selectors.allActiveActivities.projector(activityState)).toEqual(filteredActivities);
  });

  it('should select isLoading when the selector getIsLoading is called', () => {
    const isLoadingValue = true;
    const activityState = { isLoading: isLoadingValue };

    expect(selectors.getIsLoading.projector(activityState)).toBe(isLoadingValue);
  });

});
