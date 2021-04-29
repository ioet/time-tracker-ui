import { UserActions, UserActionTypes } from './user.actions';
import { User } from '../models/users';

export interface UserState {
  data: User[];
  isLoading: boolean;
  message: string;
}

export const initialState: UserState = {
  data: [],
  isLoading: false,
  message: '',
};

export const userReducer = (state: UserState = initialState, action: UserActions) => {
  const userData = [...state.data];
  switch (action.type) {
    case UserActionTypes.LOAD_USERS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserActionTypes.LOAD_USERS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    }
    case UserActionTypes.LOAD_USERS_FAIL: {
      return {
        ...state,
        data: [],
        isLoading: false,
        message: action.error,
      };
    }
    case UserActionTypes.ADD_USER_TO_GROUP: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserActionTypes.ADD_USER_TO_GROUP_SUCCESS: {
      const index = userData.findIndex((user) => user.id === action.payload.id);
      userData[index] = action.payload;
      return {
        data: userData,
        isLoading: false,
        message: 'Add user to group success',
      };
    }
    case UserActionTypes.ADD_USER_TO_GROUP_FAIL: {
      return {
        ...state,
        isLoading: false,
        message: 'Something went wrong adding user to group',
      };
    }

    case UserActionTypes.REMOVE_USER_FROM_GROUP: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserActionTypes.REMOVE_USER_FROM_GROUP_SUCCESS: {
      const index = userData.findIndex((user) => user.id === action.payload.id);
      userData[index] = action.payload;
      return {
        data: userData,
        isLoading: false,
        message: 'Remove user from group success',
      };
    }
    case UserActionTypes.REMOVE_USER_FROM_GROUP_FAIL: {
      return {
        ...state,
        isLoading: false,
        message: 'Something went wrong removing user from group',
      };
    }
    default:
      return state;
  }
};
