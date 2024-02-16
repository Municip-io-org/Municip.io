import { formatDate  } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { CalendarEvent, CalendarEventTitleFormatter } from 'angular-calendar';







@Injectable({
  providedIn: 'root'
})
export class CustomEventTitleFormatterService extends CalendarEventTitleFormatter {

  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }

  // you can override any of the methods defined in the parent class

  override month(event: CalendarEvent): string {
    return `<b>${formatDate(event.start, 'HH:MM', this.locale)}</b> ${event.title
      }`;
  }

  override week(event: CalendarEvent): string {
    return `<b>${formatDate(event.start, 'HH:MM', this.locale)}</b> ${event.title
      }`;
  }

  override day(event: CalendarEvent): string {
    return `<b>${formatDate(event.start, 'HH:MM', this.locale)}</b> ${event.title
      }`;
  }
}
