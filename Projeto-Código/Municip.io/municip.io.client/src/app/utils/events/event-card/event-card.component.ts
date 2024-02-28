import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService, Event } from '../../../services/events/events.service';

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
    description: 'Sem Descrição',
    municipality: 'Sem Municipio'
  };

  @Input() isMunAdmin: boolean = false;

  @Output() removeEventEmit: EventEmitter<string> = new EventEmitter<string>();

  


  constructor(private router: Router, private eventsService: EventsService) { }

  goToEditEventPage() {
    this.router.navigateByUrl(`/events/edit/${this.event.id}`);
  }

  goToEventPage() {
    this.router.navigateByUrl(`/events/${this.event.id}`);
  }

  

  removeEvent() {
    const eventData: string = this.event.id! + '|' + this.event.title!;
    this.removeEventEmit.emit(eventData);
  }

}
