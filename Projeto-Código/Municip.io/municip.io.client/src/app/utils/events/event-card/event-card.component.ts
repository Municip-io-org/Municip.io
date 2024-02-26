import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../../../services/events/events.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input() event: Event = {
    id: '',
    title: 'Sem Titulo',
    capacity: 0,
    nRegistrations: 0,
    startDate: new Date(),
    endDate: new Date(),
    startRegistration: new Date(),
    endRegistration: new Date(),
    local: 'Sem Local',
    image: 'Sem Imagem',
    description: 'Sem Descrição'
  };

  @Input() isMunAdmin: boolean = false;

  constructor(private router: Router) { }

  goToEditEventPage(eventId: string) {
    this.router.navigateByUrl(`/events/edit/${eventId}`);
  }

  goToEventPage(eventId: string) {
    this.router.navigateByUrl(`/events/${eventId}`);
  }
}
