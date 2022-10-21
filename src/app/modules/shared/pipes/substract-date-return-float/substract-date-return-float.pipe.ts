import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

let FIXED_POINT_DIGITS 1;
@Pipe({
  name: 'substractDateDisplayAsFloat'
})
export class SubstractDatePipeDisplayAsFloat implements PipeTransform {

  transform(fromDate: Date, substractDate: Date): string {

    if (fromDate === null || substractDate === null) {
      return '-.-';
    }

    const startDate = moment(substractDate);
    const endDate = moment(fromDate);
    const duration = this.getTimeDifference(startDate, endDate);
    return duration.asHours().toFixed(FIXED_POINT_DIGITS).toString();
  }

  getTimeDifference(substractDate: moment.Moment, fromDate: moment.Moment): moment.Duration {
    return moment.duration(fromDate.diff(substractDate));
  }

}
