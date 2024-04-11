import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

/**
 * CardComponent
 *
 * Este componente é utilizado para a criação de um cartão.
 *
 * @param cardTitle: string - O título do cartão.
 * @param cardText: string - O texto do cartão.
 * @param cardImage: string - A imagem do cartão.
 */
export class CardComponent {
  @Input() cardTitle: string = "";
  @Input() cardText: string = "";
  @Input() cardImage: string = "";
}
