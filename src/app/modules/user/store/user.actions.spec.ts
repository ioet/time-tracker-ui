import { LoadUserFail, LoadUserSuccess, UserActionTypes } from './user.actions';

import { User } from '../models/user';

describe('Actions for User', () => {
  it('LoadUserSuccess type is UserActionTypes.LOAD_USER_SUCCESS', () => {
    const user: User = {
      name: 'Unknown Name',
      email: 'example@mail.com',
      roles: [],
      groups: [],
      id: 'dummy_id_load',
      tenant_id: 'dummy_tenant_id_load',
      deleted: ''
    };

    const loadUserSuccess = new LoadUserSuccess(user);

    expect(loadUserSuccess.type).toEqual(UserActionTypes.LOAD_USER_SUCCESS);
  });

  it('LoadUserFail type is UserActionTypes.LOAD_USER_FAIL', () => {
    const loadUserFail = new LoadUserFail('error');

    expect(loadUserFail.type).toEqual(UserActionTypes.LOAD_USER_FAIL);
  });

});
