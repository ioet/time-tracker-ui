import { userReducer } from './user.reducer';
import { LoadUser, LoadUserFail, LoadUserSuccess } from './user.actions';
import { User } from '../models/user';

describe('userReducer', () => {
  const initState = {
    name: '',
    email: '',
    roles: [],
    groups: [],
  }

  it('on LoadUser, state equal to initState', () => {
    const userId = 'dummy_id_load';
    const action = new LoadUser(userId);
    const state = userReducer(initState, action);

    expect(state).toEqual(initState);
  });

  it('on LoadUserSuccess, userFound is saved in store', () => {
    const userFound: User = {
      name: 'Unknown Name',
      email: 'example@mail.com',
      roles: [],
      groups: [],
      id: 'dummy_id_load',
      tenant_id: null,
      deleted: null
    };

    const action = new LoadUserSuccess(userFound);
    const state = userReducer(initState, action);

    expect(state).toEqual(userFound);
  });

  it('on LoadUserFail, state equal to initState', () => {
    const action = new LoadUserFail('error');
    const state = userReducer(initState, action);

    expect(state).toEqual(initState);
  });
});
