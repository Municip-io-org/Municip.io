
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
