import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-municip-blue',
  templateUrl: './btn-municip-blue.component.html',
  styleUrl: './btn-municip-blue.component.css'
})
export class BtnMunicipBlueComponent {
    @Input() width?: string;
  @Input() text: string = "";

  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    this.buttonClick.emit();
  }
}
