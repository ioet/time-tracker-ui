import * as selectors from './project.selectors';

describe('ProjectSelectors', () => {
  it('should select getCustomerProjects', () => {
    const projectState = {
      projects: [],
      customerProjects: [],
      recentProjects: [],
      isLoading: true,
      message: '',
      projectToEdit: { id: 'id', name: 'abc', description: 'xxx' },
    };

    expect(selectors.getCustomerProjects.projector(projectState)).toBe(projectState);
  });

  it('should select getProjects', () => {
    const project = [
      { id: '1', name: 'abc', description: 'xxx', status: 'inactive' },
      { id: '2', name: 'abc', description: 'xxx', status: 'active' },
      { id: '3', name: 'abc', description: 'xxx', status: 'inactive' },
    ];
    const projectState = { projects: project };
    const filteredProjects = project.filter((item) => item.status === 'active');

    expect(selectors.getProjects.projector(projectState)).toEqual(filteredProjects);
  });

  it('should select getRecentProjects', () => {
    const projects = [
      { id: '1', name: 'abc', description: 'xxx', status: 'active' },
      { id: '2', name: 'abc', description: 'xxx', status: 'active' },
    ];
    const projectState = { recentProjects: projects };

    expect(selectors.getRecentProjects.projector(projectState)).toBe(projects);
  });

  it('should select getProjectsToEdit', () => {
    const project = { id: 'id', name: 'abc', description: 'xxx' };
    const projectState = { projectToEdit: project };

    expect(selectors.getProjectToEdit.projector(projectState)).toBe(project);
  });

  it('should select getIsLoading', () => {
    const isLoadingValue = true;
    const projectState = { isLoading: isLoadingValue };

    expect(selectors.getIsLoading.projector(projectState)).toBe(isLoadingValue);
  });
});
