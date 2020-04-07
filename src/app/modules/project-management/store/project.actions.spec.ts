import * as actions from './project.actions';

describe('Actions for Projects', () => {
  it('GetProjectsSuccess type is ProjectActionTypes.GET_PROJECTS_SUCCESS', () => {
    const getProjectsSuccess = new actions.GetProjectsSuccess([]);
    expect(getProjectsSuccess.type).toEqual(actions.ProjectActionTypes.GET_PROJECTS_SUCCESS);
  });

  it('getProjectsFail type is ProjectActionTypes.GET_PROJECTS_FAIL', () => {
    const getProjectsFail = new actions.GetProjectsFail('error');
    expect(getProjectsFail.type).toEqual(actions.ProjectActionTypes.GET_PROJECTS_FAIL);
  });

  it('PostProjectSuccess type is ProjectActionTypes.POST_PROJECT_SUCCESS', () => {
    const postProjectSuccess = new actions.PostProjectSuccess({
      id: '1',
      name: 'Training',
      description: 'It is good for learning',
    });
    expect(postProjectSuccess.type).toEqual(actions.ProjectActionTypes.POST_PROJECT_SUCCESS);
  });

  it('PostProjectFail type is ProjectActionTypes.POST_PROJECT_FAIL', () => {
    const postProjectFail = new actions.PostProjectFail('error');
    expect(postProjectFail.type).toEqual(actions.ProjectActionTypes.POST_PROJECT_FAIL);
  });

  it('PutProjectSuccess type is ProjectActionTypes.POST_PROJECT_SUCCESS', () => {
    const putProjectSuccess = new actions.PutProjectSuccess({
      id: '1',
      name: 'Training',
      description: 'It is good for learning',
    });
    expect(putProjectSuccess.type).toEqual(actions.ProjectActionTypes.PUT_PROJECT_SUCCESS);
  });

  it('PutProjectFail type is ProjectActionTypes.POST_PROJECT_FAIL', () => {
    const putProjectFail = new actions.PutProjectFail('error');
    expect(putProjectFail.type).toEqual(actions.ProjectActionTypes.PUT_PROJECT_FAIL);
  });
});
