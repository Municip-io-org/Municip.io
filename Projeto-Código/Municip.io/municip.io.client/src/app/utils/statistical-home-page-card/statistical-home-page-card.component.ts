import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-statistical-home-page-card',
  templateUrl: './statistical-home-page-card.component.html',
  styleUrls: ['./statistical-home-page-card.component.css']
})
export class StatisticalHomePageCardComponent {
  @Input() iconSrc: string = '';
  @Input() iconAlt: string = '';
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() buttonText: string = '';

  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    this.buttonClick.emit();
  }
}
