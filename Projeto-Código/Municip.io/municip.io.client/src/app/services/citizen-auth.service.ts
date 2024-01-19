
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Query } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CitizenAuthService {

  constructor(private http: HttpClient) { }


  registerCitizen(citizen: Citizen): Observable<Citizen> {
    return this.http.post<Citizen>('api/accounts/registerCitizen', citizen);

  }

  loginCitizen(login: Login, useCookies: boolean, useSessionCookies: boolean): Observable<Login> {
    
    let params = new HttpParams()
      .set('useCookies', useCookies.toString())
      .set('useSessionCookies', useSessionCookies.toString());
      console.log("params", params);
    return this.http.post<Login>('/login/', login, { params });
  }

  getUserData() {
    return this.http.get<any>('/api/accounts/UserData');
  }
}

export interface Citizen {
  firstName: string;
  surname: string;
  email: string;
  password: string;
  nif: string;
  gender: string;
  municipality: string;
  address: string;
  postalCode1: string;
  postalCode2: string;
  birthDate: Date
}

export interface Login {
  password: string,
  email: string,
  twoFactorCode: string,
  twoFactorRecoveryCode: string

} 

