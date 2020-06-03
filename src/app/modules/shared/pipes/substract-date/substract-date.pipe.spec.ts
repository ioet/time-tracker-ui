import { SubstractDatePipe } from './substract-date.pipe';

describe('SubstractDatePipe', () => {
  it('create an instance', () => {
    const pipe = new SubstractDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('returns the date diff', () => {
    const fromDate = new Date('2011-04-11T10:20:40Z');
    const substractDate = new Date('2011-04-11T08:00:30Z');

    const diff = new SubstractDatePipe().transform(fromDate, substractDate);

    expect(diff).toBe('02:20:10');
  });

  it('returns --:-- if fromDate is null', () => {
    const fromDate = null;
    const substractDate = new Date('2011-04-11T08:00:30Z');

    const diff = new SubstractDatePipe().transform(fromDate, substractDate);

    expect(diff).toBe('--:--');
  });

  it('returns --:-- if substractDate is null', () => {
    const substractDate = null;
    const fromDate = new Date('2011-04-11T08:00:30Z');

    const diff = new SubstractDatePipe().transform(fromDate, substractDate);

    expect(diff).toBe('--:--');
  });
});
