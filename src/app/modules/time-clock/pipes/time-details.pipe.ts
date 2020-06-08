import { TimeDetails } from '../models/time.entry.summary';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDetails'
})
export class TimeDetailsPipe implements PipeTransform {

  transform(value: TimeDetails): string {
    if (value) {
      return `${this.formatAsTwoDigit(value.hours)}:${this.formatAsTwoDigit(value.minutes)}`;
    } else {
      return '--:--';
    }
  }

  formatAsTwoDigit(time: string): string {
    // tslint:disable-next-line:no-construct
    const stringLength = new String(time).length;
    const formattedTime = (stringLength === 1) ? `0${time}` : time;
    return formattedTime;
  }
}
