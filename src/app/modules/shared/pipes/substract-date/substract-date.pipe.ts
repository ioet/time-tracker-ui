import { NumberFormatter } from './../../formatters/number.formatter';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { DATE_FORMAT_YEAR } from 'src/environments/environment';
@Pipe({
  name: 'substractDate'
})
export class SubstractDatePipe implements PipeTransform {

  transform(fromDate: Date, substractDate: Date, displaySeconds: boolean = false): string {

    if (fromDate === null || substractDate === null ) {
      return '--:--';
    }

    const startDate = moment(substractDate, `${DATE_FORMAT_YEAR} HH:mm:ss`);
    let endDate = moment(fromDate, `${DATE_FORMAT_YEAR} HH:mm:ss`);
    let duration: moment.Duration = moment.duration(endDate.diff(startDate));

    if (duration.asSeconds() > 60 && !displaySeconds) {
      endDate = endDate.add(1, 'minute').startOf('minute');
      duration = moment.duration(endDate.diff(startDate));
      return `${ this.formatTime(duration.hours())}:${this.formatTime(duration.minutes()) }`;
    } else {
      return `${ this.formatTime(duration.hours())}:${this.formatTime(duration.minutes())}:${this.formatTime(duration.seconds())}`;
    }
  }

  formatTime(time: number): string {
    return new NumberFormatter(time).getAsAtLeastTwoDigitString();
  }

}
