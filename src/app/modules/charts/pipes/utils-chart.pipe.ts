import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'utilsCharts'
})
export class UtilsChartsPipe implements PipeTransform {

  transform(mins: number): string {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    return hours + 'H. ' + minutes + 'm.';
  }

  transformCommon(mins: number): string {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    return hours + ':' + (minutes === 0 ? '00' : minutes);
  }

}
