import { getUserGroups, getUserInfo } from './user.selectors';
import { User } from '../models/user';

describe('UserSelectors', () => {
  const userState: User = {
    name: 'Unknown Name',
    email: 'example@mail.com',
    roles: [],
    groups: [],
    id: 'dummy_tenant_id_load',
    tenant_id: null,
    deleted: null,
  };

  it('should select user from store', () => {
    expect(getUserInfo.projector(userState)).toEqual(userState);
  });

  it('should select user groups from store', () => {
    expect(getUserGroups.projector(userState)).toEqual(userState.groups);
  });
});
