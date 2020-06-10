import * as actions from './project-type.actions';

describe('LoadProjectTypesSuccess', () => {

  it('CleanProjectTypes type is ProjectTypeActionTypes.CLEAN_PROJECT_TYPES', () => {
    const action = new actions.CleanProjectTypes();
    expect(action.type).toEqual(actions.ProjectTypeActionTypes.CLEAN_PROJECT_TYPES);
  });

  it('LoadProjectTypesSuccess type is ProjectTypeActionTypes.LOAD_PROJECT_TYPES_SUCCESS', () => {
    const loadProjectTypesSuccess = new actions.LoadProjectTypesSuccess([]);
    expect(loadProjectTypesSuccess.type).toEqual(actions.ProjectTypeActionTypes.LOAD_PROJECT_TYPES_SUCCESS);
  });

  it('LoadProjectTypesFail type is ProjectTypeActionTypes.LOAD_PROJECT_TYPES_FAIL', () => {
    const loadProjectTypesFail = new actions.LoadProjectTypesFail('error');
    expect(loadProjectTypesFail.type).toEqual(actions.ProjectTypeActionTypes.LOAD_PROJECT_TYPES_FAIL);
  });

  it('CreateProjectTypeSuccess type is ProjectTypeActionTypes.CREATE_PROJECT_TYPE_SUCCESS', () => {
    const createProjectTypeSuccess = new actions.CreateProjectTypeSuccess({
      id: '1',
      name: 'Training',
      description: 'It is good for learning',
    });
    expect(createProjectTypeSuccess.type).toEqual(actions.ProjectTypeActionTypes.CREATE_PROJECT_TYPE_SUCCESS);
  });

  it('CreateProjectTypeFail type is ProjectTypeActionTypes.CREATE_PROJECT_TYPE_FAIL', () => {
    const createProjectTypeFail = new actions.CreateProjectTypeFail('error');
    expect(createProjectTypeFail.type).toEqual(actions.ProjectTypeActionTypes.CREATE_PROJECT_TYPE_FAIL);
  });

  it('UpdateProjectTypeSuccess type is ProjectTypeActionTypes.UPDATE_PROJECT_TYPE_SUCCESS', () => {
    const updateProjectTypeSuccess = new actions.UpdateProjectTypeSuccess({
      id: '1',
      name: 'Training',
      description: 'test description',
    });
    expect(updateProjectTypeSuccess.type).toEqual(actions.ProjectTypeActionTypes.UPDATE_PROJECT_TYPE_SUCCESS);
  });

  it('UpdateProjectTypeFail type is ProjectTypeActionTypes.UPDATE_PROJECT_TYPE_FAIL', () => {
    const updateProjectTypeFail = new actions.UpdateProjectTypeFail('error');
    expect(updateProjectTypeFail.type).toEqual(actions.ProjectTypeActionTypes.UPDATE_PROJECT_TYPE_FAIL);
  });

  it('SetProjectTypeToEdit type is ProjectTypeActionTypes.SET_PROJECT_TYPE_ID_TO_EDIT', () => {
    const setProjectTypeToEdit = new actions.SetProjectTypeToEdit('123');
    expect(setProjectTypeToEdit.type).toEqual(actions.ProjectTypeActionTypes.SET_PROJECT_TYPE_ID_TO_EDIT);
  });

  it('ResetProjectTypeToEdit type is ProjectTypeActionTypes.RESET_PROJECT_TYPE_ID_TO_EDIT', () => {
    const resetProjectTypeToEdit = new actions.ResetProjectTypeToEdit();
    expect(resetProjectTypeToEdit.type).toEqual(actions.ProjectTypeActionTypes.RESET_PROJECT_TYPE_ID_TO_EDIT);
  });
});
