import { SubstractDatePipe } from './substract-date.pipe';

describe('SubstractDatePipe', () => {
  it('create an instance', () => {
    const pipe = new SubstractDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('returns the date diff', () => {
    const fromDate = new Date('2011-04-11T10:20:30Z');
    const substractDate = new Date('2011-04-11T08:00:30Z');

    const diff = new SubstractDatePipe().transform(fromDate, substractDate);

    expect(diff).toBe('02:20');
  });
});
