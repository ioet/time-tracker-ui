export class NumberFormatter {

  constructor(private value: number) { }

  getAsAtLeastTwoDigitString(): string {
    const atLeastTwoDigit = (this.value < 10) ? '0' + this.value : this.value.toString();
    return atLeastTwoDigit;
  }
}
