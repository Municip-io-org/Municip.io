import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrl: './calendar-header.component.css'
})
/**
 * @class CalendarHeaderComponent
 *
 * Este componente é responsável por exibir o cabeçalho do calendário.
 *
 * @param view - O modo de visualização do calendário.
 * @param viewDate - A data de visualização do calendário.
 * @param locale - O idioma do calendário.
 * @param activeDayIsOpen - Indica se o dia ativo está aberto.
 *
 */
export class CalendarHeaderComponent  {
  @Input() view: CalendarView = CalendarView.Month;

  @Input() viewDate: Date = new Date();

  @Input() locale: string = 'pt-PT';

  @Input() activeDayIsOpen: boolean = true;

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  @Output() activeDayIsOpenChange = new EventEmitter<boolean>();

  CalendarView = CalendarView;






  /*
  * Método para mudar a visualização do calendário.
  */
  closeOpenMonthViewDay() {
    this.viewDateChange.next(this.viewDate)
    this.activeDayIsOpenChange.next(false);

  }

  

}
