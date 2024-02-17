import { ChangeDetectionStrategy, Component, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent, CalendarEventTitleFormatter, CalendarMonthViewDay, CalendarView, CalendarWeekViewBeforeRenderEvent } from 'angular-calendar';


import { CustomDateFormatterService } from '../../../services/custom-date-formatter.service';
import { isSameDay, isSameMonth } from 'date-fns';
import { CustomEventTitleFormatterService } from '../../../services/custom-event-title-formatter.service';
import { Citizen } from '../../../services/citizen-auth.service';
import { EventsService } from '../../../services/events/events.service';
import { Event } from '../../../services/events/events.service';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { UserAuthService } from '../../../services/user-auth.service';

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

  constructor(private eventService: EventsService, private authService: UserAuthService
    , private router: Router) { }



  ngOnInit(): void {


    this.authService.getUserData().subscribe((user) => {
      this.events$ = this.eventService.getUserEvents(user.email).pipe(
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
    },
      (error) => {
        console.error(error);
      }
    );
  }




  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events$: Observable<CalendarEvent<{ event: Event }>[]> = new Observable<CalendarEvent<{ event: Event }>[]>();



  locale: string = 'pt-PT';



  activeDayIsOpen: boolean = true;




  dayClicked({ date, events }: { date: Date; events: CalendarEvent<{ event: Event }>[] }): void {
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


  eventClicked(event: CalendarEvent<{ event: Event }>): void {
    //user router to navigate to /events/1
    this.router.navigate(['/']);

  }
}
