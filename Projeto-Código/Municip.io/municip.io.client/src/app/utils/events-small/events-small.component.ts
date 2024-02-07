import { formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-events-small',
  templateUrl: './events-small.component.html',
  styleUrl: './events-small.component.css'
})
export class EventsSmallComponent {
  @Input() image: string = "";
  @Input() title: string = "";
  @Input() date: Date | undefined;

}

