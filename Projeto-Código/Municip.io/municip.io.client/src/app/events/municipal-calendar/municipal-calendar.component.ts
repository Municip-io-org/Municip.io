import { Component } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';


import { EventsService } from '../../services/events/events.service';
import { Event } from '../../services/events/events.service';
import { Observable, map } from 'rxjs';
import { UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-municipal-calendar',
  templateUrl: './municipal-calendar.component.html',
  styleUrl: './municipal-calendar.component.css'
})
/**
 * @class MunicipalCalendarComponent
 *
 * Este componente é responsável por exibir o calendário municipal.
 *
 * @param events$ - Os eventos.
 * @param municipalityImage - A imagem do município.
 * @param municipalityName - O nome do município.
 * @param eventsToday - O estado dos eventos de hoje.
 * 
 * 
 * @returns O calendário municipal.
 *
 **/
export class MunicipalCalendarComponent {

  /**
   * @constructor
   *
   * MunicipalCalendarComponent 
   * 
   * Construtor do componente.
   * @param eventService - O serviço de eventos.
   * @param authService - O serviço de autenticação de utilizador.
   *
   */
  constructor(private eventService: EventsService, private authService: UserAuthService, private router: Router) { }

  events$: Observable<CalendarEvent<{ event: Event }>[]> = new Observable<CalendarEvent<{ event: Event }>[]>();

  municipalityImage: string = "";
  municipalityName: string = "";

  eventsToday: boolean = false;
  /**
   * Método executado ao inicializar o componente.
   */
  ngOnInit(): void {

    this.authService.getUserData().subscribe((user) => {
      this.authService.getInfoByEmail(user.email).subscribe((account) => {
        this.authService.getInfoMunicipality(account.municipality).subscribe((municipality) => {
          this.municipalityImage = municipality.landscapePhoto;
          this.municipalityName = municipality.name;

          this.events$ = this.eventService.getEventByMunicipality(municipality.name).pipe(
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

        });
      });

    });
  }

  /**
   * Método para navegar para a página de criação de evento.
   */
  goToEventsPage() {
    this.router.navigateByUrl(`events`);
  }
}
