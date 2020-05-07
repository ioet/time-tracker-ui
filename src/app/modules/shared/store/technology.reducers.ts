import { TechnologyActions, TechnologyActionTypes } from './technology.actions';
import { Technology } from '../models/technology.model';

export interface TechnologyState {
  technologyList: Technology;
  isLoading: boolean;
}

export const initialState = {
  technologyList: { items: [] },
  isLoading: false,
};

export const technologyReducer = (state: TechnologyState = initialState, action: TechnologyActions) => {
  switch (action.type) {
    case TechnologyActionTypes.FIND_TECHNOLOGIES: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case TechnologyActionTypes.FIND_TECHNOLOGIES_SUCESS:
      return {
        ...state,
        technologyList: action.payload,
        isLoading: false,
      };

    case TechnologyActionTypes.FIND_TECHNOLOGIES_FAIL: {
      return {
        technologyList: [],
        isLoading: false,
      };
    }

    default:
      return state;
  }
};
