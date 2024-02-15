import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private _authStateChanged: Subject<boolean> = new BehaviorSubject<boolean>(false);


  public onStateChanged() {
    return this._authStateChanged.asObservable();
  }
  constructor(private http: HttpClient) { }

  getUserDataFromStorage(): any {
    console.log("foi buscar")
    const userData = sessionStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  setUserDataToStorage(userData: any): void {
    console.log("define em sessin")
    sessionStorage.setItem('userData', JSON.stringify(userData));
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

    return this.http.get<any>(`/api/accounts/InfoByEmail/?email=${email}`);
  }

  getUserRole(): Observable<any> {
    return this.http.get<any>('/api/accounts/UserRole');
  }

  getMunicipality(): Observable<any> {
    return this.getUserData().pipe(
      switchMap(userInfo =>
        this.getInfoByEmail(userInfo.email).pipe(
          map(user => user.municipality || null),
          catchError(_ => of(null))
        )
      )
    );
  }

  getInfoMunicipality(nome: string): Observable<any> {
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
          this.setUserDataToStorage(null); // Limpa os dados do usuário ao sair
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
