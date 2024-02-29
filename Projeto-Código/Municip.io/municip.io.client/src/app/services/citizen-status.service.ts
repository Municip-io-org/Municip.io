import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitizenStatusService {

  constructor(private http: HttpClient) { }

  //getMunicipalities

  getCitizens(name: string) {
    return this.http.get<any>(`/api/citizenstatus/citizens?name=${name}`);
  }

  //approveMunicipality
  approveCitizen(email: string) {
    var emailParse = email.replace('@', '%40');

    return this.http.post<any>(`/api/citizenstatus/approveCitizen?email=${emailParse}`, {});

  }

  deleteCitizen(email: string) {
    var emailParse = email.replace('@', '%40');
    return this.http.post<any>(`/api/citizenstatus/deleteCitizen?email=${emailParse}`, {});
  }

  blockCitizen(email: string) {
    var emailParse = email.replace('@', '%40');
    return this.http.post<any>(`/api/citizenstatus/blockCitizen?email=${emailParse}`, {});

  }
}

