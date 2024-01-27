
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Query } from '@angular/core';
import { Observable } from 'rxjs';



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
    this.http.post(imgurl, formData, { headers }).subscribe(
      (response : any) => {
        console.log(response);
        citizen.photo = response['data']['link'];
        console.log(citizen);
        console.log(citizen.photo);
        return this.http.post<Citizen>('api/accounts/registerCitizen', citizen);
      },
      (error) => console.log(error)
    );
  
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

  getInfoByEmail(email: string) {
    let params = new HttpParams().set('email', email);
    console.log("params", params);
    return this.http.get<string>('/api/accounts/InfoByEmail/', {params});
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
  photo?: string;
}
