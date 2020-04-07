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

  it('CreateProjectSuccess type is ProjectActionTypes.CREATE_PROJECT_SUCCESS', () => {
    const createProjectSuccess = new actions.CreateProjectSuccess({
      id: '1',
      name: 'Training',
      description: 'It is good for learning',
    });
    expect(createProjectSuccess.type).toEqual(actions.ProjectActionTypes.CREATE_PROJECT_SUCCESS);
  });

  it('CreateProjectFail type is ProjectActionTypes.CREATE_PROJECT_FAIL', () => {
    const createProjectFail = new actions.CreateProjectFail('error');
    expect(createProjectFail.type).toEqual(actions.ProjectActionTypes.CREATE_PROJECT_FAIL);
  });

  it('UpdateProjectSuccess type is ProjectActionTypes.UPDATE_PROJECT_SUCCESS', () => {
    const updateProjectSuccess = new actions.UpdateProjectSuccess({
      id: '1',
      name: 'Training',
      description: 'It is good for learning',
    });
    expect(updateProjectSuccess.type).toEqual(actions.ProjectActionTypes.UPDATE_PROJECT_SUCCESS);
  });

  it('UpdateProjectFail type is ProjectActionTypes.UPDATE_PROJECT_FAIL', () => {
    const updateProjectFail = new actions.UpdateProjectFail('error');
    expect(updateProjectFail.type).toEqual(actions.ProjectActionTypes.UPDATE_PROJECT_FAIL);
  });
});
