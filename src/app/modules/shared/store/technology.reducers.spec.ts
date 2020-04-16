import * as actions from './technology.actions';
import { technologyReducer, TechnologyState } from './technology.reducers';
import { Technology } from '../models/technology.model';

describe('technologyReducer', () => {
  const initialState: TechnologyState = { technologyList: null, isLoading: false };

  it('on FindTechnology, isLoading is true', () => {
    const action = new actions.FindTechnology('java');
    const state = technologyReducer(initialState, action);
    expect(state.isLoading).toEqual(true);
  });

  it('on FindTechnologySuccess, technologiesFound are saved in the store', () => {
    const technologiesFound: Technology = { items: [{ name: 'java' }] };
    const action = new actions.FindTechnologySuccess(technologiesFound);
    const state = technologyReducer(initialState, action);
    expect(state.technologyList).toEqual(technologiesFound);
  });

  it('on FindTechnologyFail, technologyList equal []', () => {
    const action = new actions.FindTechnologyFail('error');
    const state = technologyReducer(initialState, action);
    expect(state.technologyList).toEqual([]);
  });
});
