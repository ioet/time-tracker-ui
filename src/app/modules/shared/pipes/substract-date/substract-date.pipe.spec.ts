import { SubstractDatePipe } from './substract-date.pipe';

describe('SubstractDatePipe', () => {
  it('create an instance', () => {
    const pipe = new SubstractDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('returns the date diff using hh:mm', () => {
    const fromDate = new Date('2011-04-11T10:20:40Z');
    const substractDate = new Date('2011-04-11T08:00:30Z');

    const diff = new SubstractDatePipe().transform(fromDate, substractDate);

    expect(diff).toBe('02:20');
  });

  it('returns the date diff using hh:mm:ss for a diff < 1 min when displaySeconds is true', () => {
    const fromDate = new Date('2011-04-11T10:22:40Z');
    const substractDate = new Date('2011-04-11T10:20:30Z');

    const diff = new SubstractDatePipe().transform(fromDate, substractDate, true);

    expect(diff).toBe('00:02:10');
  });

  it('returns the date diff including seconds if difference is less than a minute', () => {
    const fromDate = new Date('2011-04-11T10:20:40Z');
    const substractDate = new Date('2011-04-11T10:20:30Z');

    const diff = new SubstractDatePipe().transform(fromDate, substractDate);

    expect(diff).toBe('00:00:10');
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
