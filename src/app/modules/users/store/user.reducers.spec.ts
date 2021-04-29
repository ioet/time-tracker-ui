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

  it('on AddUserToGroup, isLoading is true', () => {
    const userId = 'userId';
    const groupName = 'groupName';
    const action = new actions.AddUserToGroup(userId, groupName);
    const state = userReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on AddUserToGroupSuccess, user groups should change', () => {
    const currentState: UserState = {
      data: [{ id: 'id', name: 'name', email: 'email', groups: null }],
      isLoading: false,
      message: '',
    };
    const userWithGroupAdded: User = { id: 'id', name: 'name', email: 'email', groups: ['group'] };
    const action = new actions.AddUserToGroupSuccess(userWithGroupAdded);
    const state = userReducer(currentState, action);

    expect(state.data).toEqual([userWithGroupAdded]);
    expect(state.isLoading).toEqual(false);
    expect(state.message).toEqual('Add user to group success');
  });

  it('on AddUserToGroupFail, should show a message with an error message', () => {
    const action = new actions.AddUserToGroupFail('error');
    const state = userReducer(initialState, action);

    expect(state.message).toEqual('Something went wrong adding user to group');
    expect(state.isLoading).toEqual(false);
  });

  it('on RemoveUserFromGroup, isLoading is true', () => {
    const userId = 'userId';
    const groupName = 'groupName';
    const action = new actions.RemoveUserFromGroup(userId, groupName);
    const state = userReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on RemoveUserFromGroupSuccess, user groups should change', () => {
    const currentState: UserState = {
      data: [{ id: 'id', name: 'name', email: 'email', groups: ['group'] }],
      isLoading: false,
      message: '',
    };
    const userWithGroupRemoved: User = { id: 'id', name: 'name', email: 'email', groups: null };
    const action = new actions.RemoveUserFromGroupSuccess(userWithGroupRemoved);
    const state = userReducer(currentState, action);

    expect(state.data).toEqual([userWithGroupRemoved]);
    expect(state.isLoading).toEqual(false);
    expect(state.message).toEqual('Remove user from group success');
  });

  it('on RemoveUserFromGroupFail, should show a message with an error message', () => {
    const action = new actions.RemoveUserFromGroupFail('error');
    const state = userReducer(initialState, action);

    expect(state.message).toEqual('Something went wrong removing user from group');
    expect(state.isLoading).toEqual(false);
  });

  it('on Default, ', () => {
    const action = new actions.DefaultUser();
    const state = userReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
