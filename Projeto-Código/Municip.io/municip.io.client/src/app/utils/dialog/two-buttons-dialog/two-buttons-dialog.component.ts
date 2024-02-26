import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-two-buttons-dialog',
  templateUrl: './two-buttons-dialog.component.html',
  styleUrl: './two-buttons-dialog.component.css'
})
export class TwoButtonsDialogComponent {
  @Input() title: string = "";
  @Input() message: string = "";
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onCancel(): void {
    this.cancel.emit();
  }

  onConfirm(): void {
    this.confirm.emit();
  }



}
