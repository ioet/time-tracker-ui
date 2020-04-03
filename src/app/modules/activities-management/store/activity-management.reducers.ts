import {ActivityManagementActions, ActivityManagementActionTypes} from './activity-management.actions';
import {Activity} from './../../shared/models/activity.model';

export interface ActivityState {
  data: Activity[];
  isLoading: boolean;
  message: string;
}

const initialState: ActivityState = {
  data: [],
  isLoading: false,
  message: ''
};

export function activityManagementReducer(state = initialState, action: ActivityManagementActions): ActivityState {

  switch (action.type) {
    case(ActivityManagementActionTypes.LoadActivities): {
        return {
          ...state,
          isLoading: true
        };
      }

    case ActivityManagementActionTypes.LoadActivitiesSuccess: {
        return {
          ...state,
          data: action.payload,
          isLoading: false,
          message: 'Data fetch successfully!'
        };
      }
    case ActivityManagementActionTypes.LoadActivitiesFail: {
        return { data: [], isLoading: false, message: 'Something went wrong fetching activities!' };
      }
  }
}
