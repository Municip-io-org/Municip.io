import { Injectable } from '@angular/core'; import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';

import { formatDate } from '@angular/common';




@Injectable({
  providedIn: 'root'
})
export class CustomDateFormatterService extends CalendarDateFormatter {


  public override dayViewHour({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'HH:mm', locale!);
  }

  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    return this.dayViewHour({ date, locale });
  }
}
