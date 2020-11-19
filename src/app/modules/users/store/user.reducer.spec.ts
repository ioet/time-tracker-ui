import { UserState, userReducer } from './user.reducers';
import * as actions from './user.actions';

describe('userReducer', () => {
  const initialState: UserState = { data: [], isLoading: false, message: '' };

  it('on LoadUser, isLoading is true', () => {
    const action = new actions.LoadUsers();
    const state = userReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on LoadUserSucess, isLoading is false and state has data', () => {
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
});
