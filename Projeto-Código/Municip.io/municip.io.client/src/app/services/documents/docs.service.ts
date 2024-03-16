import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Observable, of } from 'rxjs';
import { Citizen } from '../citizen-auth.service';

@Injectable({
  providedIn: 'root'
})
export class DocsService {
 

  constructor(private http : HttpClient) { }

  //get all documents
  getTemplatesFromMunicipality(municipality : string): Observable<DocumentTemplate[]> {
    const params = { municipality: municipality };
    return this.http.get<DocumentTemplate[]>('api/documents/GetTemplatesFromMunicipality', { params: params });
  }

  GetDistinctDocumentTypesFromMunicipality(municipality : string): Observable<string[]> {
  console.log(municipality+'dasd');
    return this.http.get<string[]>(`api/documents/GetDistinctDocumentTypesFromMunicipality?municipality=${municipality}`);
  }

  //get all request documents
  getRequestsFromMunicipality(municipality: string): Observable<RequestDocument[]> {
    const params = { municipality: municipality };
    return this.http.get<RequestDocument[]>('api/documents/GetRequestsFromMunicipality', { params: params });
  }

  //get all request documents
  getRequestsFromCitizen(email: string): Observable<RequestDocument[]> {
    const params = { email: email };
    return this.http.get<RequestDocument[]>('api/documents/GetRequestsFromCitizen', { params: params });
  }

  createTemplate(template: any): Observable<any> {



    return this.http.post<any>('/api/documents/CreateTemplate', template);



  }

  createRequest(email: string, documentRequest: RequestDocument): Observable<any> {
    let params = new HttpParams()
      .set('email', email.toString())
      
      


    
    return this.http.post<any>('api/documents/CreateRequest', documentRequest, { params: params });
  }

}

export interface RequestDocument {
  id?: number,
  documentTemplate: DocumentTemplate,
  name: string,
  citizen: Citizen,
  municipality: string,
  status: StatusDocument,
  date: Date,
}

 
export enum StatusDocument {
  pending = 'Pending',
  approved = 'Approved',
  rejected = 'Rejeitado',
  waitingForPayment = 'WaitingForPayment',
}


//create a to string for the enum
export function statusToString(status: StatusDocument): string {
  switch (status) {
    case StatusDocument.pending:
      return "Pendente";
    case StatusDocument.approved:
      return "Aprovado";
    case StatusDocument.rejected:
      return "Rejeitado";
    case StatusDocument.waitingForPayment:
      return "À espera de pagamento";
  }
}


export enum DocumentType {
  Requirement = "Requerimento",
  Alvara = 'Alvará',
  Certeficated = 'Certificado',
  Other = 'Outro'
}

export interface DocumentTemplate {
  name: string,
  description: string,
  type: string,
  price: number,
  textTemplate: string
  municipality: string
}

