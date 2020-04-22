import { FilterProjectPipe } from './filter-project.pipe';
import { Project } from '../../../shared/models';

describe('FilterProjectPipe', () => {
  const projects: Project[] = [
    {
      id: '1',
      name: 'App 1',
      description: 'It is a good app',
      project_type_id: '123',
    },
    {
      id: '2',
      name: 'app 2',
      description: 'It is a good app',
      project_type_id: '124',
    },
    {
      id: '3',
      name: 'App 3',
      description: 'It is a good app',
      project_type_id: '125',
    },
  ];

  it('create an instance', () => {
    const pipe = new FilterProjectPipe();
    expect(pipe).toBeTruthy();
  });

  it('test method of pipe #transform', () => {
    const restultProjects = projects;
    const searchProject = 'app 1';
    const result = new FilterProjectPipe().transform(restultProjects, searchProject);
    expect(result.length).toEqual(1);
  });

  it('test method of pipe #transform without element', () => {
    const restultProjects = projects;
    const searchProject = 'app 4';
    const result = new FilterProjectPipe().transform(restultProjects, searchProject);
    expect(result.length).toEqual(0);
  });
});
