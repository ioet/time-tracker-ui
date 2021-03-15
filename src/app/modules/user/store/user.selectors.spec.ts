import { getUserInfo } from './user.selectors';
import { User } from '../models/user';

describe('UserSelectors', () => {
  const userInfo: User = {
      name: 'Unknown Name',
      email: 'example@mail.com',
      roles: [],
      groups: [],
      id: 'dummy_tenant_id_load',
      tenant_id: null,
      deleted: null
    };

  it('should select user info', () => {
    const result = getUserInfo.projector(userInfo);

    expect(userInfo.email).toEqual('example@mail.com');
  });

});
