import { Component, Input } from '@angular/core';
import { Document, DocumentType, StatusDocument } from '../../../services/documents.service';

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrl: './document-card.component.css'
})
export class DocumentCardComponent {
  @Input() document: Document = {
    id: 0,
    name: 'Certeficado De Residência',
    type: DocumentType.Certeficated,
    status: StatusDocument.approved,
    date: new Date()
  }

  //quero dar um estilo diferente para cada status
  getStatusClass(): string {
    if (this.document.status === StatusDocument.approved) {
      return 'bg-[#08BC25] text-[#1D8702]';
    } else if (this.document.status === StatusDocument.pending) {
      return 'bg-[#F4A42C] text-[#9B4F08]';
    } else {
      return 'bg-[#FF0000] text-[#B02121]';
    }
  }


}
