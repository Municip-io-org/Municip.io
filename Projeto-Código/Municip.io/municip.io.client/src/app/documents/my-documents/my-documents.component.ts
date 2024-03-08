import { Component } from '@angular/core';
import { DocumentsService, Document } from '../../services/documents.service';

@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.component.html',
  styleUrl: './my-documents.component.css'
})
export class MyDocumentsComponent {

  documents: Document[] = [];

  constructor(private service: DocumentsService) {
    this.documents = service.getDocuments();
  }

}
