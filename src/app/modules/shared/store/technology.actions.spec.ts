import * as actions from './technology.actions';
import { Technology } from '../models';

describe('Actions for Technology', () => {
  it('LoadTechnologySuccess type is TechnologyActionTypes.LOAD_TECHNOLOGY_SUCCESS', () => {
    const technologyList: Technology = { items: [{ name: 'java' }, { name: 'javascript' }] };
    const loadTechnologySuccess = new actions.LoadTechnologySuccess(technologyList);
    expect(loadTechnologySuccess.type).toEqual(actions.TechnologyActionTypes.LOAD_TECHNOLOGY_SUCCESS);
  });

  it('LoadTechnologyFail type is TechnologyActionTypes.LOAD_TECHNOLOGY_FAIL', () => {
    const loadTechnologyFail = new actions.LoadTechnologyFail('error');
    expect(loadTechnologyFail.type).toEqual(actions.TechnologyActionTypes.LOAD_TECHNOLOGY_FAIL);
  });
});
