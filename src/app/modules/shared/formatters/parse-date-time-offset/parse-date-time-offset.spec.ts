import { ParseDateTimeOffset } from './parse-date-time-offset';

describe('ParseDateToUtcComponent', () => {

  it('returns converted date when his offset is 300', () => {
    const parseTimeOffset = new ParseDateTimeOffset();
    const date = '2022-03-30T13:00:00Z';
    const timezoneOffset = 300;
    const dateOffset = '08:00';

    expect(parseTimeOffset.parseDateTimeOffset(date, timezoneOffset)).toEqual(dateOffset);
  });

  it('returns converted date when his offset is 420', () => {
    const parseTimeOffset = new ParseDateTimeOffset();
    const date = '2022-03-30T16:30:00Z';
    const timezoneOffset = 420;
    const dateOffset = '09:30';

    expect(parseTimeOffset.parseDateTimeOffset(date, timezoneOffset)).toEqual(dateOffset);
  });

  it('returns "In progress" text when the date value is null', () => {
    const parseTimeOffset = new ParseDateTimeOffset();
    const date = null;
    const timezoneOffset = 420;
    const dateOffset = '09:30';

    expect(parseTimeOffset.parseDateTimeOffset(date, timezoneOffset)).toEqual('In progress');
  });

  it('returns "In progress" text when the date value is undefined', () => {
    const parseTimeOffset = new ParseDateTimeOffset();
    const date = undefined;
    const timezoneOffset = 420;
    const dateOffset = '09:30';

    expect(parseTimeOffset.parseDateTimeOffset(date, timezoneOffset)).toEqual('In progress');
  });

  it('returns "In progress" text when the date value is empty', () => {
    const parseTimeOffset = new ParseDateTimeOffset();
    const date = '';
    const timezoneOffset = 420;
    const dateOffset = '09:30';

    expect(parseTimeOffset.parseDateTimeOffset(date, timezoneOffset)).toEqual('In progress');
  });

});
