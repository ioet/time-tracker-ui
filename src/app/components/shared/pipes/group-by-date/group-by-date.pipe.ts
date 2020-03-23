import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupByDate'
})
export class GroupByDatePipe implements PipeTransform {

  getDate(date: string) {
    return new Date(date).toLocaleDateString();
  }

  transform(groupDate: Array<any>): Array<any> {
    const newGroup = groupDate.reduce((previous, current) => {

      const endDate = this.getDate(current.endDate);
      const startDate = this.getDate(current.startDate);

      // console.log("previous[endDate] >>", previous[endDate]);
      // console.log("previous[startDate] >>", previous[startDate]);

      if (!previous[endDate]) previous[endDate] = [];
      if (!previous[startDate]) previous[startDate] = []
      /* if (!previous[endDate] || !previous[startDate]) {
        previous[endDate] = [];
        previous[startDate] = []
      } */

      if (startDate !== endDate) previous[startDate].push(current);
      previous[endDate].push(current);

      return previous;
    }, {});

    return Object.keys(newGroup).map(date => ({
      date: date,
      details: newGroup[date]
    }));
  }
}

