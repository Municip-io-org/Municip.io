import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-municip-blue',
  templateUrl: './btn-municip-blue.component.html',
  styleUrl: './btn-municip-blue.component.css'
})
export class BtnMunicipBlueComponent  {
  @Input() width?: string;
  @Input() text: string = "";
  @Input() disabled: boolean = false;
  @Input() buttonClass: string = "";
  @Input() type = "button";
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

 

  onClick(): void {
    this.buttonClick.emit();
  }
}
