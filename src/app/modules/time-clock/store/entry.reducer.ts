import { EntryActions, EntryActionTypes } from './entry.actions';
import { Entry, EntryRunning } from '../../shared/models';

export interface EntryState {
  entryList: Entry[];
  isLoading: boolean;
  message: string;
  entryRunningData: EntryRunning[];
}

export const initialState = {
  entryList: [],
  isLoading: false,
  message: '',
  entryRunningData: [],
};

export const entryReducer = (state: EntryState = initialState, action: EntryActions) => {
  switch (action.type) {
    case EntryActionTypes.CREATE_ENTRY: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case EntryActionTypes.CREATE_ENTRY_SUCCESS: {
      return {
        ...state,
        entryList: [...state.entryList, action.payload],
        isLoading: false,
        message: 'Entry Created',
      };
    }

    case EntryActionTypes.CREATE_ENTRY_FAIL: {
      return {
        entryList: [],
        isLoading: false,
        message: action.error,
      };
    }

    case EntryActionTypes.LOAD_TIME_ENTRIES_RUNNING: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case EntryActionTypes.LOAD_TIME_ENTRIES_RUNNING_SUCCESS: {
      return {
        ...state,
        entryRunningData: action.payload,
        isLoading: false,
      };
    }

    case EntryActionTypes.LOAD_TIME_ENTRIES_RUNNING_FAILED: {
      return {
        ...state,
        entryRunningData: [],
        isLoading: false,
      };
    }

    case EntryActionTypes.STOP_TIME_ENTRIES_RUNNING: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case EntryActionTypes.STOP_TIME_ENTRIES_RUNNING_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        message: 'Time-Entry saved successfully!',
      };
    }

    case EntryActionTypes.STOP_TIME_ENTRIES_RUNNING_FAILED: {
      return {
        ...state,
        isLoading: false,
        message: 'An error occurred saving Time-Entry!',
      };
    }

    default:
      return state;
  }
};
