import { EntryActions, EntryActionTypes } from './entry.actions';
import { Entry } from '../../shared/models';

export interface EntryState {
  active: Entry;
  entryList: Entry[];
  isLoading: boolean;
  message: string;
}

export const initialState = {
  active: null,
  entryList: [],
  isLoading: false,
  message: '',
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
        entryList: [...state.entryList, action.payload],
        isLoading: false,
        message: 'Entry Created',
      };
    }

    case EntryActionTypes.CREATE_ENTRY_FAIL: {
      return {
        ...state,
        entryList: [],
        isLoading: false,
        message: action.error,
      };
    }

    case EntryActionTypes.UDPATE_ACTIVE_ENTRY: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case EntryActionTypes.UDPATE_ACTIVE_ENTRY_SUCCESS: {
      const activeEntry = { ...state.active, ...action.payload };

      return {
        ...state,
        active: activeEntry,
        isLoading: false,
      };
    }

    case EntryActionTypes.UDPATE_ACTIVE_ENTRY_FAIL: {
      return {
        ...state,
        active: null,
        isLoading: false,
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
        message: 'You just clocked-out successfully',
      };
    }

    case EntryActionTypes.STOP_TIME_ENTRY_RUNNING_FAILED: {
      return {
        ...state,
        isLoading: false,
        message: 'An unexpected error happened, try again later',
      };
    }
  }
};
