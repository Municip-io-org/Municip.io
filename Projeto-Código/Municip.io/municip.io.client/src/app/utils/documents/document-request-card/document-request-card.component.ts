import { Component, Input } from '@angular/core';

import { Template, StatusDocument } from '../../../services/documents/docs.service';

@Component({
  selector: 'app-document-request-card',
  templateUrl: './document-request-card.component.html',
  styleUrl: './document-request-card.component.css'
})
export class DocumentRequestCardComponent {

  @Input() template: Template = {
      Name: 'Sem Título',
      Description: "Sem legenda",
      Type: "",
      Municipality: "Sem Município",
      Price: 0,
      TextTemplate: ''
  }
}
