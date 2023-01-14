import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateChange'
})
export class DateChangePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (!value) {
			return null;
		} else {
			return Math.abs(moment(value).diff(moment().format('YYYY-MM-DD'), 'years'));
		}
  }

}
