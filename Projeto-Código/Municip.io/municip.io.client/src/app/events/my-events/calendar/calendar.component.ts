import { ChangeDetectionStrategy, Component, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent, CalendarEventTitleFormatter, CalendarMonthViewDay, CalendarView, CalendarWeekViewBeforeRenderEvent } from 'angular-calendar';


import { CustomDateFormatterService } from '../../../services/custom-date-formatter.service';
import { isSameDay, isSameMonth } from 'date-fns';
import { CustomEventTitleFormatterService } from '../../../services/custom-event-title-formatter.service';
import { Citizen } from '../../../services/citizen-auth.service';
import { EventsService } from '../../../services/events/events.service';
import { Event } from '../../../services/events/events.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatterService,
    },
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatterService,
    },
  ],
})
export class CalendarComponent implements OnInit {

  constructor(private eventService: EventsService) { }



  ngOnInit(): void {
    this.events$ = this.eventService.getEvents().pipe(
      map((events) => {
        return events.map((event) => {
          return {
            title: event.title,
            start: new Date(event.startDate),
            end: new Date(event.endDate),
            cssClass: 'event-cell',
            meta: {
              event: event
            }
          }
        });
      })
    );
  }




  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events$: Observable<CalendarEvent<{ event: Event }>[]> = new Observable<CalendarEvent<{ event: Event }>[]>()
  //events: CalendarEvent[] = [
  //  //  {
  //  //    title: 'Click me',
  //  //    start: new Date(),
  //  //    cssClass: 'event-cell',
  //  //  },
  //  //  {
  //  //    title: 'Or click me',
  //  //    start: new Date(),
  //  //    cssClass: 'event-cell',
  //  //  },

  //  //  {
  //  //    title: 'Or click me',
  //  //    start: new Date(new Date().setHours(15, 0, 0, 0)),
  //  //    end: new Date(new Date().setHours(16, 0, 0, 0)),
  //  //    cssClass:'event-cell',
  //  //  }

  //]



  locale: string = 'pt-PT';



  activeDayIsOpen: boolean = true;




  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }







  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (day.date.getMonth() === new Date().getMonth() && day.date.getDate() === new Date().getDate() && day.date.getFullYear() === new Date().getFullYear()) {
        day.cssClass = 'blue-cell';
      }
    });


  }

  beforeWeekViewRender(body: CalendarWeekViewBeforeRenderEvent): void {
    body.header.forEach(day => {
      if (day.date.getMonth() === new Date().getMonth() && day.date.getDate() === new Date().getDate() && day.date.getFullYear() === new Date().getFullYear()) {
        day.cssClass = 'blue-cell';
      }
    });
  }


  eventClicked(event: CalendarEvent<{ film: Citizen }>): void {
    //TODO: change this when there is events
    //window.open(
    //  `https://www.themoviedb.org/movie/${event.meta.film.id}`,
    //  '_blank'
    //);
    //navigate to /events/1

    window.open(
      "https://goog.com",
      '_blank'
    )

  }
}
