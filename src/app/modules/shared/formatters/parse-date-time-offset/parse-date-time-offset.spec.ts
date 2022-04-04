import { ParseDateTimeOffset } from './parse-date-time-offset';

describe('ParseDateToUtcComponent', () => {

  it('returns converted date when his offset is 300', () => {
    let parseTimeOffset = new ParseDateTimeOffset();
    const date = '2022-03-30T13:00:00Z';
    const timezone_offset = 300;
    const dateOffset:string = '08:00';

    expect(parseTimeOffset.parseDateTimeOffset(date, timezone_offset)).toEqual(dateOffset);
  });

  it('returns converted date when his offset is 420', () => {
    let parseTimeOffset = new ParseDateTimeOffset();
    const date = '2022-03-30T16:30:00Z';
    const timezone_offset = 420;
    const dateOffset:string = '09:30';

    expect(parseTimeOffset.parseDateTimeOffset(date, timezone_offset)).toEqual(dateOffset);
  });

});
