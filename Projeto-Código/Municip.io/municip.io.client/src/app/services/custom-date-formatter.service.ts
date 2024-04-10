import { Injectable } from '@angular/core'; import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';

import { formatDate } from '@angular/common';



/**
 * Serviço responsável por formatar a data.
 */
@Injectable({
  providedIn: 'root'
})
export class CustomDateFormatterService extends CalendarDateFormatter {

  /**
   * Método para formatar a hora na vista dia.
   * @param param0
   * @returns  a hora na vista dia.
   */
  public override dayViewHour({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'HH:mm', locale!);
  }
  /**
   * Método para formatar a hora na vista semana.
   * @param param0 
   * @returns a hora na vista semana.
   */
  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    return this.dayViewHour({ date, locale });
  }
}
