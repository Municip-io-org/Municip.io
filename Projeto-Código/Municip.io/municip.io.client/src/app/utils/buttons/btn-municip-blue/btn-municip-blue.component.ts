import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-municip-blue',
  templateUrl: './btn-municip-blue.component.html',
  styleUrl: './btn-municip-blue.component.css'
})
export class BtnMunicipBlueComponent {
    @Input() text: string = "";
}
