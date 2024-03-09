import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  documents: Document[] = [
    { id: 1, type: DocumentType.Alvara, name: 'Alvará de funcionamento', status: StatusDocument.approved, date: new Date('2021-12-01') },
    { id: 2, type: DocumentType.Requirement, name: 'Requerimento de passaporte', status: StatusDocument.approved, date: new Date('2020-12-01') },
    { id: 3, type: DocumentType.Certeficated, name: 'Certificado de Residência', status: StatusDocument.pending, date: new Date('2020-12-01') },
    { id: 4, type: DocumentType.Other, name: 'Certidão de Nascimento', status: StatusDocument.rejected, date: new Date('2020-10-01') }
  ];

  constructor() { }

  //get all documents
  getDocuments(): Document[] {
    return this.documents;
  }


}


export interface Document {
  id: number;
  type: DocumentType;
  name: string;
  status: StatusDocument;
  date: Date;
}

export enum StatusDocument {
  pending = 'Pendente',
  approved = 'Aprovado',
  rejected = 'Rejeitado'
}

export enum DocumentType {
  Requirement = "Requerimento",
  Alvara = 'Alvará',
  Certeficated = 'Certificado',
  Other = 'Outro'
}
