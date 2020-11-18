import * as actions from './user.actions';

describe('UserActions', () => {
  it('LoadUsers type is UserActionTypes.LOAD_USERS', () => {
    const action = new actions.LoadUsers();
    expect(action.type).toEqual(actions.UserActionTypes.LOAD_USERS);
  });

  it('LoadUsersSuccess type is UserActionTypes.LOAD_USERS_SUCCESS', () => {
    const action = new actions.LoadUsersSuccess([]);
    expect(action.type).toEqual(actions.UserActionTypes.LOAD_USERS_SUCCESS);
  });

  it('LoadUsersFail type is UserActionTypes.LOAD_USERS_FAIL', () => {
    const action = new actions.LoadUsersFail('error');
    expect(action.type).toEqual(actions.UserActionTypes.LOAD_USERS_FAIL);
  });
});
