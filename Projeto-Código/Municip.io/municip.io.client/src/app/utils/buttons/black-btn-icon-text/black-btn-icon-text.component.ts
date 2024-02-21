import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-black-btn-icon-text',
  templateUrl: './black-btn-icon-text.component.html',
  styleUrl: './black-btn-icon-text.component.css'
})
export class BlackBtnIconTextComponent {
  @Input() altImage: string = 'Alt Aqui';
  @Input() image: string = '/assets/images/icons/pencil-white.png';
  @Output() buttonClick: EventEmitter<any> = new EventEmitter();

  onClick() {
    this.buttonClick.emit();
  }
}
