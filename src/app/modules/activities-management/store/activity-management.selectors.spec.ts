import * as selectors from './activity-management.selectors';

describe('ActivityManagement Selectors', () => {

  it('reads activityIdtoEdit from state', () => {
    const activityId = 'id';
    const activityIdFound = selectors.activityIdtoEdit.projector({ activityIdToEdit: activityId });
    expect(activityIdFound).toBe(activityId);
  });

  it('returns the activity with id that matches from the list', () => {
    const activityId = 'id';
    const activities = [{id: 'id', name: 'abc', description: 'xxx'},
      {id: '2', name: 'xyz', description: 'yyy'}];
    const activityFound = selectors.getActivityById.projector(activities, activityId);
    expect(activityFound).toEqual(activities[0]);
  });

});
