import { TechnologyActions, TechnologyActionTypes } from './technology.actions';
import { Technology } from '../models/technology.model';

export interface TechnologyState {
  technologyList: Technology;
  isLoading: boolean;
}

export const initialState = {
  technologyList: null,
  isLoading: false,
};

export const technologyReducer = (state: TechnologyState = initialState, action: TechnologyActions) => {
  switch (action.type) {
    case TechnologyActionTypes.LOAD_TECHNOLOGY: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case TechnologyActionTypes.LOAD_TECHNOLOGY_SUCCESS:
      return {
        ...state,
        technologyList: action.payload,
        isLoading: false,
      };

    case TechnologyActionTypes.LOAD_TECHNOLOGY_FAIL: {
      return {
        technologyList: [],
        isLoading: false,
      };
    }

    default:
      return state;
  }
};
