import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrl: './dialog-message.component.css'
})
export class DialogMessageComponent {
  @Input() title: string = "";
  @Input() message: string = "";
  @Input() twoButtons: boolean = false;
  @Input() isConfirm: boolean = false;
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
