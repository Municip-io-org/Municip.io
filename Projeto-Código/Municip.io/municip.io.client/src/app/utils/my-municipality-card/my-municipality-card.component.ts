import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-municipality-card',
  templateUrl: './my-municipality-card.component.html',
  styleUrl: './my-municipality-card.component.css'
})
export class MyMunicipalityCardComponent {
  @Input() county: string = "";
  @Input() nPopulation: string = "";
  @Input() email: string = "";
  @Input() phoneNumber: string = "";
  @Input() emblem: string = "";
}
