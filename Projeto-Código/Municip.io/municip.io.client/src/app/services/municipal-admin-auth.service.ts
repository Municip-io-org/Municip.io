
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MunicipalAdminAuthService {

  constructor(private http: HttpClient, private router: Router) { }


  //REVER O MÉTODO, TEM DE SER FEITO CHAMADAS BOCADO A BOCADO
  registerCitizen(municipalAdministrator: MunicipalAdministrator): Observable<MunicipalAdministrator> {


    var result= this.http.post<MunicipalAdministrator>('api/accounts/registerMunicipalAdministrator', municipalAdministrator);

    //if result is okay
    if (result) {
   
var exists = this.http.get('api/accounts/exists/'+municipalAdministrator.municipality);

      if (exists) {
        //redirect to router
        this.router.navigateByUrl('')
      }
      else {
        this.router.navigateByUrl('createMunicipality')
      }

    
  }
    //return ok
return ;
}

export interface MunicipalAdministrator {
  firstName: string;
  surname: string;
  email: string;
  password: string;
  municipality: string;
}




