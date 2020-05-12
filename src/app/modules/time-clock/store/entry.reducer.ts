import { EntryActions, EntryActionTypes } from './entry.actions';
import { Entry } from '../../shared/models';

export interface EntryState {
  active: Entry;
  entryList: Entry[];
  isLoading: boolean;
  message: string;
  createError: boolean;
  updateError: boolean;
}

export const initialState = {
  active: null,
  entryList: [],
  isLoading: false,
  message: '',
  createError: null,
  updateError: null
};

export const entryReducer = (state: EntryState = initialState, action: EntryActions) => {
  switch (action.type) {
    case EntryActionTypes.LOAD_ACTIVE_ENTRY: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case EntryActionTypes.LOAD_ACTIVE_ENTRY_SUCCESS:
      return {
        ...state,
        active: action.payload,
        isLoading: false,
      };

    case EntryActionTypes.LOAD_ACTIVE_ENTRY_FAIL: {
      return {
        ...state,
        active: null,
        isLoading: false,
        message: 'Something went wrong fetching active entry!',
      };
    }

    case EntryActionTypes.LOAD_ENTRIES: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case EntryActionTypes.LOAD_ENTRIES_SUCCESS:
      return {
        ...state,
        entryList: action.payload,
        isLoading: false,
      };

    case EntryActionTypes.LOAD_ACTIVE_ENTRY_FAIL: {
      return {
        ...state,
        entryList: [],
        isLoading: false,
        message: 'Something went wrong fetching entries!',
      };
    }

    case EntryActionTypes.CREATE_ENTRY: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case EntryActionTypes.CREATE_ENTRY_SUCCESS: {
      return {
        ...state,
        active: action.payload,
        entryList: [action.payload, ...state.entryList],
        isLoading: false,
        createError: false,
        message: 'You clocked-in successfully',
      };
    }

    case EntryActionTypes.CREATE_ENTRY_FAIL: {
      return {
        ...state,
        isLoading: false,
        message: action.error,
        createError: true
      };
    }

    case EntryActionTypes.DELETE_ENTRY: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case EntryActionTypes.DELETE_ENTRY_SUCCESS: {
      const entryList = state.entryList.filter((entry) => entry.id !== action.entryId);
      return {
        ...state,
        entryList,
        isLoading: false,
        message: 'ProjectType removed successfully!',
      };
    }

    case EntryActionTypes.DELETE_ENTRY_FAIL: {
      return {
        ...state,
        entryList: [],
        isLoading: false,
        message: 'Something went wrong deleting entry!',
      };
    }

    case EntryActionTypes.UPDATE_ACTIVE_ENTRY: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case EntryActionTypes.UPDATE_ACTIVE_ENTRY_SUCCESS: {
      const entryList = [...state.entryList];
      const index = entryList.findIndex((entry) => entry.id === action.payload.id);
      entryList[index] = action.payload;
      return {
        ...state,
        entryList,
        isLoading: false,
        updateError: false,
      };
    }

    case EntryActionTypes.UPDATE_ACTIVE_ENTRY_FAIL: {
      return {
        ...state,
        active: null,
        isLoading: false,
        updateError: true
      };
    }

    case EntryActionTypes.STOP_TIME_ENTRY_RUNNING: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case EntryActionTypes.STOP_TIME_ENTRY_RUNNING_SUCCESS: {
      return {
        ...state,
        active: null,
        isLoading: false,
        message: 'You clocked-out successfully',
      };
    }

    case EntryActionTypes.STOP_TIME_ENTRY_RUNNING_FAILED: {
      return {
        ...state,
        isLoading: false,
        message: 'An unexpected error happened, try again later',
      };
    }

    case EntryActionTypes.CLEAN_ENTRY_CREATE_ERROR: {
      return {
        ...state,
       createError: null
      };
    }

    case EntryActionTypes.CLEAN_ENTRY_UPDATE_ERROR: {
      return {
        ...state,
       updateError: null
      };
    }

    default: {
      return state;
    }
  }
};
