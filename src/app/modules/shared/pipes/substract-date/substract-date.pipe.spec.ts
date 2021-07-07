import { SubstractDatePipe } from './substract-date.pipe';

describe('SubstractDatePipe', () => {
  it('create an instance', () => {
    const pipe = new SubstractDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('returns the date diff using hh:mm', () => {
    [
      { endDate: '2021-04-11T10:20:00Z', startDate: '2021-04-11T08:00:00Z', expectedDiff: '02:20' },
      { endDate: '2021-04-11T17:40:00Z', startDate: '2021-04-11T17:10:00Z', expectedDiff: '00:30' },
      { endDate: '2021-04-11T18:18:00Z', startDate: '2021-04-11T18:00:00Z', expectedDiff: '00:18' },
      { endDate: '2021-04-12T12:18:00Z', startDate: '2021-04-11T10:00:00Z', expectedDiff: '26:18' },
      { endDate: '2021-04-12T10:01:00Z', startDate: '2021-04-12T10:00:00Z', expectedDiff: '00:01' },
      { endDate: '2021-04-11T11:27:00Z', startDate: '2021-04-11T10:03:45Z', expectedDiff: '01:24' },
    ].forEach(({ startDate, endDate, expectedDiff }) => {
      const fromDate = new Date(endDate);
      const substractDate = new Date(startDate);

      const diff = new SubstractDatePipe().transform(fromDate, substractDate);

      expect(diff).toBe(expectedDiff);
    });
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
    const fromDate = new Date('2011-04-11T08:00:30Z');
    const substractDate = null;

    const diff = new SubstractDatePipe().transform(fromDate, substractDate);

    expect(diff).toBe('--:--');
  });

  it('returns 0 if fromDate is null when call transformInMinutes', () => {
    const fromDate = null;
    const substractDate = new Date('2011-04-11T08:00:30Z');

    const diffInMinutes = new SubstractDatePipe().transformInMinutes(fromDate, substractDate);

    expect(diffInMinutes).toBe(0);
  });

  it('returns 0 if substractDate is null when call transformInMinutes', () => {
    const fromDate = new Date('2011-04-11T08:00:30Z');
    const substractDate = null;

    const diffInMinutes = new SubstractDatePipe().transformInMinutes(fromDate, substractDate);

    expect(diffInMinutes).toBe(0);
  });

  it('returns the date diff in minutes when call transformInMinutes', () => {
    [
      { endDate: '2021-04-11T10:20:00Z', startDate: '2021-04-11T08:00:00Z', expectedDiff: 140 },
      { endDate: '2021-04-11T17:40:00Z', startDate: '2021-04-11T17:10:00Z', expectedDiff: 30 },
      { endDate: '2021-04-11T18:18:00Z', startDate: '2021-04-11T18:00:00Z', expectedDiff: 18 },
      { endDate: '2021-04-12T12:18:00Z', startDate: '2021-04-11T10:00:00Z', expectedDiff: 1578 },
      { endDate: '2021-04-12T10:01:00Z', startDate: '2021-04-12T10:00:00Z', expectedDiff: 1 },
      { endDate: '2021-04-11T11:27:00Z', startDate: '2021-04-11T10:03:00Z', expectedDiff: 84 },
    ].forEach(({ startDate, endDate, expectedDiff }) => {
      const fromDate = new Date(endDate);
      const substractDate = new Date(startDate);

      const diffInMinutes = new SubstractDatePipe().transformInMinutes(fromDate, substractDate);

      expect(diffInMinutes).toBe(expectedDiff);
    });
  });
});
