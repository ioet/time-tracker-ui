import { Entry } from '../../shared/models';
import { DataSource } from '../../shared/models/data-source.model';
import { TimeDetails, TimeEntriesSummary } from '../models/time.entry.summary';
import { EntryActions, EntryActionTypes } from './entry.actions';

export interface EntryState {
  active: Entry;
  isLoading: boolean;
  message: string;
  createError: boolean;
  updateError: boolean;
  timeEntriesSummary: TimeEntriesSummary;
  reportDataSource: DataSource<Entry>;
  timeEntriesDataSource: DataSource<Entry>;
}

const emptyTimeDetails: TimeDetails = { hours: '--:--', minutes: '--:--', seconds: '--:--' };
const emptyTimeEntriesSummary: TimeEntriesSummary = { day: emptyTimeDetails, week: emptyTimeDetails, month: emptyTimeDetails };

export const initialState = {
  active: null,
  isLoading: false,
  message: '',
  createError: null,
  updateError: null,
  timeEntriesSummary: emptyTimeEntriesSummary,
  reportDataSource: {
    data: new Array<Entry>(),
    isLoading: false
  },
  timeEntriesDataSource: {
    data: new Array<Entry>(),
    isLoading: false
  }
};

export const entryReducer = (state: EntryState = initialState, action: EntryActions): EntryState => {
  switch (action.type) {
    case EntryActionTypes.LOAD_ENTRIES_SUMMARY: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case EntryActionTypes.LOAD_ENTRIES_SUMMARY_SUCCESS:
      return {
        ...state,
        timeEntriesSummary: action.payload,
      };
    case EntryActionTypes.LOAD_ENTRIES_SUMMARY_FAIL:
      return {
        ...state,
        timeEntriesSummary: emptyTimeEntriesSummary,
      };
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
        timeEntriesDataSource: {
          data: [],
          isLoading: true
        }
      };
    }
    case EntryActionTypes.LOAD_ENTRIES_SUCCESS:
      return {
        ...state,
        timeEntriesDataSource: {
          data: action.payload,
          isLoading: false
        }

      };

    case EntryActionTypes.LOAD_ENTRIES_FAIL: {
      return {
        ...state,
        message: 'Something went wrong fetching entries!',
        timeEntriesDataSource: {
          data: [],
          isLoading: false
        }
      };
    }

    case EntryActionTypes.CREATE_ENTRY: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case EntryActionTypes.CREATE_ENTRY_SUCCESS: {
      const entryList = [action.payload, ...state.timeEntriesDataSource.data];
      entryList.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
      if (action.payload.end_date === null || action.payload.end_date === undefined) {
        return {
          ...state,
          active: action.payload,
          isLoading: false,
          timeEntriesDataSource: {
            data: entryList,
            isLoading: false,
          },
          createError: false,
        };
      } else {
        return {
          ...state,
          isLoading: false,
          timeEntriesDataSource: {
            data: entryList,
            isLoading: false,
          },
          createError: false,
        };
      }
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
      const entryList = state.reportDataSource.data.filter((entry) => entry.id !== action.entryId);
      return {
        ...state,
        isLoading: false,
        timeEntriesDataSource: {
          data: entryList,
          isLoading: false,
        },
        message: 'ProjectType removed successfully!',
      };
    }

    case EntryActionTypes.DELETE_ENTRY_FAIL: {
      return {
        ...state,
        isLoading: false,
        message: 'Something went wrong deleting entry!',
      };
    }

    case EntryActionTypes.UPDATE_ENTRY: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case EntryActionTypes.UPDATE_ENTRY_SUCCESS: {
      const entryList = [...state.timeEntriesDataSource.data];
      const index = entryList.findIndex((entry) => entry.id === action.payload.id);
      entryList[index] = action.payload;
      entryList.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
      return {
        ...state,
        timeEntriesDataSource: {
          data: entryList,
          isLoading: false,
        },
        isLoading: false,
        updateError: false,
      };
    }

    case EntryActionTypes.UPDATE_ENTRY_FAIL: {
      return {
        ...state,
        active: null,
        isLoading: false,
        updateError: true
      };
    }

    case EntryActionTypes.UPDATE_CURRENT_OR_LAST_ENTRY: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case EntryActionTypes.UPDATE_CURRENT_OR_LAST_ENTRY_FAIL: {
      return {
        ...state,
        isLoading: false,
        message: 'Update Current or Last Entry Fail',
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

    case EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE: {
      return {
        ...state,
        isLoading: true,
        reportDataSource: {
          data: [],
          isLoading: true
        }
      };
    }
    case EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reportDataSource: {
          data: action.payload,
          isLoading: false
        }
      };

    case EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE_FAIL: {
      return {
        ...state,
        isLoading: false,
        reportDataSource: {
          data: [],
          isLoading: false
        }
      };
    }

    default: {
      return state;
    }
  }
};
