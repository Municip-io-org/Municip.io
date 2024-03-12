import { Component, Input } from '@angular/core';
import { Document, DocumentType, StatusDocument } from '../../../services/documents.service';

@Component({
  selector: 'app-document-approve-card',
  templateUrl: './document-approve-card.component.html',
  styleUrl: './document-approve-card.component.css'
})
export class DocumentApproveCardComponent {
  @Input() document: Document = {
    id: 0,
    name: 'Certeficado De Residência',
    subTitle: "Este requerimento de passaporte é sua porta de entrada para o mundo. Ao preencher este formulário, você está iniciando o processo que permitirá explorar novas culturas, conhecer novas pessoas e criar memórias inesquecíveis.",
    type: DocumentType.Certeficated,
    status: StatusDocument.approved,
    date: new Date(),
    municipality: "Setúbal",
    RequestBy: "Ana Maria"
    
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
