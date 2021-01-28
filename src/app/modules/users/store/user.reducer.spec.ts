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

  it('on Default, ', () => {
    const action = new actions.DefaultUser();
    const state = userReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
