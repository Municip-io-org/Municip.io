import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';

import { DOCUMENT } from '@angular/common';

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


  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) { }


  onCancel(): void {
    this.renderer.removeClass(this.document.body, 'overflow-hidden');
    this.cancel.emit();
  }

  onConfirm(): void {
    this.renderer.removeClass(this.document.body, 'overflow-hidden');
    this.confirm.emit();
  }


  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'overflow-hidden');
  }


}
