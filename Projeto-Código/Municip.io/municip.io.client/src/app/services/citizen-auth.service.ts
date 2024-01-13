
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitizenAuthService {

  constructor(private http: HttpClient) { }


  registerCitizen(citizen: Citizen): Observable<Citizen> {
    return this.http.post<Citizen>('api/registerCitizen', citizen);
  }

}

export interface Citizen {
  Email: string;
Password: string;
  Name: string;
  Surname: string;
  Nif: string;
  Gender: string;
  Municipality: string;
  Address: string;
  PostalCode: string;


}

