import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookRequest } from '../library/library.service';

@Injectable({
  providedIn: 'root'
})
export class AdminStatisticsService {

  constructor(private http: HttpClient) { }

getAllCitizens(): Observable<any> {
    return this.http.get<any>('api/stats/getAllCitizens');
  }

  getAllMunicipalAdmins(): Observable<any> {
return this.http.get<any>('api/stats/getAllMunicipalAdmins');
  }

  getAllMunicipalities(): Observable<any> {
return this.http.get<any>('api/stats/getAllMunicipalities');
  }

  getAllDocumentRequests(): Observable<any> {
    return this.http.get<any>('api/stats/getAllDocumentRequests');
  }

  getAllNews(): Observable<any> {
    return this.http.get<any>('api/stats/getAllNews');
  }

  getAllEvents(): Observable<any> {
    return this.http.get<any>('api/stats/getAllEvents');
  }

  getLandingPageMunicipalities(): Observable<any> {
    return this.http.get<any>('api/stats/getLandingPageMunicipalities');
  }

  getLandingPageCitizens(): Observable<any> {
    return this.http.get<any>('api/stats/getLandingPageCitizens');
  }

  getPendingRequestsByMunicipality(municipality: string): Observable<any> {
    const params = { municipality: municipality };
    
    return this.http.get<any>('api/stats/getPendingRequestsByMunicipality', { params: params });

  }

  getWaitingForPaymentRequestsByMunicipality(municipality: string): Observable<any> {
    const params = { municipality: municipality };
    return this.http.get<any>('api/stats/getWaitingForPaymentRequestsByMunicipality', { params: params });
  }

 

  getRequestsByMunicipality(municipality: string): Observable<BookRequest[]> {
    return this.http.get<BookRequest[]>(`api/Book/GetRequestsByMunicipality?municipality=${municipality}`);
  }



       

      
    }


