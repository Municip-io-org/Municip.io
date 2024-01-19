
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CitizenAuthService {

  constructor(private http: HttpClient) { }


  registerCitizen(citizen: Citizen): Observable<Citizen> {
    return this.http.post<Citizen>('api/accounts/registerCitizen', citizen);

  }

  loginCitizen(login: Login): Observable<Login> {
    return this.http.post<Login>('/login/', login);
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

