import { ActivityManagementActions, ActivityManagementActionTypes } from './activity-management.actions';
import { Activity } from './../../shared/models/activity.model';

export interface ActivityState {
  data: Activity[];
  isLoading: boolean;
  message: string;
}

const initialState: ActivityState = {
  data: [],
  isLoading: false,
  message: '',
};

export function activityManagementReducer(
  state: ActivityState = initialState,
  action: ActivityManagementActions
): ActivityState {
  switch (action.type) {
    case ActivityManagementActionTypes.DELETE_ACTIVITY: {
      return {
        ...state,
        message: 'Activity removed successfully!',
      };
    }

    case ActivityManagementActionTypes.DELETE_ACTIVITY_SUCCESS: {
      const stateWithDeletedActivity = initialState;
      stateWithDeletedActivity.data = state.data.filter((activity) => activity.id !== action.activityId);
      console.log();
      return {
        ...stateWithDeletedActivity,
        message: 'Activity removed successfully!',
      };
    }

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
  }
}
