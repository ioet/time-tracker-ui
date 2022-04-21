import * as moment from 'moment';

export class ParseDateTimeOffset  {
  
  parseDateTimeOffset(date:string, offset): string{    
    return moment.utc(date).utcOffset(-1*offset).format("HH:mm");
  }
}
