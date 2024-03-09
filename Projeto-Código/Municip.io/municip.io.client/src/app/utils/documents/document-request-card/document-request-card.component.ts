import { Component, Input } from '@angular/core';
import { Document, DocumentType, StatusDocument } from '../../../services/documents.service';

@Component({
  selector: 'app-document-request-card',
  templateUrl: './document-request-card.component.html',
  styleUrl: './document-request-card.component.css'
})
export class DocumentRequestCardComponent {

  @Input() document: Document = {
    id: 0,
    name: 'Sem Título',
    subTitle: "Sem legenda",
    type: DocumentType.Other,
    status: StatusDocument.rejected,
    date: new Date(),
    municipality: "Sem Município"
  }
}
