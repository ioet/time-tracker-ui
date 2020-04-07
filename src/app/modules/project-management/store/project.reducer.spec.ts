import { Project } from './../../shared/models';
import * as actions from './project.actions';
import { projectReducer, ProjectState } from './project.reducer';

describe('projectReducer', () => {
  const initialState: ProjectState = { projectList: [], isLoading: false };

  it('on GetProjects, isLoading is true', () => {
    const action = new actions.GetProjectsLoad();
    const state = projectReducer(initialState, action);
    expect(state.isLoading).toEqual(true);
  });

  it('on GetProjectsSuccess, projectsFound are saved in the store', () => {
    const projectsFound: Project[] = [{ id: '', name: '', description: '' }];
    const action = new actions.GetProjectsSuccess(projectsFound);
    const state = projectReducer(initialState, action);
    expect(state.projectList).toEqual(projectsFound);
  });

  it('on GetProjectsFail, projectList equal []', () => {
    const action = new actions.GetProjectsFail('error');
    const state = projectReducer(initialState, action);
    expect(state.projectList).toEqual([]);
  });

  it('on CreateProject, isLoading is true', () => {
    const project: Project = { id: '1', name: 'Training', description: 'It is good for learning' };
    const action = new actions.CreateProject(project);
    const state = projectReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on CreateProjectSuccess, project is saved in the store', () => {
    const project: Project = { id: '1', name: 'Training', description: 'It is good for learning' };
    const action = new actions.CreateProjectSuccess(project);
    const state = projectReducer(initialState, action);

    expect(state.projectList).toEqual([project]);
    expect(state.isLoading).toEqual(false);
  });

  it('on CreateProjectFail, projectList equal []', () => {
    const action = new actions.CreateProjectFail('error');
    const state = projectReducer(initialState, action);

    expect(state.projectList).toEqual([]);
    expect(state.isLoading).toEqual(false);
  });

  it('on UpdateProject, isLoading is true', () => {
    const project: Project = { id: '1', name: 'Training', description: 'It is good for learning' };
    const action = new actions.UpdateProject(project);
    const state = projectReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on UpdateProjectSuccess, project is saved in the store', () => {
    const project: Project = { id: '1', name: 'Training', description: 'It is good for learning' };
    const currentState: ProjectState = { projectList: [project], isLoading: false };
    const action = new actions.UpdateProjectSuccess(project);
    const state = projectReducer(currentState, action);

    expect(state.projectList).toEqual([project]);
    expect(state.isLoading).toEqual(false);
  });

  it('on UpdateProjectFail, projectList equal []', () => {
    const action = new actions.UpdateProjectFail('error');
    const state = projectReducer(initialState, action);

    expect(state.projectList).toEqual([]);
    expect(state.isLoading).toEqual(false);
  });
});
