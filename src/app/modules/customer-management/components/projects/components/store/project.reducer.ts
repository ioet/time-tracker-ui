import { ProjectActions, ProjectActionTypes } from './project.actions';
import { Project } from '../../../../../shared/models';

export interface ProjectState {
  projects: Project[];
  customerProjects: Project[];
  recentProjects: Project[];
  isLoading: boolean;
  message: string;
  projectToEdit: Project;
}

export const initialState = {
  projects: [],
  customerProjects: [],
  recentProjects: [],
  isLoading: false,
  message: '',
  projectToEdit: undefined,
};

export const projectReducer = (state: ProjectState = initialState, action: ProjectActions) => {
  const projects = [...state.customerProjects];
  switch (action.type) {
    case ProjectActionTypes.LOAD_PROJECTS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ProjectActionTypes.LOAD_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        isLoading: false
      };

    case ProjectActionTypes.LOAD_PROJECTS_FAIL: {
      return {
        ...state,
        projects: [],
        isLoading: false,
      };
    }

    case ProjectActionTypes.LOAD_CUSTOMER_PROJECTS: {
      return {
        ...state,
        isLoading: true,
        message: 'Loading projects!',
      };
    }
    case ProjectActionTypes.LOAD_CUSTOMER_PROJECTS_SUCCESS:
      return {
        ...state,
        customerProjects: action.payload,
        isLoading: false,
        message: 'Data fetch successfully!',
      };

    case ProjectActionTypes.LOAD_CUSTOMER_PROJECTS_FAIL: {
      return {
        customerProjects: [],
        isLoading: false,
        message: 'Something went wrong fetching projects!',
        projectToEdit: undefined,
      };
    }

    case ProjectActionTypes.LOAD_RECENT_PROJECTS_SUCCESS:
      return {
        ...state,
        recentProjects: action.payload,
        isLoading: false
      };

    case ProjectActionTypes.LOAD_RECENT_PROJECTS_FAIL: {
      return {
        ...state,
        recentProjects: [],
        isLoading: false,
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
        customerProjects: [...state.customerProjects, action.payload],
        isLoading: false,
        message: 'Data created successfully!',
      };
    }

    case ProjectActionTypes.CREATE_PROJECT_FAIL: {
      return {
        ...state,
        isLoading: false,
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
        customerProjects: projects,
        isLoading: false,
        message: 'Data updated successfully!',
        projectToEdit: undefined,
      };
    }

    case ProjectActionTypes.UPDATE_PROJECT_FAIL: {
      return {
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
        message: 'Loading archive project',
      };
    }

    case ProjectActionTypes.DELETE_PROJECT_SUCCESS: {
      const index = projects.findIndex((project) => project.id === action.projectId);
      const archived = { ...projects[index], ...{ status: 'inactive' } };
      projects[index] = archived;
      return {
        ...state,
        customerProjects: projects,
        isLoading: false,
        message: 'Project archived successfully!',
      };
    }

    case ProjectActionTypes.DELETE_PROJECT_FAIL: {
      return {
        customerProjects: [],
        isLoading: false,
        message: 'Something went wrong archiving the project!',
        projectToEdit: undefined,
      };
    }
    case ProjectActionTypes.CLEAN_CUSTOMER_PROJECTS: {
      return {
        ...state,
        customerProjects: [],
      };
    }

    case ProjectActionTypes.UNARCHIVE_PROJECT: {
      return {
        ...state,
        isLoading: true,
        message: 'Loading unarchive project',
      };
    }

    case ProjectActionTypes.UNARCHIVE_PROJECT_SUCCESS: {
      const index = projects.findIndex((project) => project.id === action.payload.id);
      projects[index] = { ...projects[index], ...action.payload };
      return {
        ...state,
        customerProjects: projects,
        isLoading: false,
        message: 'Data unarchived successfully!',
        projectToEdit: undefined,
      };
    }

    case ProjectActionTypes.UNARCHIVE_PROJECT_FAIL: {
      return {
        isLoading: false,
        message: 'Something went wrong unarchiving projects!',
        projectToEdit: undefined,
      };
    }

    default:
      return state;
  }
};
