import * as selectors from './project-type.selectors';
import { ProjectType } from '../../../../shared/models/project-type.model';
describe('ProjectTypeSelectors', () => {
  it('should select allProjectTypes', () => {
    const projectType = [{ id: 'id', name: 'abc', description: 'xxx' }];
    const projectTypeState = { data: projectType };

    expect(selectors.allProjectTypes.projector(projectTypeState)).toBe(projectType);
  });

  it('should select projectTypeIdToEdit', () => {
    const projectType = 'projectTypeId';
    const projectTypeState = { projectTypeIdToEdit: projectType };

    expect(selectors.projectTypeIdToEdit.projector(projectTypeState)).toBe(projectType);
  });

  it('should select getProjectTypeById', () => {
    const projectTypes = [
      { id: 'id', name: 'abc', description: 'xxx' },
      { id: 'id2', name: 'abc2', description: 'xxx' },
    ];
    const projectTypeId = 'id';
    const projectTypeExpect = { id: 'id', name: 'abc', description: 'xxx' };

    expect(selectors.getProjectTypeById.projector(projectTypes, projectTypeId)).toEqual(projectTypeExpect);
  });
});
