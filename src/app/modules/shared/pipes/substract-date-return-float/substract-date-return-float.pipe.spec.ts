import { SubstractDatePipeDisplayAsFloat } from './substract-date-return-float.pipe';

describe('SubstractDatePipeDisplayAsFloat', () => {
  it('create an instance', () => {
    const pipe = new SubstractDatePipeDisplayAsFloat();
    expect(pipe).toBeTruthy();
  });

  it('returns the date diff as float hours (xx.x)', () => {
    [
      { endDate: '2021-04-11T10:20:00Z', startDate: '2021-04-11T08:00:00Z', expectedDiff: '2.3' },
      { endDate: '2021-04-11T17:40:00Z', startDate: '2021-04-11T17:10:00Z', expectedDiff: '0.5' },
      { endDate: '2021-04-11T18:18:00Z', startDate: '2021-04-11T18:00:00Z', expectedDiff: '0.3' },
      { endDate: '2021-04-12T12:18:00Z', startDate: '2021-04-11T10:00:00Z', expectedDiff: '26.3' },
      { endDate: '2021-04-12T10:01:00Z', startDate: '2021-04-12T10:00:00Z', expectedDiff: '0.0' },
      { endDate: '2021-04-11T11:27:00Z', startDate: '2021-04-11T10:03:45Z', expectedDiff: '1.4' },
    ].forEach(({ startDate, endDate, expectedDiff }) => {
      const fromDate = new Date(endDate);
      const substractDate = new Date(startDate);

      const diff = new SubstractDatePipeDisplayAsFloat().transform(fromDate, substractDate);

      expect(diff).toBe(expectedDiff);
    });
  });

  it('returns -.- if fromDate is null', () => {
    const fromDate = null;
    const substractDate = new Date('2011-04-11T08:00:30Z');

    const diff = new SubstractDatePipeDisplayAsFloat().transform(fromDate, substractDate);

    expect(diff).toBe('-.-');
  });

  it('returns -.- if substractDate is null', () => {
    const fromDate = new Date('2011-04-11T08:00:30Z');
    const substractDate = null;

    const diff = new SubstractDatePipeDisplayAsFloat().transform(fromDate, substractDate);

    expect(diff).toBe('-.-');
  });

});
