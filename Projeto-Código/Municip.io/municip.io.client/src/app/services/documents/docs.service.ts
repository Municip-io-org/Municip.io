import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  getTemplatesFromMunicipality(municipality : string): Observable<Template[]> {
    const params = { municipality: municipality };
    return this.http.get<Template[]>('api/documents/GetTemplatesFromMunicipality', { params: params });
  }

  //get all request documents
  getRequestsFromMunicipality(municipality: string): Observable<RequestDocument[]> {
    const params = { municipality: municipality };
    return this.http.get<RequestDocument[]>('api/documents/GetRequestsFromMunicipality', { params: params });
  }

  //get all request documents
  GetRequestsFromCitizen(email: string): Observable<RequestDocument[]> {
    const params = { email: email };
    return this.http.get<RequestDocument[]>('api/documents/GetRequestsFromCitizen', { params: params });
  }

  createTemplate(template: any): Observable<any> {



    return this.http.post<any>('/api/documents/CreateTemplate', template);



  }
}

export interface RequestDocument {
  Id: number,
  DocumentTemplateId: number,
  Name: string,
  Citizen: Citizen,
  Municipality: string,
  DocumentStatus: StatusDocument,
  Date: Date,
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

export interface Template {
  Name: string,
  Description: string,
  Type: string,
  Price: number,
  TextTemplate: string
  Municipality: string
}

