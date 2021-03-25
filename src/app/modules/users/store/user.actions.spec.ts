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

  it('GrantRoleUser type is UserActionTypes.GRANT_USER_ROLE', () => {
    const UserId = 'UserId';
    const RoleId = 'RoleId';
    const action = new actions.GrantRoleUser(UserId, RoleId);
    expect(action.type).toEqual(actions.UserActionTypes.GRANT_USER_ROLE);
  });

  it('GrantRoleUserSuccess type is UserActionTypes.GRANT_USER_ROLE_SUCCESS', () => {
    const payload: User = { id: 'id', email: 'email', name: 'name' };
    const action = new actions.GrantRoleUserSuccess(payload);
    expect(action.type).toEqual(actions.UserActionTypes.GRANT_USER_ROLE_SUCCESS);
  });

  it('GrantRoleUserFail type is UserActionTypes.GRANT_USER_ROLE_FAIL', () => {
    const action = new actions.GrantRoleUserFail('error');
    expect(action.type).toEqual(actions.UserActionTypes.GRANT_USER_ROLE_FAIL);
  });

  it('RevokeRoleUser type is UserActionTypes.REVOKE_USER_ROLE', () => {
    const UserId = 'UserId';
    const RoleId = 'RoleId';
    const action = new actions.RevokeRoleUser(UserId, RoleId);
    expect(action.type).toEqual(actions.UserActionTypes.REVOKE_USER_ROLE);
  });

  it('RevokeRoleUserSuccess type is UserActionTypes.REVOKE_USER_ROLE_SUCCESS', () => {
    const payload: User = { id: 'id', email: 'email', name: 'name' };
    const action = new actions.RevokeRoleUserSuccess(payload);
    expect(action.type).toEqual(actions.UserActionTypes.REVOKE_USER_ROLE_SUCCESS);
  });

  it('RevokeRoleUserFail type is UserActionTypes.REVOKE_USER_ROLE_FAIL', () => {
    const action = new actions.RevokeRoleUserFail('error');
    expect(action.type).toEqual(actions.UserActionTypes.REVOKE_USER_ROLE_FAIL);
  });

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
  it('AddGroupToUser type is UserActionTypes.ADD_GROUP_TO_USER', () => {
=======
  it('AddUserToGroup type is UserActionTypes.ADD_USER_TO_GROUP', () => {
>>>>>>> refactor: TT-188 refactor some names
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

  it('RemoveUserToGroup type is UserActionTypes.REMOVE_USER_TO_GROUP', () => {
    const userId = 'userId';
    const groupName = 'groupName';
    const action = new actions.RemoveUserToGroup(userId, groupName);

    expect(action.type).toEqual(actions.UserActionTypes.REMOVE_USER_TO_GROUP);
  });

  it('RemoveUserToGroupSuccess type is UserActionTypes.REMOVE_USER_TO_GROUP_SUCCESS', () => {
    const payload: User = { id: 'id', email: 'email', name: 'name' };
    const action = new actions.RemoveUserToGroupSuccess(payload);

    expect(action.type).toEqual(actions.UserActionTypes.REMOVE_USER_TO_GROUP_SUCCESS);
  });

  it('RemoveUserToGroupFail type is UserActionTypes.REMOVE_USER_TO_GROUP_FAIL', () => {
    const action = new actions.RemoveUserToGroupFail('error');

<<<<<<< HEAD
    expect(action.type).toEqual(actions.UserActionTypes.REMOVE_GROUP_TO_USER_FAIL);
>>>>>>> feat: TT-188 add ngrx flow & test
=======
    expect(action.type).toEqual(actions.UserActionTypes.REMOVE_USER_TO_GROUP_FAIL);
>>>>>>> refactor: TT-188 refactor some names
  });
});
