import { Component } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';


import { EventsService } from '../../../services/events/events.service';
import { Event } from '../../../services/events/events.service';
import { Observable, map } from 'rxjs';
import { UserAuthService } from '../../../services/user-auth.service';


@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.css'
})
/**
 * @class CalendarPageComponent
 *
 * Este componente é responsável por exibir a página do calendário.
 *
 * @param events$ - Os eventos do calendário.
 * @param municipalityImage - A imagem do município.
 * @param eventsToday - O estado dos eventos de hoje.
 * 
 * 
 * @returns A página do calendário.
 *
 **/
export class CalendarPageComponent {

  /**
   * @constructor
   *
   * CalendarPageComponent 
   * 
   * Construtor do componente.
   * @param eventService - O serviço de eventos.
   * @param authService - O serviço de autenticação de utilizador.
   *
   */
  constructor(private eventService: EventsService, private authService: UserAuthService) { }

  events$: Observable<CalendarEvent<{ event: Event }>[]> = new Observable<CalendarEvent<{ event: Event }>[]>();
  municipalityImage: string = "";

  eventsToday: boolean = false;

  /**
   * Método executado ao inicializar o componente.
   */
  ngOnInit(): void {

    this.authService.getUserData().subscribe((user) => {
      this.authService.getInfoByEmail(user.email).subscribe((account) => {
        this.authService.getInfoMunicipality(account.municipality).subscribe((municipality) => {
          this.municipalityImage = municipality.landscapePhoto;
        });
      });

    });

    // Obtém os dados do usuário autenticado
    this.authService.getUserData().subscribe((user) => {
      // Obtém os eventos do usuário
      this.events$ = this.eventService.getUserEvents(user.email).pipe(
        map((events) => {
          return events.map((event) => {
            //check if the event is today
            let today = new Date();
            let start = new Date(event.startDate);
            let end = new Date(event.endDate);

            if (start <= today && today <= end) {
              this.eventsToday = true;
            }

            return {
              title: event.title,
              start: new Date(event.startDate),
              end: new Date(event.endDate),
              cssClass: 'event-cell',
              meta: {
                event: event
              }
            };
          });
        })
      );
    },
      (error) => {
        console.error(error);
      });
  }
}
