import { UserState, userReducer } from './user.reducers';
import { User } from '../models/users';
import * as actions from './user.actions';

describe('userReducer', () => {
  const initialState: UserState = { data: [], isLoading: false, message: '' };

  it('on LoadUser, isLoading is true', () => {
    const action = new actions.LoadUsers();
    const state = userReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on LoadUserSuccess, isLoading is false and state has data', () => {
    const data = [];
    const action = new actions.LoadUsersSuccess(data);
    const state = userReducer(initialState, action);

    expect(state.isLoading).toEqual(false);
    expect(state.data).toEqual(data);
  });

  it('on LoadUserFail, isLoading is false and state has empty data', () => {
    const action = new actions.LoadUsersFail('fail');
    const state = userReducer(initialState, action);

    expect(state.isLoading).toEqual(false);
    expect(state.data.length).toBe(0);
  });

  it('on GrantUserRole, isLoading is true', () => {
    const userId = 'userId';
    const roleId = 'roleId';
    const action = new actions.GrantRoleUser(userId, roleId);
    const state = userReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on GrantRoleUserSuccess, user roles should change', () => {
    const currentState: UserState = {
      data: [{ id: 'id', name: 'name', email: 'email', roles: null }],
      isLoading: false,
      message: '',
    };
    const userGranted: User = { id: 'id', name: 'name', email: 'email', roles: ['admin'] };
    const action = new actions.GrantRoleUserSuccess(userGranted);
    const state = userReducer(currentState, action);

    expect(state.data).toEqual([userGranted]);
    expect(state.isLoading).toEqual(false);
    expect(state.message).toEqual('Grant User Role Success');
  });

  it('on GrantRoleUserFail, should show a message with an error message', () => {
    const action = new actions.GrantRoleUserFail('error');
    const state = userReducer(initialState, action);

    expect(state.message).toEqual('Something went wrong granting user role');
    expect(state.isLoading).toEqual(false);
  });

  it('on RevokeUserRole, isLoading is true', () => {
    const userId = 'userId';
    const roleId = 'roleId';
    const action = new actions.RevokeRoleUser(userId, roleId);
    const state = userReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on RevokeRoleUserSuccess, user roles should change', () => {
    const currentState: UserState = {
      data: [{ id: 'id', name: 'name', email: 'email', roles: ['admin'] }],
      isLoading: false,
      message: '',
    };
    const userRevoked: User = { id: 'id', name: 'name', email: 'email', roles: null };
    const action = new actions.RevokeRoleUserSuccess(userRevoked);
    const state = userReducer(currentState, action);

    expect(state.data).toEqual([userRevoked]);
    expect(state.isLoading).toEqual(false);
    expect(state.message).toEqual('Revoke User Role Success');
  });

  it('on RevokeRoleUserFail, should show a message with an error message', () => {
    const action = new actions.RevokeRoleUserFail('error');
    const state = userReducer(initialState, action);

    expect(state.message).toEqual('Something went wrong revoking user role');
    expect(state.isLoading).toEqual(false);
  });

  it('on AddGroupToUser, isLoading is true', () => {
    const userId = 'userId';
    const groupName = 'groupName';
    const action = new actions.AddGroupToUser(userId, groupName);
    const state = userReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on AddGroupToUserSuccess, user groups should change', () => {
    const currentState: UserState = {
      data: [{ id: 'id', name: 'name', email: 'email', groups: null }],
      isLoading: false,
      message: '',
    };
    const userWithGroupAdded: User = { id: 'id', name: 'name', email: 'email', groups: ['group'] };
    const action = new actions.AddGroupToUserSuccess(userWithGroupAdded);
    const state = userReducer(currentState, action);

    expect(state.data).toEqual([userWithGroupAdded]);
    expect(state.isLoading).toEqual(false);
    expect(state.message).toEqual('Add group to a user success');
  });

  it('on AddGroupToUserFail, should show a message with an error message', () => {
    const action = new actions.AddGroupToUserFail('error');
    const state = userReducer(initialState, action);

    expect(state.message).toEqual('Something went wrong adding group to a user');
    expect(state.isLoading).toEqual(false);
  });

  it('on RemoveGroupToUser, isLoading is true', () => {
    const userId = 'userId';
    const groupName = 'groupName';
    const action = new actions.RemoveGroupToUser(userId, groupName);
    const state = userReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on RemoveGroupToUserSuccess, user groups should change', () => {
    const currentState: UserState = {
      data: [{ id: 'id', name: 'name', email: 'email', groups: ['group'] }],
      isLoading: false,
      message: '',
    };
    const userWithGroupRemoved: User = { id: 'id', name: 'name', email: 'email', groups: null };
    const action = new actions.RemoveGroupToUserSuccess(userWithGroupRemoved);
    const state = userReducer(currentState, action);

    expect(state.data).toEqual([userWithGroupRemoved]);
    expect(state.isLoading).toEqual(false);
    expect(state.message).toEqual('Remove group to a user success');
  });

  it('on RemoveGroupToUserFail, should show a message with an error message', () => {
    const action = new actions.RemoveGroupToUserFail('error');
    const state = userReducer(initialState, action);

    expect(state.message).toEqual('Something went wrong removing group to a user');
    expect(state.isLoading).toEqual(false);
  });

  it('on Default, ', () => {
    const action = new actions.DefaultUser();
    const state = userReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
