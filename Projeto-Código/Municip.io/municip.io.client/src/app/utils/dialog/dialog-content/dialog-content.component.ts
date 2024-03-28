import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrl: './dialog-content.component.css'
})
export class DialogContentComponent {
  @Input() title: string = "";
  @Input() message: string = "";
  @Input() confirmButtonClass = "";
  @Input() confirmButtonDisabled = false;

  @Input() cancelText: string = "Cancelar";
  @Input() confirmText: string = "Proceder";
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();


  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) { }

  onConfirm(): void {
    this.renderer.removeClass(this.document.body, 'overflow-hidden');
    this.confirm.emit();
  }

  onCancel(): void {
    this.renderer.removeClass(this.document.body, 'overflow-hidden');
    this.cancel.emit();
  }

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'overflow-hidden');
  }

}
