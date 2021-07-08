import { NumberFormatter } from './../../formatters/number.formatter';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'substractDate'
})
export class SubstractDatePipe implements PipeTransform {

  transform(fromDate: Date, substractDate: Date, displaySeconds: boolean = false): string {

    if (fromDate === null || substractDate === null) {
      return '--:--';
    }

    const startDate = moment(substractDate);
    const endDate = moment(fromDate);
    let duration = this.getTimeDifference(startDate, endDate);
    const lessThanMinute = duration.asSeconds() < 60 || displaySeconds;

    if (!lessThanMinute) {
      const newStartDate = startDate.clone().seconds(0).milliseconds(0);
      const newEndDate = endDate.clone().seconds(0).milliseconds(0);
      duration = this.getTimeDifference(newStartDate, newEndDate);
    }

    return this.displayDifference(duration, lessThanMinute);
  }

  getTimeDifference(substractDate: moment.Moment, fromDate: moment.Moment): moment.Duration {
    return moment.duration(fromDate.diff(substractDate));
  }

  displayDifference(duration: moment.Duration, lessThanMinute) {
    const daysInHours = duration.days() >= 1 ? duration.days() * 24 : 0;
    const hours = this.formatTime(duration.hours() + daysInHours);
    const minutes = this.formatTime(duration.minutes());
    const seconds = lessThanMinute ? `:${this.formatTime(duration.seconds())}` : '';
    return `${hours}:${minutes}${seconds}`;
  }

  formatTime(time: number): string {
    return new NumberFormatter(time).getAsAtLeastTwoDigitString();
  }

  transformInMinutes(fromDate: Date, substractDate: Date): number{

    if (!fromDate || !substractDate) {
      return 0;
    }

    const startDate = moment(substractDate);
    const endDate = moment(fromDate);
    const duration = this.getTimeDifference(startDate, endDate);

    return duration.asMinutes();
  }
}
