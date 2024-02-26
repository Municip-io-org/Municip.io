import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-one-button-dialog',
  templateUrl: './one-button-dialog.component.html',
  styleUrl: './one-button-dialog.component.css'
})
export class OneButtonDialogComponent {
  @Input() title: string = "";
  @Input() message: string = "";
  @Output() confirm= new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }


}
