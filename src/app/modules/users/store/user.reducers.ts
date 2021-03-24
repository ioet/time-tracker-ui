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

    case UserActionTypes.GRANT_USER_ROLE: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserActionTypes.GRANT_USER_ROLE_SUCCESS: {
      const index = userData.findIndex((user) => user.id === action.payload.id);
      userData[index] = action.payload;
      return {
        ...state,
        data: userData,
        isLoading: false,
        message: 'Grant User Role Success',
      };
    }
    case UserActionTypes.GRANT_USER_ROLE_FAIL: {
      return {
        ...state,
        data: state.data,
        isLoading: false,
        message: 'Something went wrong granting user role',
      };
    }

    case UserActionTypes.REVOKE_USER_ROLE: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserActionTypes.REVOKE_USER_ROLE_SUCCESS: {
      const index = userData.findIndex((user) => user.id === action.payload.id);
      userData[index] = action.payload;
      return {
        ...state,
        data: userData,
        isLoading: false,
        message: 'Revoke User Role Success',
      };
    }
    case UserActionTypes.REVOKE_USER_ROLE_FAIL: {
      return {
        ...state,
        data: state.data,
        isLoading: false,
        message: 'Something went wrong revoking user role',
      };
    }

    case UserActionTypes.ADD_GROUP_TO_USER: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserActionTypes.ADD_GROUP_TO_USER_SUCCESS: {
      const index = userData.findIndex((user) => user.id === action.payload.id);
      userData[index] = action.payload;
      return {
        data: userData,
        isLoading: false,
        message: 'Add group to a user success',
      };
    }
    case UserActionTypes.ADD_GROUP_TO_USER_FAIL: {
      return {
        ...state,
        isLoading: false,
        message: 'Something went wrong adding group to a user',
      };
    }

    case UserActionTypes.REMOVE_GROUP_TO_USER: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserActionTypes.REMOVE_GROUP_TO_USER_SUCCESS: {
      const index = userData.findIndex((user) => user.id === action.payload.id);
      userData[index] = action.payload;
      return {
        data: userData,
        isLoading: false,
        message: 'Remove group to a user success',
      };
    }
    case UserActionTypes.REMOVE_GROUP_TO_USER_FAIL: {
      return {
        ...state,
        isLoading: false,
        message: 'Something went wrong removing group to a user',
      };
    }
    default:
      return state;
  }
};
