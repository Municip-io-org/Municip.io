import { formatDate  } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { CalendarEvent, CalendarEventTitleFormatter } from 'angular-calendar';






/**
 * Serviço responsável por formatar o título de um evento.
 */
@Injectable({
  providedIn: 'root'
})
export class CustomEventTitleFormatterService extends CalendarEventTitleFormatter {

/**
   * Método construtor.
   * @param locale O idioma local.
   */
  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }

  // you can override any of the methods defined in the parent class

  /**
   *  Método para formatar a data na vista mês.
   * @param event
   * @returns O título formatado da data no mês.
   */
  override month(event: CalendarEvent): string {
    return `<b>${formatDate(event.start, 'HH:mm', this.locale)}</b> ${event.title
      }`;
  }

  /**
   * Método para formatar a data na vista semana.
   * @param event  O evento do calendário.
   * @returns O título formatado da data na semana.
   */
  override week(event: CalendarEvent): string {
    return `<b>${formatDate(event.start, 'HH:mm', this.locale)}-${formatDate(event.end || "", 'HH:mm', this.locale)}</b> ${event.title
      }`;
  }

  /**
   * Método para formatar a data na vista dia
   * @param event  O evento do calendário.
   * @returns  O título formatado da data no dia.
   */
  override day(event: CalendarEvent): string {
    return `<b>${formatDate(event.start, 'HH:mm', this.locale)}-${formatDate(event.end || "", 'HH:mm', this.locale)}</b> ${event.title
      }`;
  }
}
