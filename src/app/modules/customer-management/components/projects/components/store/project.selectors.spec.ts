import * as selectors from './project.selectors';

describe('ProjectSelectors', () => {
  it('should select getCustomerProjects', () => {
    const projectState = {
      projects: [],
      customerProjects: [],
      isLoading: true,
      message: '',
      projectToEdit: { id: 'id', name: 'abc', description: 'xxx' },
    };

    expect(selectors.getCustomerProjects.projector(projectState)).toBe(projectState);
  });

  it('should select getProjects', () => {
    const project = [
      { id: 'id', name: 'abc', description: 'xxx' },
      { id: 'id', name: 'abc', description: 'xxx' },
    ];
    const projectState = { projects: project };

    expect(selectors.getProjects.projector(projectState)).toBe(project);
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
