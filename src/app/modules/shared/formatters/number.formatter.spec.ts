import { NumberFormatter } from './number.formatter';
describe('NumberFormatter', () => {

  it('adds a 0 if value < 10', () => {
    const numberFormatter = new NumberFormatter(9);

    expect(numberFormatter.getAsAtLeastTwoDigitString()).toEqual('09');
  });

  it('returns the same value if number < 10', () => {
    const numberMajorThan10 = 19;
    const numberFormatter = new NumberFormatter(numberMajorThan10);

    expect(numberFormatter.getAsAtLeastTwoDigitString()).toEqual(numberMajorThan10.toString());
  });

});
