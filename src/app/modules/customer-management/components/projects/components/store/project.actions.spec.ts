import * as actions from './project.actions';

describe('Actions for Projects', () => {
  it('LoadCustomerProjectsSuccess type is ProjectActionTypes.LOAD_CUSTOMER_PROJECTS_SUCCESS', () => {
    const LoadCustomerProjectsSuccess = new actions.LoadCustomerProjectsSuccess([]);
    expect(LoadCustomerProjectsSuccess.type).toEqual(actions.ProjectActionTypes.LOAD_CUSTOMER_PROJECTS_SUCCESS);
  });

  it('LoadCustomerProjectsFail type is ProjectActionTypes.LOAD_CUSTOMER_PROJECTS_FAIL', () => {
    const LoadCustomerProjectsFail = new actions.LoadCustomerProjectsFail('error');
    expect(LoadCustomerProjectsFail.type).toEqual(actions.ProjectActionTypes.LOAD_CUSTOMER_PROJECTS_FAIL);
  });

  it('CreateProjectSuccess type is ProjectActionTypes.CREATE_PROJECT_SUCCESS', () => {
    const createProjectSuccess = new actions.CreateProjectSuccess({
      id: '1',
      name: 'Training',
      description: 'It is good for learning',
      project_type_id: '123',
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
      project_type_id: '123',
    });
    expect(updateProjectSuccess.type).toEqual(actions.ProjectActionTypes.UPDATE_PROJECT_SUCCESS);
  });

  it('UpdateProjectFail type is ProjectActionTypes.UPDATE_PROJECT_FAIL', () => {
    const updateProjectFail = new actions.UpdateProjectFail('error');
    expect(updateProjectFail.type).toEqual(actions.ProjectActionTypes.UPDATE_PROJECT_FAIL);
  });

  it('SetProjectToEdit type is ProjectActionTypes.SET_PROJECT_TO_EDIT', () => {
    const setProjectToEdit = new actions.SetProjectToEdit({
      id: '1',
      name: 'Training',
      description: 'It is good for learning',
      project_type_id: '123',
    });
    expect(setProjectToEdit.type).toEqual(actions.ProjectActionTypes.SET_PROJECT_TO_EDIT);
  });

  it('ResetProjectToEdit type is ActivityManagementActionTypes.RESET_PROJECT_TO_EDIT', () => {
    const resetProjectToEdit = new actions.ResetProjectToEdit();
    expect(resetProjectToEdit.type).toEqual(actions.ProjectActionTypes.RESET_PROJECT_TO_EDIT);
  });

  it('DeleteProjectSuccess type is ProjectActionTypes.DELETE_PROJECT_SUCCESS', () => {
    const deleteProjectSuccess = new actions.DeleteProjectSuccess('1');
    expect(deleteProjectSuccess.type).toEqual(actions.ProjectActionTypes.DELETE_PROJECT_SUCCESS);
  });

  it('DeleteProjectFail type is ProjectActionTypes.DELETE_PROJECT_FAIL', () => {
    const deleteProjectFail = new actions.DeleteProjectFail('error');
    expect(deleteProjectFail.type).toEqual(actions.ProjectActionTypes.DELETE_PROJECT_FAIL);
  });
});
