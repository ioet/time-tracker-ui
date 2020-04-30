import { ActivityManagementActions, ActivityManagementActionTypes } from './activity-management.actions';
import { Activity } from './../../shared/models/activity.model';

export interface ActivityState {
  data: Activity[];
  isLoading: boolean;
  message: string;
  activityIdToEdit: string;
}

export const initialState: ActivityState = {
  data: [],
  isLoading: false,
  message: '',
  activityIdToEdit: '',
};

export function activityManagementReducer(state: ActivityState = initialState, action: ActivityManagementActions) {
  const activityList = [...state.data];
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
      return { data: [], isLoading: false, message: 'Something went wrong fetching activities!', activityIdToEdit: '' };
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
        activityIdToEdit: '',
      };
    }

    case ActivityManagementActionTypes.DELETE_ACTIVITY: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case ActivityManagementActionTypes.DELETE_ACTIVITY_SUCCESS: {
      const activites = state.data.filter((activity) => activity.id !== action.activityId);
      return {
        ...state,
        data: activites,
        isLoading: false,
        message: 'Activity removed successfully!',
      };
    }

    case ActivityManagementActionTypes.DELETE_ACTIVITY_FAIL: {
      return {
        data: [],
        isLoading: false,
        message: 'Something went wrong deleting activity!',
        activityIdToEdit: '',
      };
    }

    case ActivityManagementActionTypes.UPDATE_ACTIVITY: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case ActivityManagementActionTypes.UPDATE_ACTIVITY_SUCCESS: {
      const index = activityList.findIndex((activity) => activity.id === action.payload.id);
      activityList[index] = action.payload;

      return {
        ...state,
        data: activityList,
        isLoading: false,
        message: 'Data updated successfully!',
        activityIdToEdit: '',
      };
    }

    case ActivityManagementActionTypes.UPDATE_ACTIVITY_FAIL: {
      return {
        data: [],
        isLoading: false,
        message: 'Something went wrong updating activities!',
        activityIdToEdit: '',
      };
    }

    case ActivityManagementActionTypes.SET_ACTIVITY_ID_TO_EDIT: {
      return {
        ...state,
        activityIdToEdit: action.payload,
        message: 'Set activityIdToEdit property',
      };
    }

    case ActivityManagementActionTypes.RESET_ACTIVITY_ID_TO_EDIT: {
      return {
        ...state,
        activityIdToEdit: '',
        message: 'Reset activityIdToEdit property',
      };
    }

    default : {
      return state;
    }

  }
}
