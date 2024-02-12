import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-userinfodialog',
  templateUrl: './userinfodialog.component.html',
  styleUrl: './userinfodialog.component.css'
})
export class UserinfodialogComponent {
  @Input() user: any;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

}
