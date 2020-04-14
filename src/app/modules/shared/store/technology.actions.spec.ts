import * as actions from './technology.actions';
import { Technology } from '../models';

describe('Actions for Technology', () => {
  it('FindTechnologySuccess type is TechnologyActionTypes.FIND_TECHNOLOGIES_SUCESS', () => {
    const technologyList: Technology = { items: [{ name: 'java' }, { name: 'javascript' }] };
    const findTechnologySuccess = new actions.FindTechnologySuccess(technologyList);
    expect(findTechnologySuccess.type).toEqual(actions.TechnologyActionTypes.FIND_TECHNOLOGIES_SUCESS);
  });

  it('FindTechnologyFail type is TechnologyActionTypes.FIND_TECHNOLOGIES_FAIL', () => {
    const findTechnologyFail = new actions.FindTechnologyFail('error');
    expect(findTechnologyFail.type).toEqual(actions.TechnologyActionTypes.FIND_TECHNOLOGIES_FAIL);
  });
});
