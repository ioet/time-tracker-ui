import { ProjectTypeActions, ProjectTypeActionTypes } from './project-type.actions';
import { ProjectType } from '../../../../shared/models';

export interface ProjectTypeState {
  data: ProjectType[];
  isLoading: boolean;
  message: string;
  projectTypeIdToEdit: string;
}

export const initialState: ProjectTypeState = {
  data: [],
  isLoading: false,
  message: '',
  projectTypeIdToEdit: '',
};

export const projectTypeReducer = (state: ProjectTypeState = initialState, action: ProjectTypeActions) => {
  const projectTypeList = [...state.data];
  switch (action.type) {
    case ProjectTypeActionTypes.CLEAN_PROJECT_TYPES: {
      return {
        ...state,
        data: [],
      };
    }
    case ProjectTypeActionTypes.LOAD_PROJECT_TYPES: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case ProjectTypeActionTypes.LOAD_PROJECT_TYPES_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        message: 'Data fetch successfully!',
      };
    }
    case ProjectTypeActionTypes.LOAD_PROJECT_TYPES_FAIL: {
      return {
        data: [],
        isLoading: false,
        message: 'Something went wrong fetching projectType!',
        projectTypeIdToEdit: '',
      };
    }

    case ProjectTypeActionTypes.CREATE_PROJECT_TYPE: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case ProjectTypeActionTypes.CREATE_PROJECT_TYPE_SUCCESS: {
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false,
        message: 'Data created successfully!',
      };
    }

    case ProjectTypeActionTypes.CREATE_PROJECT_TYPE_FAIL: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case ProjectTypeActionTypes.DELETE_PROJECT_TYPE: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case ProjectTypeActionTypes.DELETE_PROJECT_TYPE_SUCCESS: {
      const activites = state.data.filter((projectType) => projectType.id !== action.projectTypeId);
      return {
        ...state,
        data: activites,
        isLoading: false,
        message: 'ProjectType removed successfully!',
      };
    }

    case ProjectTypeActionTypes.DELETE_PROJECT_TYPE_FAIL: {
      return {
        data: [],
        isLoading: false,
        message: 'Something went wrong deleting projectType!',
        projectTypeIdToEdit: '',
      };
    }

    case ProjectTypeActionTypes.UPDATE_PROJECT_TYPE: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case ProjectTypeActionTypes.UPDATE_PROJECT_TYPE_SUCCESS: {
      const index = projectTypeList.findIndex((projectType) => projectType.id === action.payload.id);
      projectTypeList[index] = action.payload;

      return {
        ...state,
        data: projectTypeList,
        isLoading: false,
        message: 'Data updated successfully!',
        projectTypeIdToEdit: '',
      };
    }

    case ProjectTypeActionTypes.UPDATE_PROJECT_TYPE_FAIL: {
      return {
        data: [],
        isLoading: false,
        message: 'Something went wrong updating projectType!',
        projectTypeIdToEdit: '',
      };
    }

    case ProjectTypeActionTypes.SET_PROJECT_TYPE_ID_TO_EDIT: {
      return {
        ...state,
        projectTypeIdToEdit: action.payload,
        message: 'Set projectTypeIdToEdit property',
      };
    }

    case ProjectTypeActionTypes.RESET_PROJECT_TYPE_ID_TO_EDIT: {
      return {
        ...state,
        projectTypeIdToEdit: '',
        message: 'Reset projectTypeIdToEdit property',
      };
    }

    default:
      return state;
  }
};
