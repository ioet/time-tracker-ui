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

<<<<<<< HEAD
<<<<<<< HEAD
  it('on AddUserToGroup, isLoading is true', () => {
    const userId = 'userId';
    const groupName = 'groupName';
    const action = new actions.AddUserToGroup(userId, groupName);
=======
  it('on AddGroupToUser, isLoading is true', () => {
    const userId = 'userId';
    const groupName = 'groupName';
    const action = new actions.AddGroupToUser(userId, groupName);
>>>>>>> feat: TT-188 add ngrx flow & test
=======
  it('on AddUserToGroup, isLoading is true', () => {
    const userId = 'userId';
    const groupName = 'groupName';
    const action = new actions.AddUserToGroup(userId, groupName);
>>>>>>> refactor: TT-188 refactor some names
    const state = userReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

<<<<<<< HEAD
<<<<<<< HEAD
  it('on AddUserToGroupSuccess, user groups should change', () => {
=======
  it('on AddGroupToUserSuccess, user groups should change', () => {
>>>>>>> feat: TT-188 add ngrx flow & test
=======
  it('on AddUserToGroupSuccess, user groups should change', () => {
>>>>>>> refactor: TT-188 refactor some names
    const currentState: UserState = {
      data: [{ id: 'id', name: 'name', email: 'email', groups: null }],
      isLoading: false,
      message: '',
    };
    const userWithGroupAdded: User = { id: 'id', name: 'name', email: 'email', groups: ['group'] };
<<<<<<< HEAD
<<<<<<< HEAD
    const action = new actions.AddUserToGroupSuccess(userWithGroupAdded);
=======
    const action = new actions.AddGroupToUserSuccess(userWithGroupAdded);
>>>>>>> feat: TT-188 add ngrx flow & test
=======
    const action = new actions.AddUserToGroupSuccess(userWithGroupAdded);
>>>>>>> refactor: TT-188 refactor some names
    const state = userReducer(currentState, action);

    expect(state.data).toEqual([userWithGroupAdded]);
    expect(state.isLoading).toEqual(false);
<<<<<<< HEAD
<<<<<<< HEAD
    expect(state.message).toEqual('Add user to group success');
  });

  it('on AddUserToGroupFail, should show a message with an error message', () => {
    const action = new actions.AddUserToGroupFail('error');
    const state = userReducer(initialState, action);

    expect(state.message).toEqual('Something went wrong adding user to group');
    expect(state.isLoading).toEqual(false);
  });

  it('on RemoveUserFromGroup, isLoading is true', () => {
<<<<<<< HEAD
    const userId = 'userId';
    const groupName = 'groupName';
    const action = new actions.RemoveUserFromGroup(userId, groupName);
=======
    expect(state.message).toEqual('Add group to a user success');
=======
    expect(state.message).toEqual('Add user to group success');
>>>>>>> refactor: TT-188 refactor some names
  });

  it('on AddUserToGroupFail, should show a message with an error message', () => {
    const action = new actions.AddUserToGroupFail('error');
    const state = userReducer(initialState, action);

    expect(state.message).toEqual('Something went wrong adding user to group');
    expect(state.isLoading).toEqual(false);
  });

  it('on RemoveUserToGroup, isLoading is true', () => {
    const userId = 'userId';
    const groupName = 'groupName';
<<<<<<< HEAD
    const action = new actions.RemoveGroupToUser(userId, groupName);
>>>>>>> feat: TT-188 add ngrx flow & test
=======
    const action = new actions.RemoveUserToGroup(userId, groupName);
>>>>>>> refactor: TT-188 refactor some names
=======
    const userId = 'userId';
    const groupName = 'groupName';
    const action = new actions.RemoveUserFromGroup(userId, groupName);
>>>>>>> refactor: TT-188 refactor 'removeTo' to 'removeFrom'  references
    const state = userReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  it('on RemoveUserFromGroupSuccess, user groups should change', () => {
=======
  it('on RemoveGroupToUserSuccess, user groups should change', () => {
>>>>>>> feat: TT-188 add ngrx flow & test
=======
  it('on RemoveUserToGroupSuccess, user groups should change', () => {
>>>>>>> refactor: TT-188 refactor some names
=======
  it('on RemoveUserFromGroupSuccess, user groups should change', () => {
>>>>>>> refactor: TT-188 refactor 'removeTo' to 'removeFrom'  references
    const currentState: UserState = {
      data: [{ id: 'id', name: 'name', email: 'email', groups: ['group'] }],
      isLoading: false,
      message: '',
    };
    const userWithGroupRemoved: User = { id: 'id', name: 'name', email: 'email', groups: null };
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    const action = new actions.RemoveUserFromGroupSuccess(userWithGroupRemoved);
=======
    const action = new actions.RemoveGroupToUserSuccess(userWithGroupRemoved);
>>>>>>> feat: TT-188 add ngrx flow & test
=======
    const action = new actions.RemoveUserToGroupSuccess(userWithGroupRemoved);
>>>>>>> refactor: TT-188 refactor some names
=======
    const action = new actions.RemoveUserFromGroupSuccess(userWithGroupRemoved);
>>>>>>> refactor: TT-188 refactor 'removeTo' to 'removeFrom'  references
    const state = userReducer(currentState, action);

    expect(state.data).toEqual([userWithGroupRemoved]);
    expect(state.isLoading).toEqual(false);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    expect(state.message).toEqual('Remove user from group success');
  });

  it('on RemoveUserFromGroupFail, should show a message with an error message', () => {
    const action = new actions.RemoveUserFromGroupFail('error');
    const state = userReducer(initialState, action);

    expect(state.message).toEqual('Something went wrong removing user from group');
=======
    expect(state.message).toEqual('Remove group to a user success');
=======
    expect(state.message).toEqual('Remove user to group success');
>>>>>>> refactor: TT-188 refactor some names
=======
    expect(state.message).toEqual('Remove user from group success');
>>>>>>> refactor: TT-188 refactor 'removeTo' to 'removeFrom'  references
  });

  it('on RemoveUserFromGroupFail, should show a message with an error message', () => {
    const action = new actions.RemoveUserFromGroupFail('error');
    const state = userReducer(initialState, action);

<<<<<<< HEAD
<<<<<<< HEAD
    expect(state.message).toEqual('Something went wrong removing group to a user');
>>>>>>> feat: TT-188 add ngrx flow & test
=======
    expect(state.message).toEqual('Something went wrong removing user to group');
>>>>>>> refactor: TT-188 refactor some names
=======
    expect(state.message).toEqual('Something went wrong removing user from group');
>>>>>>> refactor: TT-188 refactor 'removeTo' to 'removeFrom'  references
    expect(state.isLoading).toEqual(false);
  });

  it('on Default, ', () => {
    const action = new actions.DefaultUser();
    const state = userReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
