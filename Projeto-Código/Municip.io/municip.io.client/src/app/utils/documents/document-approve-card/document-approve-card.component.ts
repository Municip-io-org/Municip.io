import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { RequestDocument, StatusDocument } from '../../../services/documents/docs.service';


@Component({
  selector: 'app-document-approve-card',
  templateUrl: './document-approve-card.component.html',
  styleUrl: './document-approve-card.component.css'
})
export class DocumentApproveCardComponent {
  @Input() document!: RequestDocument;
  @Output() deleteDoc = new EventEmitter<number>();
  @Output() waitPayment = new EventEmitter<number>();
  

  //quero dar um estilo diferente para cada status
  getStatusClass(): string {
    if (this.document.status === StatusDocument.approved) {
      return 'bg-[#08BC25] text-[#1D8702]';
    } else if (this.document.status === StatusDocument.pending) {
      console.log(this.document);
      return 'bg-[#F4A42C] text-[#9B4F08]';
    } else {
      return 'bg-[#FF0000] text-[#B02121]';
    }
  }

  waitingPayment(doc: any) {
    
    this.waitPayment.emit(doc);
  }

  rejectDocument(doc: any) {
    this.deleteDoc.emit(doc);

  }

  
}
