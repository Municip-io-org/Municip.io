
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Query } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Login } from './user-auth.service';



@Injectable({
  providedIn: 'root'
})
export class CitizenAuthService {

  constructor(private http: HttpClient) { }

  registerCitizen(citizen: Citizen, image: File): Observable<Citizen> {
    var headers = new HttpHeaders({ 'authorization': 'Client-ID a9e7323ad868dd2' });
    let imgurl = "https://api.imgur.com/3/image";

    //upload to imgur
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(imgurl, formData, { headers })
      .pipe(switchMap((response: any) => {
        citizen.photo = response['data']['link'];
        citizen.events = [];
        return this.http.post<Citizen>('api/accounts/registerCitizen', citizen);
      }));
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
  birthDate: Date;
  photo?: string;
  events?: Event[];
}

export interface Country {
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  numericCode: string;
  callingCode: string;
}
