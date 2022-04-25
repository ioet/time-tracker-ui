import * as moment from 'moment';

export class ParseDateTimeOffset  {
  
  parseDateTimeOffset(date:string, offset): string{
    if(date == null || date == undefined || date == '') return 'In progress';    
    return moment.utc(date).utcOffset(-1*offset).format("HH:mm");
  }
}
