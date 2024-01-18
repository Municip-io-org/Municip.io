
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MunicipalAdminAuthService {

  constructor(private http: HttpClient, private router: Router) { }


  registerMunicipalAdmin(municipalAdministrator: MunicipalAdministrator): Observable<boolean> {


    return this.http.post<boolean>('api/accounts/registerMunicipalAdministrator', municipalAdministrator);
  }
}







export interface MunicipalAdministrator {
  firstName: string;
  surname: string;
  email: string;
  password: string;
  municipality: string;
}




