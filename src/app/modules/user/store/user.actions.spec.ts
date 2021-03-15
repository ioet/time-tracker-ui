import { LoadUserFail, LoadUserSuccess, UserActionTypes } from './user.actions';

import { User } from '../models/user';

describe('Actions for User', () => {
  it('LoadUserSuccess type is UserActionTypes.LOAD_USER_SUCCESS', () => {
    const user: User = {
      name: 'Jerson Morocho',
      email: 'jerson.morocho@ioet.com',
      roles: [],
      groups: [],
      id: 'dd4a1571-b025-41c9-b35f-810841b43134',
      tenant_id: 'cc925a5d-9644-4a4f-8d99-0bee49aadd05',
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
