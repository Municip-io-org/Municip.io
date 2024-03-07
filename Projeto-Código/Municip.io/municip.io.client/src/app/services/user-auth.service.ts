import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { MunicipalAdministrator, Municipality } from './municipal-admin-auth.service';
import { Citizen } from './citizen-auth.service';
import { EncryptionService } from './crypto/encryption.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private _authStateChanged: Subject<boolean> = new BehaviorSubject<boolean>(false);


  public onStateChanged() {
    return this._authStateChanged.asObservable();
  }

  private readonly LOCAL_STORAGE_KEY = 'userData';
  private readonly MUNICIPALITY_STORAGE_KEY = 'userMunicipality';
  private readonly ROLE_STORAGE_KEY = 'userRole';
  private readonly INFO_STORAGE_KEY = 'infoByEmail'
  constructor(private http: HttpClient, private encryptionService: EncryptionService) { }

  getUserDataFromStorage(): any {
    const encryptedData = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return encryptedData ? this.encryptionService.decryptData(encryptedData) : null;
  }

  setUserDataToStorage(userData: any): void {
    const encryptedData = this.encryptionService.encryptData(userData);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, encryptedData);
  }

  private setUserMunicipalityToStorage(municipality: any): void {
    const encryptedData = this.encryptionService.encryptData(municipality);
    localStorage.setItem(this.MUNICIPALITY_STORAGE_KEY, encryptedData);
  }

  private getUserMunicipalityFromStorage(): any {
    const encryptedData = localStorage.getItem(this.MUNICIPALITY_STORAGE_KEY);
    return encryptedData ? this.encryptionService.decryptData(encryptedData) : null;
  }

  private setUserRoleToStorage(role: any): void {
    const encryptedData = this.encryptionService.encryptData(role);
    localStorage.setItem(this.ROLE_STORAGE_KEY, encryptedData);
  }

  private getUserRoleFromStorage(): any {
    const encryptedData = localStorage.getItem(this.ROLE_STORAGE_KEY);
    return encryptedData ? this.encryptionService.decryptData(encryptedData) : null;
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
      return of(userData);
    } else {
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
      return of(cachedUserData);
    } else {
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
    const encryptedData = localStorage.getItem(this.INFO_STORAGE_KEY);
    const decryptedData = encryptedData ? this.encryptionService.decryptData(encryptedData) : null;
    return decryptedData && decryptedData.email === email ? decryptedData : null;
  }

  setUserInfoByEmailToStorage(email: string, userInfo: any): void {
    const cachedUserData = this.getUserInfoByEmailFromStorage(email);
    var toStore;
    if (cachedUserData && cachedUserData.email === email) {
      toStore = JSON.stringify({ ...cachedUserData, ...userInfo });
    } else {
toStore = JSON.stringify(userInfo);
    }

   var encryptedData = this.encryptionService.encryptData(toStore);
localStorage.setItem(this.INFO_STORAGE_KEY, encryptedData);


  }




  getUserRole(): Observable<any> {
    const roleData = this.getUserRoleFromStorage();
    if (roleData) {
      return of(roleData);
    } else {
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
      return of(municipalityData.municipality);
    } else {
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

  updateUser(user: Citizen, image: File, passConfirm:string): Observable<any> {
    const headers = new HttpHeaders({ 'authorization': 'Client-ID a9e7323ad868dd2' });
    const imgurl = "https://api.imgur.com/3/image";
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(imgurl, formData, { headers }).pipe(
      switchMap((response: any) => {
        user.photo = response['data']['link'];
        console.log(user);
        return this.http.put(`/api/accounts/UpdateUserInfo?passwordConfirmation=${passConfirm}`, user );
      })
    );
  }

  updateMunicipAdminUser(user: MunicipalAdministrator, image: File, passConfirm: string): Observable<any> {
    const headers = new HttpHeaders({ 'authorization': 'Client-ID a9e7323ad868dd2' });
    const imgurl = "https://api.imgur.com/3/image";
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(imgurl, formData, { headers }).pipe(
      switchMap((response: any) => {
        user.photo = response['data']['link'];
        console.log(user);
        return this.http.put(`/api/accounts/UpdateAdmMunicipalInfo?passwordConfirmation=${passConfirm}`, user);
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
          localStorage.removeItem(this.LOCAL_STORAGE_KEY);
          localStorage.removeItem(this.MUNICIPALITY_STORAGE_KEY);
          localStorage.removeItem(this.ROLE_STORAGE_KEY);
          localStorage.removeItem(this.INFO_STORAGE_KEY);

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
