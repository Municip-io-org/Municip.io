import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Municipality } from './municipal-admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private _authStateChanged: Subject<boolean> = new BehaviorSubject<boolean>(false);


  public onStateChanged() {
    return this._authStateChanged.asObservable();
  }

  private readonly SESSION_STORAGE_KEY = 'userData';
  private readonly MUNICIPALITY_STORAGE_KEY = 'userMunicipality';
  private readonly ROLE_STORAGE_KEY = 'userRole';
  private readonly INFO_STORAGE_KEY = 'infoByEmail'
  constructor(private http: HttpClient) { }

  getUserDataFromStorage(): any {
    console.log("foi buscar")
    const userData = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  setUserDataToStorage(userData: any): void {
    console.log("define em sessin")
    sessionStorage.setItem(this.SESSION_STORAGE_KEY, JSON.stringify(userData));
  }

  private setUserMunicipalityToStorage(municipality: any): void {
    sessionStorage.setItem(this.MUNICIPALITY_STORAGE_KEY, JSON.stringify(municipality));
  }

  private getUserMunicipalityFromStorage(): any {
    const municipalityString = sessionStorage.getItem(this.MUNICIPALITY_STORAGE_KEY);
    return municipalityString ? JSON.parse(municipalityString) : null;
  }

  private setUserRoleToStorage(role: any): void {
    sessionStorage.setItem(this.ROLE_STORAGE_KEY, JSON.stringify(role));
  }

  private getUserRoleFromStorage(): any {
    const roleString = sessionStorage.getItem(this.ROLE_STORAGE_KEY);
    return roleString ? JSON.parse(roleString) : null;
  }


  login(login: Login, useCookies: boolean, useSessionCookies: boolean): Observable<boolean> {
    let params = new HttpParams()
      .set('useCookies', useCookies.toString())
      .set('useSessionCookies', useSessionCookies.toString());
    return this.http.post('/login/', login, {
      params,
      observe: 'response',
      responseType: 'text'
    }).pipe(
      map((res: HttpResponse<string>) => {
        this.setUserDataToStorage(login);


        
        return res.ok;
      })
    );
  }
  getUserData(): Observable<any> {
    const userData = this.getUserDataFromStorage();
    if (userData) {
      console.log("Aqui já tem os dados: ")
      console.log(userData)
      return of(userData);
    } else {
      console.log("aqui foi buscá-los")
      return this.http.get<any>('/api/accounts/UserInfo').pipe(
        tap(user => this.setUserDataToStorage(user)), 
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      );
    }
  }

  getInfoByEmail(email: string): Observable<any> {
    const cachedUserData = this.getUserInfoByEmailFromStorage(email);
    if (cachedUserData && cachedUserData.email === email) {
      console.log("NÃO FOI À API BUSCAR A USERINFO")
      console.log(cachedUserData)
      return of(cachedUserData);
    } else {
       console.log("Terrível, foi à api... :/")
      return this.http.get<any>(`/api/accounts/InfoByEmail/?email=${email}`).pipe(
        tap(userInfo => this.setUserInfoByEmailToStorage(email, userInfo)),
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      );
    }
  }

  getUserInfoByEmailFromStorage(email: string): any {
    const userDataString = sessionStorage.getItem(this.INFO_STORAGE_KEY);
    const userData = userDataString ? JSON.parse(userDataString) : null;
    return userData && userData.email === email ? userData : null;
  }

  setUserInfoByEmailToStorage(email: string, userInfo: any): void {
    const cachedUserData = this.getUserInfoByEmailFromStorage(email);
    if (cachedUserData && cachedUserData.email === email) {
      sessionStorage.setItem(this.INFO_STORAGE_KEY, JSON.stringify({ ...cachedUserData, ...userInfo }));
    } else {
      sessionStorage.setItem(this.INFO_STORAGE_KEY, JSON.stringify(userInfo));
    }
  }


  getUserRole(): Observable<any> {
    const roleData = this.getUserRoleFromStorage();
    if (roleData) {
      console.log("Já tem a role!!!!")
      return of(roleData);
    } else {
      console.log("Vai buscar à api a role")
      return this.http.get<any>('/api/accounts/UserRole').pipe(
        tap(role => this.setUserRoleToStorage(role)),
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      );
    }
  }

  getMunicipality(): Observable<string> {
    const municipalityData = this.getUserMunicipalityFromStorage();
    if (municipalityData) {
      console.log("Já tem o municipio!!!!??");
      return of(municipalityData.municipality);
    } else {
      console.log("VAI BUSCAR Á API O MUNICIPIO");
      return this.getUserData().pipe(
        switchMap(userInfo =>
          this.getInfoByEmail(userInfo.email).pipe(
            tap(municipality => this.setUserMunicipalityToStorage(municipality)),
            catchError(_ => of(null))
          )
        ),
        map(result => result?.municipality)
      );
    }
  }

  getInfoMunicipality(nome: string): Observable<Municipality> {
    return this.http.get<any>(`/api/accounts/InfoMunicipality?name=${nome}`);
  }

  updateUser(user: any, image: File): Observable<any> {
    const headers = new HttpHeaders({ 'authorization': 'Client-ID a9e7323ad868dd2' });
    const imgurl = "https://api.imgur.com/3/image";
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(imgurl, formData, { headers }).pipe(
      switchMap((response: any) => {
        user.photo = response['data']['link'];
        return this.http.put('/api/accounts/UpdateUserInfo', user);
      })
    );
  }

  signOut(): Observable<boolean> {
    return this.http.post('/api/accounts/logout', {}, {
      withCredentials: true,
      observe: 'response',
      responseType: 'text'
    }).pipe(
      map((res: HttpResponse<string>) => {
        if (res.ok) {
          this.setUserDataToStorage(null);
          this.setUserMunicipalityToStorage(null);
          this.setUserRoleToStorage(null);
          
          

          return true;
        }
        return false;
      })
    );
  }

  isSignedIn(): Observable<boolean> {
    return this.getUserData().pipe(
      map(userInfo => !!userInfo && !!userInfo.email),
      catchError(_ => of(false))
    );
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
  Municipal = "Municipal",
  Citizen = "Citizen"
}
