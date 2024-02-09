import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, of, switchMap } from 'rxjs';
import { Citizen } from './citizen-auth.service';
import { MunicipalAdministrator } from './municipal-admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private _authStateChanged: Subject<boolean> = new BehaviorSubject<boolean>(false);


  public onStateChanged() {
    return this._authStateChanged.asObservable();
  }


  constructor(private http: HttpClient) { }




  login(login: Login, useCookies: boolean, useSessionCookies: boolean): Observable<boolean>   {

    let params = new HttpParams()
      .set('useCookies', useCookies.toString())
      .set('useSessionCookies', useSessionCookies.toString());
    return this.http.post('/login/', login, {
      params,
      observe: 'response',
      responseType: 'text'
      }
    )
      .pipe<boolean>(map((res: HttpResponse<string>) => {
        this._authStateChanged.next(res.ok);
        return res.ok;
      })); 

           
  }

  getUserData() {
    return this.http.get<any>('/api/accounts/UserInfo');
  }

  getInfoByEmail(email: string) {
    let params = new HttpParams().set('email', email);
    return this.http.get<MunicipalAdministrator | Citizen>('/api/accounts/InfoByEmail/', { params });
  }

  getUserRole() {
    return this.http.get<Role>('/api/accounts/UserRole');
  }

  getMunicipality() {
    return this.getUserData().pipe(
      switchMap((userInfo) =>
        this.getInfoByEmail(userInfo.email).pipe(
          map((user) => {
            if (user.municipality) {
              return user.municipality;
            }
            return null;
          }),
          catchError((_) => {
            return of(null);
          })
        )
      )
    );
  }






  signOut() {
    return this.http.post('/api/accounts/logout', {}, {
      withCredentials: true,
      observe: 'response',
      responseType: 'text'
    }).pipe<boolean>(map((res: HttpResponse<string>) => {
      if (res.ok) {
        this._authStateChanged.next(false);
      }
      return res.ok;
    }));
  }




  isSignedIn(): Observable<boolean> {
    return this.getUserData().pipe(
      map((userInfo) => {
        const valid = !!(userInfo && userInfo.email && userInfo.email.length > 0);
        return valid;
      }),
      catchError((_) => {
        return of(false);
      }));
  }

}

export interface Login {
  password: string,
  email: string,
  twoFactorCode: string,
  twoFactorRecoveryCode: string

}


export enum Roles {
  Admin = "Admin",
  Municipal= "Municipal",
  Citizen= "Citizen"
}

export interface Role {
role: Roles
}
