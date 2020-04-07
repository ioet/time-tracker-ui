import { Project } from './../../shared/models';
import * as actions from './project.actions';
import { projectReducer, AppState } from './project.reducer';

describe('projectReducer', () => {
  const initialState: AppState = { projectList: [], isLoading: false };

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

  it('on PostProject, isLoading is true', () => {
    const project: Project = { id: '1', name: 'Training', description: 'It is good for learning' };
    const action = new actions.PostProject(project);
    const state = projectReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on PostProjectSuccess, project is saved in the store', () => {
    const project: Project = { id: '1', name: 'Training', description: 'It is good for learning' };
    const action = new actions.PostProjectSuccess(project);
    const state = projectReducer(initialState, action);

    expect(state.projectList).toEqual([project]);
    expect(state.isLoading).toEqual(false);
  });

  it('on PostProjectFail, projectList equal []', () => {
    const action = new actions.PostProjectFail('error');
    const state = projectReducer(initialState, action);

    expect(state.projectList).toEqual([]);
    expect(state.isLoading).toEqual(false);
  });

  it('on PutProject, isLoading is true', () => {
    const project: Project = { id: '1', name: 'Training', description: 'It is good for learning' };
    const action = new actions.PutProject(project);
    const state = projectReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on PutProjectSuccess, project is saved in the store', () => {
    const project: Project = { id: '1', name: 'Training', description: 'It is good for learning' };
    const currentState: AppState = { projectList: [project], isLoading: false };
    const action = new actions.PutProjectSuccess(project);
    const state = projectReducer(currentState, action);

    expect(state.projectList).toEqual([project]);
    expect(state.isLoading).toEqual(false);
  });

  it('on PutProjectFail, projectList equal []', () => {
    const action = new actions.PutProjectFail('error');
    const state = projectReducer(initialState, action);

    expect(state.projectList).toEqual([]);
    expect(state.isLoading).toEqual(false);
  });
});
