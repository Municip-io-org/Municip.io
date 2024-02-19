import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.css'
})
export class GeneralInfoComponent {
  @Input() iconSrc: string = '';
  @Input() iconAlt: string = '';
  @Input() title: string = '';
  @Input() text: string = '';
}
