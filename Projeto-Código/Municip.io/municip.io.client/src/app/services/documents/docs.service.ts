import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Observable, map, of } from 'rxjs';
import { Citizen } from '../citizen-auth.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Docs Service
 *
 * Serviço de documentos
 *
 * @param requests - Pedidos
 */
export class DocsService {

  requests: RequestDocument[] = [];

  /**
   * @constructor
   * DocsService
   *
   * @param http - HttpClient
   */
  constructor(private http: HttpClient) { }


  /**
   * Obter todos as Templates de documentos
   *
   * Obter todos os modelos de documentos
   * @params municipality - Município
   * 
   * @returns Observable de DocumentTemplate[]
   */
  getTemplatesFromMunicipality(municipality: string): Observable<DocumentTemplate[]> {
    const params = { municipality: municipality };
    return this.http.get<DocumentTemplate[]>('api/documents/GetTemplatesFromMunicipality', { params: params });
  }

  /**
   * Paginação da página de evento
   * 
   * @param page A pagina
   * @param itemsPerPage Número de itens por página
   * @param documentTemplates Os templates de documentos da pagina
   * @returns Os templates de documentos
   */
  getPaginationTemplates(page = 1, itemsPerPage = 10, documentTemplates: DocumentTemplate[]): DocumentTemplate[] {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log(documentTemplates.slice(startIndex, endIndex));
    return documentTemplates.slice(startIndex, endIndex);
  }


  /**
   * Obter o numero de pedidos por aprovar
   *
   * @param municipality - O município
   * 
   * @returns O numero de pedidos por aprovar
   */
  numberOfRequestsToApprove(municipality: string): Observable<number> {
    return this.getRequestsFromMunicipality(municipality).pipe(
      map(requests => {
        this.requests = requests;
        return this.requests.filter(request => request.status === 'Pending').length;
      })
    );
  }

  /**
   * Obter os diferentes tipos de documentos por município 
   * 
   * @param municipality - O município
   * @returns Uma lista com os diferentes tipos de documentos
   */
  GetDistinctDocumentTypesFromMunicipality(municipality: string): Observable<string[]> {
    console.log(municipality + 'dasd');
    return this.http.get<string[]>(`api/documents/GetDistinctDocumentTypesFromMunicipality?municipality=${municipality}`);
  }


  /**
   * Obtem todos os requests por município
   * 
   * @param municipality - O município
   * @returns a lista dos requests num município
   */
  getRequestsFromMunicipality(municipality: string): Observable<RequestDocument[]> {
    const params = { municipality: municipality };
    return this.http.get<RequestDocument[]>('api/documents/GetRequestsFromMunicipality', { params: params });
  }

  /**
   * Obtem todos os requests de um determinado cidadão
   * @param email - Email do cidadão
   * @returns Uma lista de requests de um cidadão
   */
  getRequestsFromCitizen(email: string): Observable<RequestDocument[]> {
    const params = { email: email };
    return this.http.get<RequestDocument[]>('api/documents/GetRequestsFromCitizen', { params: params });
  }

  /**
   * Criação de um template
   * @param template O template a criar
   * @returns A criação de um template
   */
  createTemplate(template: any): Observable<any> {
    return this.http.post<any>('/api/documents/CreateTemplate', template);
  }

  /**
   * Edição de um template
   * @param template O template a editar
   * @returns A edição de um template
   */
  editTemplate(template: DocumentTemplate, id: number): Observable<any> {
    return this.http.post<any>('/api/documents/EditTemplate', template, { params: { id: id.toString() } });
  }


  /**
   * Criação de um request
   * 
   * @param email - email de um cidadão
   * @param documentRequest - Request de um documento
   * @returns Criação de um DocumentRequest
   */
  createRequest(email: string, documentRequest: RequestDocument): Observable<any> {
    let params = new HttpParams()
      .set('email', email.toString())





    return this.http.post<any>('api/documents/CreateRequest', documentRequest, { params: params });
  }



