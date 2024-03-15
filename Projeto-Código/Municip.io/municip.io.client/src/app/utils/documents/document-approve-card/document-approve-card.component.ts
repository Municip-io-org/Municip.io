import { Component, Input } from '@angular/core';
import { RequestDocument, StatusDocument } from '../../../services/documents/docs.service';


@Component({
  selector: 'app-document-approve-card',
  templateUrl: './document-approve-card.component.html',
  styleUrl: './document-approve-card.component.css'
})
export class DocumentApproveCardComponent {
  @Input() document: RequestDocument = {
      id: 0,
      name: 'Certeficado De Residência',
      documentStatus: StatusDocument.rejected,
      date: new Date(),
      municipality: "",
      citizen: {
          firstName: '',
          surname: '',
          email: '',
          password: '',
          nif: '',
          gender: '',
          municipality: '',
          address: '',
          postalCode1: '',
          postalCode2: '',
          birthDate: new Date
      },
    documentTemplate: {
      name: 'Sem Título',
      description: 'Sem descrição',
      type: 'Sem Tipo',
      price: 0,
      textTemplate: 'Sem template',
      municipality: 'Sem município'
    }
  }

  //quero dar um estilo diferente para cada status
  getStatusClass(): string {
    if (this.document.documentStatus === StatusDocument.approved) {
      return 'bg-[#08BC25] text-[#1D8702]';
    } else if (this.document.documentStatus === StatusDocument.pending) {
      return 'bg-[#F4A42C] text-[#9B4F08]';
    } else {
      return 'bg-[#FF0000] text-[#B02121]';
    }
  }
}
