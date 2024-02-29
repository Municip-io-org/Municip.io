import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityStatusService {

  constructor(private http: HttpClient) { }

  //getMunicipalities

  getMunicipalities() {
    return this.http.get<any>('/api/municipalitystatus/municipalities');
  }

  //approveMunicipality
  approveMunicipality(name: string) {

    return this.http.post<any>(`/api/municipalitystatus/approveMunicipality?name=${name}`, {});

  }

  deleteMunicipality(name: string) {
    return this.http.post<any>(`/api/municipalitystatus/deleteMunicipality?name=${name}`, {});  }
}