  /**
   *
   * Cria o pagamento
   * @param documentRequest - O DocumentRequest
   * @param municipalityImage - A imagem do município
   * @param successUrl - O url de sucesso
   * @param cancelUrl - O url de Cancelamento
   * @returns
   */
  createPayment(documentRequest: RequestDocument, municipalityImage: string, successUrl: string, cancelUrl: string) {
    //criar o produto e preco
    // criar a sessao
    //enviar o email com sessão
    var citizen = documentRequest.citizen;
    var documentTemplate = documentRequest.documentTemplate;

    return this.createPriceProduct(documentTemplate.name, documentTemplate.description, municipalityImage, documentTemplate.price).subscribe((priceId) => {
      this.createSessionPayment(citizen.email, successUrl, cancelUrl, priceId.toString(), documentRequest.id!).subscribe((sessionUrl) => {
        this.sendPaymentEmail(citizen.email, citizen.firstName, sessionUrl, documentTemplate.price.toString()).subscribe((res) => {
          console.log(res);
        })
        this.sendLinkPaymentDocumentRequest(documentRequest.id!, sessionUrl).subscribe((res) => {
          console.log(res);
        });
      })
    })
  }
  /**
   * Insere o link de pagamento na base de daods
   * @param id 
   * @param link
   * @returns
   */
  sendLinkPaymentDocumentRequest(id: number, link: string): Observable<any> {
    const params = new HttpParams()
      .set('id', id.toString())
      .set('link', link);

    return this.http.post<any>('api/documents/SendLinkPayment', {}, { params });

  }


  /**
   * Cria a sessão de pagamento
   * @param email
   * @param successUrl
   * @param cancelUrl
   * @param priceId
   * @param documentRequestId
   * @returns
   */
  createSessionPayment(email: string, successUrl: string, cancelUrl: string, priceId: string, documentRequestId: number): Observable<string> {
    const params = new HttpParams()
      .set('email', email)
      .set('successUrl', successUrl)
      .set('cancelUrl', cancelUrl)
      .set('priceId', priceId)
      .set('documentRequestId', documentRequestId);

    return this.http.post<string>('api/StripePayment/createSession', {}, { params });
  }

  /**
   * Cria o preço e produto na api stipe
   * @param name
   * @param description
   * @param image
   * @param amount
   * @returns
   */
  createPriceProduct(name: string, description: string, image: string, amount: number): Observable<number> {

    const params = new HttpParams()
      .set('name', name)
      .set('description', description)
      .set('image', image)
      .set('amount', amount.toString());

    return this.http.post<number>('api/StripePayment/createPriceProduct', {}, { params });
  }

  /**
   * Envia um email para realizar o pagamento
   * @param email
   * @param name
   * @param url
   * @param amount
   * @returns
   */
  sendPaymentEmail(email: string, name: string, url: string, amount: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('name', name)
      .set('url', url)
      .set('amount', amount);

    return this.http.post<any>('api/StripePayment/sendPayment', {}, { params });
  }




  /**
   *
   * Este método coloca o estado do RequestDocument a WaitingForPayment
   * 
   * @param id - id do documento
   * @returns
   */
  waitingForPayment(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.post<any>('api/documents/WaitingForPayment', {}, { params });
  }

  /**
   *
   * Este método coloca o estado do RequestDocument a Approved
   * 
   * @param id - id do documento
   * @returns
   */
  approveDocument(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.post<any>('api/documents/ApproveDocument', {}, { params });
  }

  /**
   *
   * Este método coloca o estado do RequestDocument a Rejected
   * 
   * @param id - id do documento
   * @returns
   */
  rejectDocument(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.post<any>('api/documents/RejectRequest', {}, { params });
  }


  /**
   * Obtem o template pelo seu ID
   * 
   * @param id id do template
   * @returns O Template com o ID
   */
  getTemplateById(id: number): Observable<DocumentTemplate> {
    return this.http.get<DocumentTemplate>(`api/documents/GetTemplateById?id=${id}`);
  }


  /**
   * Ativa o template
   * @param id
   * @returns
   */
  activeTemplate(id: number): Observable<any> {
    return this.http.put(`api/DocumentTemplateStatus/activate?id=${id}`, id);
  }
  /**
   * Desactiva o template
   * @param id
   * @returns
   */
  desactiveTemplate(id: number): Observable<any> {
    return this.http.put(`api/DocumentTemplateStatus/deactivate?id=${id}`, id);
  }
  /**
   * Elimina o template
   * @param id
   * @returns
   */
  removeTemplate(id: number): Observable<any> {
    return this.http.delete(`api/DocumentTemplateStatus/remove/${id}`);
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
  paymentUrl?: string,
}


export enum StatusDocument {
  pending = 'Pending',
  approved = 'Approved',
  rejected = 'Rejected',
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
      return "Por Pagar";
  }
}


export enum DocumentType {
  Requirement = "Requerimento",
  Alvara = 'Alvará',
  Certeficated = 'Certificado',
  Other = 'Outro'
}

export interface DocumentTemplate {
  id?: number,
  name: string,
  description: string,
  type: string,
  price: number,
  textTemplate: string
  municipality: string,
  status?: DocumentTemplateStatus,
}

export enum DocumentTemplateStatus {
  active = 'Active',
  inactive = 'Inactive',
  notListed = 'NotListed'
}
