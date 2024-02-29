import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-small',
  templateUrl: './events-small.component.html',
  styleUrl: './events-small.component.css'
})
export class EventsSmallComponent {
  @Input() eventId: string = "";
  @Input() image: string = "";
  @Input() title: string = "";
  @Input() date: Date | undefined;

  constructor(private router: Router) { }

  goToEventPage() {
    this.router.navigateByUrl(`events/${this.eventId}`);
  }
}
