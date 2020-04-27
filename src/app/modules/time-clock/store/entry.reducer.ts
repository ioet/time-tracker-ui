import { EntryActions, EntryActionTypes } from './entry.actions';
import { Entry, NewEntry } from '../../shared/models';

export interface EntryState {
  active: NewEntry;
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

    default:
      return state;
  }
};
