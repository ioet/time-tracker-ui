import * as actions from './technology.actions';
import { technologyReducer, TechnologyState } from './technology.reducers';
import { Technology } from '../models/technology.model';

describe('technologyReducer', () => {
  const initialState: TechnologyState = { technologyList: null, isLoading: false };

  it('on LoadTechnology, isLoading is true', () => {
    const action = new actions.LoadTechnology('java');
    const state = technologyReducer(initialState, action);
    expect(state.isLoading).toEqual(true);
  });

  it('on LoadTechnologySuccess, technologiesFound are saved in the store', () => {
    const technologiesFound: Technology = { items: [{ name: 'java' }] };
    const action = new actions.LoadTechnologySuccess(technologiesFound);
    const state = technologyReducer(initialState, action);
    expect(state.technologyList).toEqual(technologiesFound);
  });

  it('on LoadTechnologyFail, technologyList equal []', () => {
    const action = new actions.LoadTechnologyFail('error');
    const state = technologyReducer(initialState, action);
    expect(state.technologyList).toEqual([]);
  });
});
