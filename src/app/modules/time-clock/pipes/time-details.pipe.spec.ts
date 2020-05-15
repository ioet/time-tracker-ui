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
});
