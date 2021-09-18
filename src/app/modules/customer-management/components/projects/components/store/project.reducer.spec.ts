import { Project, Status } from '../../../../../shared/models';
import * as actions from './project.actions';
import { projectReducer, ProjectState } from './project.reducer';

describe('projectReducer', () => {
  const initialState: ProjectState = {
    projects: [{ id: 'id', name: 'name', project_type_id: '', status: 'inactive' }],
    customerProjects: [],
    recentProjects: [],
    isLoading: false, message: '', projectToEdit: undefined
  };
  const archivedProject: Project = { id: '1', name: 'aaa', description: 'bbb', project_type_id: '123', status: 'inactive' };
  const project: Project = { id: '1', name: 'aaa', description: 'bbb', project_type_id: '123', status: 'active' };

  it('on CLEAN_CUSTOMER_PROJECTS, customerProjects is empty', () => {
    initialState.customerProjects = [project];
    const action = new actions.CleanCustomerProjects();

    const state = projectReducer(initialState, action);

    expect(state.customerProjects).toEqual([]);
  });

  it('on LoadProjects, isLoading is true', () => {
    const action = new actions.LoadCustomerProjects('1');
    const state = projectReducer(initialState, action);
    expect(state.isLoading).toEqual(true);
  });

  it('on LoadCustomerProjectsSuccess, projectsFound are saved in the store', () => {
    const projectsFound: Project[] = [{ id: '', name: '', description: '', project_type_id: '123' }];
    const action = new actions.LoadCustomerProjectsSuccess(projectsFound);
    const state = projectReducer(initialState, action);
    expect(state.customerProjects).toEqual(projectsFound);
  });

  it('on LoadCustomerProjectsFail, customerProjects equal []', () => {
    const action = new actions.LoadCustomerProjectsFail('error');
    const state = projectReducer(initialState, action);
    expect(state.customerProjects).toEqual([]);
  });

  it('on LoadRecentProjectsSuccess, projectsFound are saved in the store', () => {
    const projectsFound: Project[] = [{ id: '1', name: 'abc', description: 'xxx', status: 'active' }];
    const newState = initialState;
    newState.recentProjects = projectsFound;
    const action = new actions.LoadRecentProjectsSuccess(projectsFound);
    const state = projectReducer(initialState, action);
    expect(state).toEqual(newState);
  });

  it('on LoadRecentProjectsFail, recentProjects equal []', () => {
    const newState = initialState;
    newState.recentProjects = [];
    const action = new actions.LoadRecentProjectsFail('error');
    const state = projectReducer(initialState, action);
    expect(state).toEqual(newState);
  });

  it('on CreateProject, isLoading is true', () => {
    const action = new actions.CreateProject(project);
    const state = projectReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on CreateProjectSuccess, project is saved in the store', () => {
    initialState.customerProjects = [];
    const action = new actions.CreateProjectSuccess(project);

    const state = projectReducer(initialState, action);

    expect(state.customerProjects).toEqual([project]);
    expect(state.isLoading).toEqual(false);
  });

  it('on CreateProjectFail, isLoading is false', () => {
    const action = new actions.CreateProjectFail('error');

    const state = projectReducer(initialState, action);

    expect(state.isLoading).toEqual(false);
  });

  it('on UpdateProject, isLoading is true', () => {
    const action = new actions.UpdateProject(project);
    const state = projectReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on UpdateProjectSuccess, project is saved in the store', () => {
    const currentState: ProjectState = {
      projects: [project],
      customerProjects: [project],
      recentProjects: [project],
      isLoading: false,
      message: '',
      projectToEdit: project,
    };
    const action = new actions.UpdateProjectSuccess(project);
    const state = projectReducer(currentState, action);

    expect(state.customerProjects).toEqual([project]);
    expect(state.isLoading).toEqual(false);
  });

  it('on UpdateProjectFail, customerProjects equal []', () => {
    const action = new actions.UpdateProjectFail('error');
    const state = projectReducer(initialState, action);

    expect(state.customerProjects).toEqual(state.customerProjects);
    expect(state.isLoading).toEqual(false);
  });

  it('on SetProjectToEdit, should save the project to edit', () => {
    const action = new actions.SetProjectToEdit(project);

    const state = projectReducer(initialState, action);

    expect(state.projectToEdit).toEqual(project);
    expect(state.message).toEqual('Set projectToEdit property');
  });

  it('on ResetProjectToEdit, should clean the projectToEdit variable', () => {
    const action = new actions.ResetProjectToEdit();

    const state = projectReducer(initialState, action);

    expect(state.projectToEdit).toEqual(undefined);
    expect(state.message).toEqual('Reset projectToEdit property');
  });

  it('on DeleteProject, isLoading is true', () => {
    const projectIdToDelete = '1';
    const action = new actions.DeleteProject(projectIdToDelete);

    const state = projectReducer(initialState, action);
    expect(state.isLoading).toEqual(true);
    expect(state.message).toEqual('Loading archive project');
  });

  it('on DeleteProjectSuccess, message equal to Project archived successfully!', () => {
    const currentState: ProjectState = {
      projects: [project],
      customerProjects: [project],
      recentProjects: [project],
      isLoading: false,
      message: '',
      projectToEdit: undefined,
    };
    const projectIdToDelete = '1';
    const action = new actions.DeleteProjectSuccess(projectIdToDelete);

    const state = projectReducer(currentState, action);
    expect(state.customerProjects).toEqual([archivedProject]);
    expect(state.message).toEqual('Project archived successfully!');
  });

  it('on DeleteProjectFail, message equal to Something went wrong archiving the project!', () => {
    const projectToEdit = '1';
    const action = new actions.DeleteProjectFail(projectToEdit);

    const state = projectReducer(initialState, action);
    expect(state.customerProjects).toEqual([]);
    expect(state.isLoading).toEqual(false);
    expect(state.message).toEqual('Something went wrong archiving the project!');
  });

  it('on UnarchiveProject, isLoading is true', () => {
    const action = new actions.UnarchiveProject('1');
    const state = projectReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
    expect(state.message).toEqual('Loading unarchive project');
  });

  it('on UnarchiveProjectSuccess, Project status is change to "active" in the store', () => {
    const currentState: ProjectState = {
      projects: [project],
      customerProjects: [archivedProject],
      recentProjects: [project],
      isLoading: false,
      message: '',
      projectToEdit: project,
    };
    const projectEdited: Status = { id: '1', status: 'active' };

    const action = new actions.UnarchiveProjectSuccess(projectEdited);
    const state = projectReducer(currentState, action);

    expect(state.customerProjects).toEqual([project]);
    expect(state.isLoading).toEqual(false);
  });

  it('on UnarchiveProjectFail, message equal to Something went wrong unarchiving projects!', () => {
    const action = new actions.UnarchiveProjectFail('error');
    const state = projectReducer(initialState, action);

    expect(state.customerProjects).toEqual(state.customerProjects);
    expect(state.message).toEqual('Something went wrong unarchiving projects!');
    expect(state.isLoading).toEqual(false);
  });
});
