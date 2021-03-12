import { UserActions, UserActionTypes } from './user.actions';

export const initialState = {
  name: '',
  groups: [],
};

export const userReducer = (state: any = initialState, action: UserActions): any => {
  switch (action.type) {
    case UserActionTypes.LOAD_USER:
      return state;
    case UserActionTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        groups: action.payload.groups,
      };
    case UserActionTypes.LOAD_USER_FAIL:
      return state;
    default: {
      return state;
    }
  }
};
