import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'utcTime'
})
export class UtcTimePipe implements PipeTransform {
  transform(value: string): any {
    if (value) {
      const date = moment.utc().format(value);
      const stillUtc = moment.utc(date).toDate();
      const local = moment(stillUtc).local().format('MM/DD/YYYY');
      return local;
    } else {
      return '';
    }
  }
}
