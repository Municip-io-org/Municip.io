import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  documents: Document[] = [
    { id: 1, type: DocumentType.ID, name: 'ID Card', status: StatusDocument.approved, date: new Date('2020-12-01') },
    { id: 2, type: DocumentType.Passport, name: 'Passport', status: StatusDocument.approved, date: new Date('2020-12-01') },
    { id: 3, type: DocumentType.DriverLicense, name: 'Driver License', status: StatusDocument.pending, date: new Date('2020-12-01') },
    { id: 4, type: DocumentType.Other, name: 'Other', status: StatusDocument.rejected, date: new Date('2020-12-01') }
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
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected'
}

export enum DocumentType {
  ID = 'ID',
  Passport = 'Passport',
  DriverLicense = 'Driver License',
  Other = 'Other'
}
