import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-team',
  templateUrl: './card-team.component.html',
  styleUrl: './card-team.component.css'
})
  /**
   * @class CardTeamComponent
   *
   * Este componente é responsável por exibir um cartão com o nome, descrição e foto do membro da equipa.
   * 
   * @input cardName - O nome do membro da equipa.
   * @input cardDescription - A descrição do membro da equipa.
   * @input cardPhoto - A foto do membro da equipa.
   *
   * @returns A card with the team member's name, description and photo.
   *
   **/

export class CardTeamComponent {
  @Input() cardName: string = "";
  @Input() cardDescription: string = "";
  @Input() cardPhoto: string = "";
}


