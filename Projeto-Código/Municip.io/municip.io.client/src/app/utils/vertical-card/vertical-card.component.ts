import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vertical-card',
  templateUrl: './vertical-card.component.html',
  styleUrl: './vertical-card.component.css'
})
export class VerticalCardComponent {
  @Input() cardTitle: string = "";
  @Input() cardText: string = "";
  @Input() cardImage: string = "";

}
