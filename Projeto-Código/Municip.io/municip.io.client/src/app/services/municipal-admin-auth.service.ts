
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MunicipalAdminAuthService {

  constructor(private http: HttpClient, private router: Router) { }


  registerMunicipalAdmin(municipalAdministrator: MunicipalAdministrator, image: File): Observable<boolean> {






    var headers = new HttpHeaders({ 'authorization': 'Client-ID a9e7323ad868dd2' });
    let imgurl = "https://api.imgur.com/3/image";

    //upload to imgur
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(imgurl, formData, { headers })
      .pipe(switchMap((response: any) => {
        municipalAdministrator.photo = response['data']['link'];
        return this.http.post<boolean>('api/accounts/registerMunicipalAdministrator', municipalAdministrator);
      }));



  }




  registerMunicipality(municipality: Municipality): Observable<Municipality> {
    return this.http.post<Municipality>('api/accounts/registerMunicipality', municipality);
  }

}






export interface MunicipalAdministrator {
  firstName: string;
  surname: string;
  email: string;
  password: string;
  municipality: string;
  photo?: string;
}


export interface Municipality {
  name: string;
  president: string;
  contact: string;
  description: string;
}




