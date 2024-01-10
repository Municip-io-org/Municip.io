import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-team',
  templateUrl: './card-team.component.html',
  styleUrl: './card-team.component.css'
})
export class CardTeamComponent {
  @Input() cardName: string = "";
  @Input() cardDescription: string = "";
  @Input() cardPhoto: string = "";
}


