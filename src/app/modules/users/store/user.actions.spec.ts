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
});
