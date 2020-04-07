import { FilterProjectPipe } from './filter-project.pipe';
import { Project } from '../../../shared/models';

describe('FilterProjectPipe', () => {
  const projects: Project[] = [
    {
      id: '1',
      name: 'app 1',
      description: 'It is a good app',
    },
    {
      id: '2',
      name: 'app 2',
      description: 'It is a good app',
    },
    {
      id: '3',
      name: 'app 3',
      description: 'It is a good app',
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
});
