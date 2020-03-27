import { FilterProjectPipe } from './filter-project.pipe';
import { Project } from '../../../../interfaces/project';

describe('FilterProjectPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterProjectPipe();
    expect(pipe).toBeTruthy();
  });

  it('test method of pipe', () => {
    expect(new FilterProjectPipe().transform([] , '')).toEqual([]);
  });

});
