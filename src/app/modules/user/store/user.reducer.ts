import { UserActions, UserActionTypes } from './user.actions';

export const initialState = {
  name: '',
  email: '',
  roles: [],
  groups: [],
};

export const userReducer = (state: any = initialState, action: UserActions): any => {
  switch (action.type) {
    case UserActionTypes.LOAD_USER:
      return state;
    case UserActionTypes.LOAD_USER_SUCCESS:
      return action.payload;
    case UserActionTypes.LOAD_USER_FAIL:
      return state;
    default: {
      return state;
    }
  }
};
