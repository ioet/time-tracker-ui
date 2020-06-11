import { TimeDetailsPipe } from './time-details.pipe';

describe('TimeDetailsPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeDetailsPipe();
    expect(pipe).toBeTruthy();
  });

  it('adds a 0 if has one number', () => {
    const pipe = new TimeDetailsPipe();
    expect(pipe.formatAsTwoDigit('5')).toBe('05');
  });

  it('returns the same data if number has 2 digits', () => {
    const pipe = new TimeDetailsPipe();
    expect(pipe.formatAsTwoDigit('15')).toBe('15');
  });

  it('formats hour in expected format', () => {
    const timeDetails = { hours: '1', minutes: '9', seconds: '00'};
    const pipe = new TimeDetailsPipe();
    expect('01:09').toBe(pipe.transform(timeDetails));
  });

  it('returns --:-- when timeDetails is null', () => {
    const timeDetails = null;
    const pipe = new TimeDetailsPipe();
    expect('--:--').toBe(pipe.transform(timeDetails));
  });
});
