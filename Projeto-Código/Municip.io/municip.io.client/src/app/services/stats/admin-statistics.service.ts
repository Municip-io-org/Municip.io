import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

}
