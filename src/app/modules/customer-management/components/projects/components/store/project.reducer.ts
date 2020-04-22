import { ProjectActions, ProjectActionTypes } from './project.actions';
import { Project } from '../../../../../shared/models';

export interface ProjectState {
  projectList: Project[];
  isLoading: boolean;
  message: string;
  projectToEdit: Project;
}

export const initialState = {
  projectList: [],
  isLoading: false,
  message: '',
  projectToEdit: undefined,
};

export const projectReducer = (state: ProjectState = initialState, action: ProjectActions) => {
  const projects = [...state.projectList];
  switch (action.type) {
    case ProjectActionTypes.LOAD_PROJECTS: {
      return {
        ...state,
        isLoading: true,
        message: 'Loading projects!',
      };
    }
    case ProjectActionTypes.LOAD_PROJECTS_SUCCESS:
      return {
        ...state,
        projectList: action.payload,
        isLoading: false,
        message: 'Data fetch successfully!',
      };

    case ProjectActionTypes.LOAD_PROJECTS_FAIL: {
      return {
        projectList: [],
        isLoading: false,
        message: 'Something went wrong fetching projects!',
        projectToEdit: undefined,
      };
    }

    case ProjectActionTypes.CREATE_PROJECT: {
      return {
        ...state,
        isLoading: true,
        message: 'Loading create projects!',
      };
    }

    case ProjectActionTypes.CREATE_PROJECT_SUCCESS: {
      return {
        ...state,
        projectList: [...state.projectList, action.payload],
        isLoading: false,
        message: 'Data created successfully!',
      };
    }

    case ProjectActionTypes.CREATE_PROJECT_FAIL: {
      return {
        projectList: [],
        isLoading: false,
        message: 'Something went wrong creating projects!',
        projectToEdit: undefined,
      };
    }

    case ProjectActionTypes.UPDATE_PROJECT: {
      return {
        ...state,
        isLoading: true,
        message: 'Loading update project',
      };
    }

    case ProjectActionTypes.UPDATE_PROJECT_SUCCESS: {
      const index = projects.findIndex((project) => project.id === action.payload.id);
      projects[`${index}`] = action.payload;

      return {
        ...state,
        projectList: projects,
        isLoading: false,
        message: 'Data updated successfully!',
        projectToEdit: undefined,
      };
    }

    case ProjectActionTypes.UPDATE_PROJECT_FAIL: {
      return {
        projectList: [],
        isLoading: false,
        message: 'Something went wrong updating projects!',
        projectToEdit: undefined,
      };
    }

    case ProjectActionTypes.SET_PROJECT_TO_EDIT: {
      return {
        ...state,
        projectToEdit: action.payload,
        message: 'Set projectToEdit property',
      };
    }

    case ProjectActionTypes.RESET_PROJECT_TO_EDIT: {
      return {
        ...state,
        projectToEdit: undefined,
        message: 'Reset projectToEdit property',
      };
    }

    case ProjectActionTypes.DELETE_PROJECT: {
      return {
        ...state,
        isLoading: true,
        message: 'Loading delete project',
      };
    }

    case ProjectActionTypes.DELETE_PROJECT_SUCCESS: {
      const newProjects = state.projectList.filter((project) => project.id !== action.projectId);
      return {
        ...state,
        projectList: newProjects,
        isLoading: false,
        message: 'Project removed successfully!',
      };
    }

    case ProjectActionTypes.DELETE_PROJECT_FAIL: {
      return {
        projectList: [],
        isLoading: false,
        message: 'Something went wrong deleting the project!',
        projectToEdit: undefined,
      };
    }

    default:
      return state;
  }
};
