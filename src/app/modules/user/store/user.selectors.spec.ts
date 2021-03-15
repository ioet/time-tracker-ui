import { getUserInfo } from './user.selectors';
import { User } from '../models/user';

describe('UserSelectors', () => {
  const userInfo: User = {
      name: 'Jerson Morocho',
      email: 'jerson.morocho@ioet.com',
      roles: [],
      groups: [],
      id: 'cc925a5d-9644-4a4f-8d99-0bee49aadd05',
      tenant_id: null,
      deleted: null
    };

  it('should select user info', () => {
    const result = getUserInfo.projector(userInfo);

    expect(userInfo.email).toEqual('jerson.morocho@ioet.com');
  });

});
