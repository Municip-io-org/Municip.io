import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrl: './calendar-header.component.css'
})
export class CalendarHeaderComponent  {
  @Input() view: CalendarView = CalendarView.Month;

  @Input() viewDate: Date = new Date();

  @Input() locale: string = 'pt-PT';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;




  

}
