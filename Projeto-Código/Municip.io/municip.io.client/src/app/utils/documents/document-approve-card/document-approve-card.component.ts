import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { RequestDocument, StatusDocument, statusToString } from '../../../services/documents/docs.service';


@Component({
  selector: 'app-document-approve-card',
  templateUrl: './document-approve-card.component.html',
  styleUrl: './document-approve-card.component.css'
})
export class DocumentApproveCardComponent {
  @Input() document!: RequestDocument;
  @Output() deleteDoc = new EventEmitter<number>();
  @Output() waitPayment = new EventEmitter<number>();
  

  /**
   * Estilos diferentes para cada estado do documento
   * @returns
   */
  getStatusClass(): string {
    if (this.document.status === StatusDocument.approved) {
      return 'bg-[#08BC25] text-[#1D8702]';
    } else if (this.document.status === StatusDocument.pending) {
      return 'bg-[#F4A42C] text-[#9B4F08]';
    } else {
      return 'bg-[#FF0000] text-[#B02121]';
    }
  }

  getStatusString(status: StatusDocument): string {
    return statusToString(status)
  }
  /**
   * Colocar o documento em estado de espera de pagamento
   * @param doc
   */
  waitingPayment(doc: any) {
    
    this.waitPayment.emit(doc);
  }
  /**
   * Rejeitar documento
   * @param doc
   */
  rejectDocument(doc: any) {
    this.deleteDoc.emit(doc);

  }


  
}
