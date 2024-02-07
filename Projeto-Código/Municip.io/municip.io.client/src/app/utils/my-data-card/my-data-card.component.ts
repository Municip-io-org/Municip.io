import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-data-card',
  templateUrl: './my-data-card.component.html',
  styleUrl: './my-data-card.component.css'
})
export class MyDataCardComponent {
  @Input() firstName: string = "";
  @Input() lastName: string = "";
  @Input() email: string = "";
  @Input() birthDate: Date | undefined;
  @Input() address: string = "";
  @Input() nif: string = "";
  @Input() profilePicture: string = "";
}
