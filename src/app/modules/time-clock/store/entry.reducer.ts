import { EntryActions, EntryActionTypes } from './entry.actions';
import { Entry } from '../../shared/models';

export interface EntryState {
  entryList: Entry[];
  isLoading: boolean;
  message: string;
}

export const initialState = {
  entryList: [],
  isLoading: false,
  message: '',
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

    default:
      return state;
  }
};
