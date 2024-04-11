import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
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
/**
 * @class CalendarComponent
 *
 * Este componente é responsável por exibir um calendário de eventos.
 *
 * @param view - O modo de visualização do calendário.
 * @param viewDate - A data de visualização do calendário.
 * @param events$ - Os eventos do calendário.
 * @param locale - O idioma do calendário.
 * @param activeDayIsOpen - Indica se o dia ativo está aberto.
 *
 */
export class CalendarComponent implements OnInit {

  /**
   * Construtor da classe CalendarComponent.
   * @param eventService O serviço responsável por lidar com os eventos.
   * @param authService O serviço responsável pela autenticação do usuário.
   * @param router O serviço de roteamento para navegar para outras páginas.
   */
  constructor(private eventService: EventsService, private authService: UserAuthService, private router: Router) { }

  /**
   * Método executado ao inicializar o componente.
   */
  ngOnInit(): void {


  }

  /**
   * O modo de visualização do calendário.
   */
  view: CalendarView = CalendarView.Month;

  /**
   * A data de visualização do calendário.
   */
  viewDate: Date = new Date();

  /**
   * Os eventos do calendário.
   */
  @Input() events$: Observable<CalendarEvent<{ event: Event }>[]> = new Observable<CalendarEvent<{ event: Event }>[]>();

  /**
   * O idioma do calendário.
   */
  locale: string = 'pt-PT';

  /**
   * Indica se o dia ativo está aberto.
   */
  @Input() activeDayIsOpen: boolean = true;

  /**
   * Manipula o evento de clique em um dia do calendário.
   * @param date A data do dia clicado.
   * @param events Os eventos do dia clicado.
   */
  dayClicked({ date, events }: { date: Date; events: CalendarEvent<{ event: Event }>[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  /**
   * Manipula o evento antes de renderizar a visualização mensal do calendário.
   * @param body Os dias do mês a serem renderizados.
   */
  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (day.date.getMonth() === new Date().getMonth() && day.date.getDate() === new Date().getDate() && day.date.getFullYear() === new Date().getFullYear()) {
        day.cssClass = 'blue-cell';
      }
    });
  }

  /**
   * Manipula o evento antes de renderizar a visualização semanal do calendário.
   * @param body Os dias da semana a serem renderizados.
   */
  beforeWeekViewRender(body: CalendarWeekViewBeforeRenderEvent): void {
    body.header.forEach(day => {
      if (day.date.getMonth() === new Date().getMonth() && day.date.getDate() === new Date().getDate() && day.date.getFullYear() === new Date().getFullYear()) {
        day.cssClass = 'blue-cell';
      }
    });
  }

  /**
   * Manipula o evento de clique em um evento do calendário.
   * @param event O evento clicado.
   */
  eventClicked(event: CalendarEvent<{ event: Event }>): void {
    // Navega para a página de detalhes do evento
    this.router.navigate(['/events', event.meta?.event.id]);
  }
}
