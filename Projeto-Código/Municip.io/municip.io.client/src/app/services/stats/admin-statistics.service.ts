import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookRequest } from '../library/library.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for statistics
 */
export class AdminStatisticsService {

  /**
   * @constructor
   * AdminStatisticsService
   * 
   * @param http 
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtem a lista de cidadãos
   * 
   * @returns A lista de cidadãos
   */
getAllCitizens(): Observable<any> {
    return this.http.get<any>('api/stats/getAllCitizens');
  }

  /**
   * Obtem a lista de administradores municipais
   * 
   * @returns A lista de administradores municipais
   */
  getAllMunicipalAdmins(): Observable<any> {
return this.http.get<any>('api/stats/getAllMunicipalAdmins');
  }

  /**
   * Obtem a lista de municipios
   * 
   * @returns A lista de municipios
   */
  getAllMunicipalities(): Observable<any> {
return this.http.get<any>('api/stats/getAllMunicipalities');
  }

  /**
   * Obtem a lista de pedidos de livros
   * 
   * @returns A lista de pedidos de livros
   */
  getAllDocumentRequests(): Observable<any> {
    return this.http.get<any>('api/stats/getAllDocumentRequests');
  }

  /**
   * Obtem todas as noticias
   * @returns A lista de notícias 
   */
  getAllNews(): Observable<any> {
    return this.http.get<any>('api/stats/getAllNews');
  }

  /**
   * Obtem todas as eventos
   * @returns A lista de eventos
   */
  getAllEvents(): Observable<any> {
    return this.http.get<any>('api/stats/getAllEvents');
  }

  /**
   * Obtem os municípios 
   * @returns A lista de municípios 
   */
  getLandingPageMunicipalities(): Observable<any> {
    return this.http.get<any>('api/stats/getLandingPageMunicipalities');
  }

  /**
   * Obtem os municípes
   * @returns A lista de municípes
   */
  getLandingPageCitizens(): Observable<any> {
    return this.http.get<any>('api/stats/getLandingPageCitizens');
  }

  /**
   * Obtem os requests Pending por município
   * @param municipality O município
   * @returns A lista de pedidos por município
   */
  getPendingRequestsByMunicipality(municipality: string): Observable<any> {
    const params = { municipality: municipality };
    
    return this.http.get<any>('api/stats/getPendingRequestsByMunicipality', { params: params });

  }

  /**
   * Obtem os documentos à espera de pagamento
   * @param municipality O município
   * @returns A lista de documentos à espera de pagamento
   */
  getWaitingForPaymentRequestsByMunicipality(municipality: string): Observable<any> {
    const params = { municipality: municipality };
    return this.http.get<any>('api/stats/getWaitingForPaymentRequestsByMunicipality', { params: params });
  }

 
  /**
   * Obtem os pedidos de livros por município
   * @param municipality O município
   * @returns A lista de pedidos
   */
  getRequestsByMunicipality(municipality: string): Observable<BookRequest[]> {
    return this.http.get<BookRequest[]>(`api/Book/GetRequestsByMunicipality?municipality=${municipality}`);
  }



       

      
    }


