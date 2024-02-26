import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';

import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-one-button-dialog',
  templateUrl: './one-button-dialog.component.html',
  styleUrl: './one-button-dialog.component.css'
})
export class OneButtonDialogComponent {
  @Input() title: string = "";
  @Input() message: string = "";
  @Output() confirm= new EventEmitter<void>();


  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) { }

  onConfirm(): void {
    this.renderer.removeClass(this.document.body, 'overflow-hidden');
    this.confirm.emit();
  }

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'overflow-hidden');
  }





}
