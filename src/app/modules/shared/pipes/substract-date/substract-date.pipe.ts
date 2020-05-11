import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'substractDate'
})
export class SubstractDatePipe implements PipeTransform {

  transform(fromDate: Date, substractDate: Date): string {
    const difference = fromDate.valueOf() - substractDate.valueOf();

    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const hours = Math.floor(difference / (1000 * 60 * 60) % 24);

    return `${this.formatTime(hours)}:${this.formatTime(minutes)}`;
  }

  formatTime(time: number): string {
    const formattedTime = (time < 10) ? '0' + time : time.toString();
    return formattedTime;
  }

}
