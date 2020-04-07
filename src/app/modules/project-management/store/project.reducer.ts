import { ProjectActions, ProjectActionTypes } from './project.actions';
import { Project } from '../../shared/models';

export interface ProjectState {
  projectList: Project[];
  isLoading: boolean;
}

export const initialState = {
  projectList: [],
  isLoading: false,
};

export const projectReducer = (state: ProjectState = initialState, action: ProjectActions) => {
  const projects = [...state.projectList];
  switch (action.type) {
    case ProjectActionTypes.GET_PROJECTS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ProjectActionTypes.GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projectList: action.payload,
        isLoading: false,
      };

    case ProjectActionTypes.GET_PROJECTS_FAIL: {
      return {
        projectList: [],
        isLoading: false,
      };
    }

    case ProjectActionTypes.CREATE_PROJECT: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case ProjectActionTypes.CREATE_PROJECT_SUCCESS: {
      return {
        ...state,
        projectList: [...state.projectList, action.payload],
        isLoading: false,
      };
    }

    case ProjectActionTypes.CREATE_PROJECT_FAIL: {
      return {
        projectList: [],
        isLoading: false,
      };
    }

    case ProjectActionTypes.UPDATE_PROJECT: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case ProjectActionTypes.UPDATE_PROJECT_SUCCESS: {
      const index = projects.findIndex((project) => project.id === action.payload.id);
      projects[`${index}`] = action.payload;

      return {
        ...state,
        projectList: projects,
        isLoading: false,
      };
    }

    case ProjectActionTypes.UPDATE_PROJECT_FAIL: {
      return {
        projectList: [],
        isLoading: false,
      };
    }
    default:
      return state;
  }
};
