import * as actions from './user.actions';
import { User } from '../models/users';

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

  it('AddUserToGroup type is UserActionTypes.ADD_USER_TO_GROUP', () => {
    const userId = 'userId';
    const groupName = 'groupName';
    const action = new actions.AddUserToGroup(userId, groupName);

    expect(action.type).toEqual(actions.UserActionTypes.ADD_USER_TO_GROUP);
  });

  it('AddUserToGroupSuccess type is UserActionTypes.ADD_USER_TO_GROUP_SUCCESS', () => {
    const payload: User = { id: 'id', email: 'email', name: 'name' };
    const action = new actions.AddUserToGroupSuccess(payload);

    expect(action.type).toEqual(actions.UserActionTypes.ADD_USER_TO_GROUP_SUCCESS);
  });

  it('AddUserToGroupFail type is UserActionTypes.ADD_USER_TO_GROUP_FAIL', () => {
    const action = new actions.AddUserToGroupFail('error');

    expect(action.type).toEqual(actions.UserActionTypes.ADD_USER_TO_GROUP_FAIL);
  });

  it('RemoveUserFromGroup type is UserActionTypes.REMOVE_USER_FROM_GROUP', () => {
    const userId = 'userId';
    const groupName = 'groupName';
    const action = new actions.RemoveUserFromGroup(userId, groupName);

    expect(action.type).toEqual(actions.UserActionTypes.REMOVE_USER_FROM_GROUP);
  });

  it('RemoveUserFromGroupSuccess type is UserActionTypes.REMOVE_USER_FROM_GROUP_SUCCESS', () => {
    const payload: User = { id: 'id', email: 'email', name: 'name' };
    const action = new actions.RemoveUserFromGroupSuccess(payload);

    expect(action.type).toEqual(actions.UserActionTypes.REMOVE_USER_FROM_GROUP_SUCCESS);
  });

  it('RemoveUserFromGroupFail type is UserActionTypes.REMOVE_USER_FROM_GROUP_FAIL', () => {
    const action = new actions.RemoveUserFromGroupFail('error');

    expect(action.type).toEqual(actions.UserActionTypes.REMOVE_USER_FROM_GROUP_FAIL);
  });
});
