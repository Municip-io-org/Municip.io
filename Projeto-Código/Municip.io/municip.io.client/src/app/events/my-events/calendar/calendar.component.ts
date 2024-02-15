import { Component, OnChanges } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent, CalendarMonthViewDay, CalendarView } from 'angular-calendar';
import { registerLocaleData } from '@angular/common';

import localePt from '@angular/common/locales/pt';
import { CustomDateFormatterService } from '../../../services/custom-date-formatter.service';
import { Subject } from 'rxjs';

registerLocaleData(localePt, 'pt-Pt');




@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatterService,
    },
  ],
})
export class CalendarComponent {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  locale: string = 'pt-Pt';




  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }





  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (day.date.getDate() === new Date().getDate()) {

        day.backgroundColor = '#5875F6';
      }
    });


  }
}
