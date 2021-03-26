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

<<<<<<< HEAD
<<<<<<< HEAD
    case UserActionTypes.ADD_USER_TO_GROUP: {
=======
    case UserActionTypes.ADD_GROUP_TO_USER: {
>>>>>>> feat: TT-188 add ngrx flow & test
=======
    case UserActionTypes.ADD_USER_TO_GROUP: {
>>>>>>> refactor: TT-188 refactor some names
      return {
        ...state,
        isLoading: true,
      };
    }
<<<<<<< HEAD
<<<<<<< HEAD
    case UserActionTypes.ADD_USER_TO_GROUP_SUCCESS: {
=======
    case UserActionTypes.ADD_GROUP_TO_USER_SUCCESS: {
>>>>>>> feat: TT-188 add ngrx flow & test
=======
    case UserActionTypes.ADD_USER_TO_GROUP_SUCCESS: {
>>>>>>> refactor: TT-188 refactor some names
      const index = userData.findIndex((user) => user.id === action.payload.id);
      userData[index] = action.payload;
      return {
        data: userData,
        isLoading: false,
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
        message: 'Add group to a user success',
=======
        message: 'Add user to group success',
>>>>>>> refactor: TT-188 refactor some names
      };
    }
    case UserActionTypes.ADD_USER_TO_GROUP_FAIL: {
      return {
        ...state,
        isLoading: false,
        message: 'Something went wrong adding user to group',
      };
    }

<<<<<<< HEAD
<<<<<<< HEAD
    case UserActionTypes.REMOVE_GROUP_TO_USER: {
>>>>>>> feat: TT-188 add ngrx flow & test
=======
    case UserActionTypes.REMOVE_USER_TO_GROUP: {
>>>>>>> refactor: TT-188 refactor some names
=======
    case UserActionTypes.REMOVE_USER_FROM_GROUP: {
>>>>>>> refactor: TT-188 refactor 'removeTo' to 'removeFrom'  references
      return {
        ...state,
        isLoading: true,
      };
    }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    case UserActionTypes.REMOVE_USER_FROM_GROUP_SUCCESS: {
=======
    case UserActionTypes.REMOVE_GROUP_TO_USER_SUCCESS: {
>>>>>>> feat: TT-188 add ngrx flow & test
=======
    case UserActionTypes.REMOVE_USER_TO_GROUP_SUCCESS: {
>>>>>>> refactor: TT-188 refactor some names
=======
    case UserActionTypes.REMOVE_USER_FROM_GROUP_SUCCESS: {
>>>>>>> refactor: TT-188 refactor 'removeTo' to 'removeFrom'  references
      const index = userData.findIndex((user) => user.id === action.payload.id);
      userData[index] = action.payload;
      return {
        data: userData,
        isLoading: false,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        message: 'Remove user from group success',
      };
    }
    case UserActionTypes.REMOVE_USER_FROM_GROUP_FAIL: {
      return {
        ...state,
        isLoading: false,
        message: 'Something went wrong removing user from group',
=======
        message: 'Remove group to a user success',
=======
        message: 'Remove user to group success',
>>>>>>> refactor: TT-188 refactor some names
=======
        message: 'Remove user from group success',
>>>>>>> refactor: TT-188 refactor 'removeTo' to 'removeFrom'  references
      };
    }
    case UserActionTypes.REMOVE_USER_FROM_GROUP_FAIL: {
      return {
        ...state,
        isLoading: false,
<<<<<<< HEAD
<<<<<<< HEAD
        message: 'Something went wrong removing group to a user',
>>>>>>> feat: TT-188 add ngrx flow & test
=======
        message: 'Something went wrong removing user to group',
>>>>>>> refactor: TT-188 refactor some names
=======
        message: 'Something went wrong removing user from group',
>>>>>>> refactor: TT-188 refactor 'removeTo' to 'removeFrom'  references
      };
    }
    default:
      return state;
  }
};
