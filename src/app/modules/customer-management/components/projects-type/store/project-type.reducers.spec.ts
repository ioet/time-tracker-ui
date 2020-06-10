import { ProjectType } from '../../../../shared/models';
import * as actions from './project-type.actions';
import { projectTypeReducer, ProjectTypeState } from './project-type.reducers';

describe('projectTypeReducer', () => {
  const initialState: ProjectTypeState = { data: [], isLoading: false, message: '', projectTypeIdToEdit: '' };
  const projectType: ProjectType = { id: '1', name: 'Training', description: 'It is good for learning' };

  it('on Default, ', () => {
    const action = new actions.DefaultProjectTypes();
    const state = projectTypeReducer(initialState, action);
    expect(state.data).toEqual(initialState.data);
  });

  it('on CLEAN_PROJECT_TYPES, data is cleared', () => {
    initialState.data = [projectType];
    const action = new actions.CleanProjectTypes();

    const state = projectTypeReducer(initialState, action);

    expect(state.data).toEqual([]);
  });

  it('on LoadProjectTypes, isLoading is true', () => {
    const action = new actions.LoadProjectTypes();

    const state = projectTypeReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on LoadProjectTypesSuccess, projectTypesFound are saved in the store', () => {
    const projectTypesFound: ProjectType[] = [{ id: '', name: '', description: '' }];
    const action = new actions.LoadProjectTypesSuccess(projectTypesFound);

    const state = projectTypeReducer(initialState, action);

    expect(state.data).toEqual(projectTypesFound);
  });

  it('on LoadProjectTypesFail, message equal to Something went wrong fetching projectType!', () => {
    const action = new actions.LoadProjectTypesFail('error');

    const state = projectTypeReducer(initialState, action);

    expect(state.message).toEqual('Something went wrong fetching projectType!');
  });

  it('on CreateProjectType, isLoading is true', () => {
    const action = new actions.CreateProjectType(projectType);

    const state = projectTypeReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on CreateProjectTypeSuccess, activitiesFound are saved in the store', () => {
    initialState.data = [];
    const action = new actions.CreateProjectTypeSuccess(projectType);

    const state = projectTypeReducer(initialState, action);

    expect(state.data).toEqual([projectType]);
    expect(state.isLoading).toEqual(false);
  });

  it('isLoading false on CreateProjectTypeFail', () => {
    const action = new actions.CreateProjectTypeFail('error');

    const state = projectTypeReducer(initialState, action);

    expect(state.isLoading).toEqual(false);
  });

  it('on DeleteProjectType, isLoading is true', () => {
    const ProjectTypeToDeleteId = '1';
    const action = new actions.DeleteProjectType(ProjectTypeToDeleteId);

    const state = projectTypeReducer(initialState, action);
    expect(state.isLoading).toEqual(true);
  });

  it('on DeleteProjectTypeSuccess, message equal to ProjectType removed successfully!', () => {
    const currentState: ProjectTypeState = { data: [projectType], isLoading: false, message: '', projectTypeIdToEdit: '' };
    const ProjectTypeToDeleteId = '1';
    const action = new actions.DeleteProjectTypeSuccess(ProjectTypeToDeleteId);

    const state = projectTypeReducer(currentState, action);
    expect(state.data).toEqual([]);
    expect(state.message).toEqual('ProjectType removed successfully!');
  });

  it('on DeleteProjectTypeFail, message equal to Something went wrong deleting ProjectType!', () => {
    const ProjectTypeToDeleteId = '1';
    const action = new actions.DeleteProjectTypeFail(ProjectTypeToDeleteId);

    const state = projectTypeReducer(initialState, action);
    expect(state.isLoading).toEqual(false);
    expect(state.message).toEqual('Something went wrong deleting projectType!');
  });

  it('on UpdateProjectType, isLoading is true', () => {
    const action = new actions.UpdateProjectType(projectType);

    const state = projectTypeReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on UpdateProjectTypeSuccess, activitiesFound are saved in the store', () => {
    const currentState: ProjectTypeState = { data: [projectType], isLoading: false, message: '', projectTypeIdToEdit: '1' };
    const ProjectTypeEdited: ProjectType = { id: '1', name: 'Test', description: 'edit test' };

    const action = new actions.UpdateProjectTypeSuccess(ProjectTypeEdited);

    const state = projectTypeReducer(currentState, action);

    expect(state.data).toEqual([ProjectTypeEdited]);
    expect(state.isLoading).toEqual(false);
  });

  it('on UpdateProjectTypeFail, message equal to Something went wrong creating projectType!', () => {
    const action = new actions.UpdateProjectTypeFail('error');

    const state = projectTypeReducer(initialState, action);

    expect(state.message).toEqual('Something went wrong updating projectType!');
    expect(state.isLoading).toEqual(false);
  });

  it('on SetProjectTypeToEdit, should save the ProjectTypeId to edit', () => {
    const action = new actions.SetProjectTypeToEdit(projectType.id);

    const state = projectTypeReducer(initialState, action);

    expect(state.projectTypeIdToEdit).toEqual('1');
  });

  it('on ResetProjectTypeToEdit, should clean the ProjectTypeIdToEdit variable', () => {
    const action = new actions.ResetProjectTypeToEdit();

    const state = projectTypeReducer(initialState, action);

    expect(state.projectTypeIdToEdit).toEqual('');
  });
});
