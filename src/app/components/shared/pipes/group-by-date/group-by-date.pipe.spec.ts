import { GroupByDatePipe } from './group-by-date.pipe';

describe('GroupByDatePipe', () => {
  it('create an instance', () => {
    const pipe = new GroupByDatePipe();
    expect(pipe).toBeTruthy();
  });
});
