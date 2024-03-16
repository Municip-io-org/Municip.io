import { Component, Input } from '@angular/core';
import { StatusDocument, DocumentType, RequestDocument, statusToString, DocumentTemplateStatus } from '../../../services/documents/docs.service';
import { Router } from '@angular/router';
import { DocsDataService } from '../../../documents/docs-data.service';


@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrl: './document-card.component.css'
})
export class DocumentCardComponent {
  @Input() document: RequestDocument = {
    name: 'Certeficado De Residência',
    status: StatusDocument.rejected,
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
      municipality: 'Sem município',
      status: DocumentTemplateStatus.active
    }
  }

  constructor(private router: Router, private documentService: DocsDataService) { }

  ngOnInit() {
    console.log(this.document)
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


  getStatusString(): string {
    return statusToString(this.document.status);
  }


  generatePDF() {
    this.documentService.document = this.document;

    this.router.navigate(['/documents/generate-pdf']);

  }




}
