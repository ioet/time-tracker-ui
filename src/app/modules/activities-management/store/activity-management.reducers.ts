import { ActivityManagementActions, ActivityManagementActionTypes } from './activity-management.actions';
import { Activity } from './../../shared/models/activity.model';

export interface ActivityState {
  data: Activity[];
  isLoading: boolean;
  message: string;
}

export const initialState: ActivityState = {
  data: [],
  isLoading: false,
  message: '',
};

export function activityManagementReducer(state: ActivityState = initialState, action: ActivityManagementActions) {
  switch (action.type) {
    case ActivityManagementActionTypes.LOAD_ACTIVITIES: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case ActivityManagementActionTypes.LOAD_ACTIVITIES_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        message: 'Data fetch successfully!',
      };
    }
    case ActivityManagementActionTypes.LOAD_ACTIVITIES_FAIL: {
      return { data: [], isLoading: false, message: 'Something went wrong fetching activities!' };
    }

    case ActivityManagementActionTypes.CREATE_ACTIVITY: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case ActivityManagementActionTypes.CREATE_ACTIVITY_SUCCESS: {
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false,
        message: 'Data created successfully!',
      };
    }
    case ActivityManagementActionTypes.CREATE_ACTIVITY_FAIL: {
      return {
        data: [],
        isLoading: false,
        message: 'Something went wrong creating activities!',
      };
    }
    case ActivityManagementActionTypes.DELETE_ACTIVITY: {
      return {
        ...state,
        isLoading: true,
        message: 'Activity removed successfully!',
      };
    }

    case ActivityManagementActionTypes.DELETE_ACTIVITY_SUCCESS: {
      const activites = state.data.filter((activity) => activity.id !== action.activityId);
      return {
        data: activites,
        isLoading: false,
        message: 'Activity removed successfully!',
      };
    }

    case ActivityManagementActionTypes.DELETE_ACTIVITY_FAIL: {
      return {
        data: [],
        isLoading: false,
        message: 'Something went wrong creating activities!',
      };
    }
    default:
      return state;
  }
}
