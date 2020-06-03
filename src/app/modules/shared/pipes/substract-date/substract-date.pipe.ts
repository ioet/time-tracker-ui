import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'substractDate'
})
export class SubstractDatePipe implements PipeTransform {

  transform(fromDate: Date, substractDate: Date): string {

    if (fromDate === null || substractDate === null ) {
      return '--:--';
    }

    const startDate = moment(substractDate, 'YYYY-MM-DD HH:mm:ss');
    const endDate = moment(fromDate, 'YYYY-MM-DD HH:mm:ss');
    const duration: any = moment.duration(endDate.diff(startDate));
    return `${this.formatTime(duration._data.hours)}:${this.formatTime(duration._data.minutes)}:${this.formatTime(duration._data.seconds)}`;
  }

  formatTime(time: number): string {
    const formattedTime = (time < 10) ? '0' + time : time.toString();
    return formattedTime;
  }

}
