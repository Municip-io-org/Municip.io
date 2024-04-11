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
  /**
   * Service responsible for user authentication and related operations.
   */
export class UserAuthService {

  private _authStateChanged: Subject<boolean> = new BehaviorSubject<boolean>(false);


  /**
   * Observable to subscribe for authentication state changes.
   * @returns An observable of boolean indicating authentication state changes.
   */
  public onStateChanged() {
    return this._authStateChanged.asObservable();
  }

  private readonly LOCAL_STORAGE_KEY = 'userData';
  private readonly MUNICIPALITY_STORAGE_KEY = 'userMunicipality';
  private readonly ROLE_STORAGE_KEY = 'userRole';
  private readonly INFO_STORAGE_KEY = 'infoByEmail'
  constructor(private http: HttpClient, private encryptionService: EncryptionService) { }

  /**
   * Get user data from local storage.
   * @returns User data fetched from local storage.
   */
  getUserDataFromStorage(): any {
    const encryptedData = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return encryptedData ? this.encryptionService.decryptData(encryptedData) : null;
  }


  /**
     * Set user data to local storage.
     * @param userData User data to be stored.
     */
  setUserDataToStorage(userData: any): void {
    const encryptedData = this.encryptionService.encryptData(userData);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, encryptedData);
  }

  /**
     * Set user municipality data to local storage.
     * @param municipality Municipality data to be stored.
     */
  
  private setUserMunicipalityToStorage(municipality: any): void {
    const encryptedData = this.encryptionService.encryptData(municipality);
    localStorage.setItem(this.MUNICIPALITY_STORAGE_KEY, encryptedData);
  }

  /**
  * Get user municipality data from local storage.
  * @returns Municipality data fetched from local storage.
  */

  private getUserMunicipalityFromStorage(): any {
    const encryptedData = localStorage.getItem(this.MUNICIPALITY_STORAGE_KEY);
    return encryptedData ? this.encryptionService.decryptData(encryptedData) : null;
  }

  /**
  * Set user role data to local storage.
  * @param role Role data to be stored.
  */
  private setUserRoleToStorage(role: any): void {
    const encryptedData = this.encryptionService.encryptData(role);
    localStorage.setItem(this.ROLE_STORAGE_KEY, encryptedData);
  }

  /**
 * Get user role data from local storage.
 * @returns Role data fetched from local storage.
 */
  private getUserRoleFromStorage(): any {
    const encryptedData = localStorage.getItem(this.ROLE_STORAGE_KEY);
    return encryptedData ? this.encryptionService.decryptData(encryptedData) : null;
  }


  /**
 * Login user.
 * @param login Login credentials.
 * @param useCookies Flag indicating whether to use cookies.
 * @param useSessionCookies Flag indicating whether to use session cookies.
 * @returns Observable of boolean indicating login success.
 */
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

  /**
 * Get user data.
 * @returns Observable of user data.
 */
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

  /**
 * Get user information by email.
 * @param email Email address of the user.
 * @returns Observable of user information.
 */
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

  /**
 * Get user information by email from local storage.
 * @param email Email address of the user.
 * @returns User information fetched from local storage.
 */
  getUserInfoByEmailFromStorage(email: string): any {
    const encryptedData = localStorage.getItem(this.INFO_STORAGE_KEY);
    const decryptedData = encryptedData ? this.encryptionService.decryptData(encryptedData) : null;
    return decryptedData && decryptedData.email === email ? decryptedData : null;
  }

  /**
 * Set user information by email to local storage.
 * @param email Email address of the user.
 * @param userInfo User information to be stored.
 */
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




  /**
   * Get user role.
   * @returns Observable of user role.
   */
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

  /**
 * Get municipality of the user.
 * @returns Observable of municipality.
 */
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

  /**
  * Fetch municipality information by name.
  * @param nome Name of the municipality.
  * @returns Observable of Municipality information.
  */
  getInfoMunicipality(nome: string): Observable<Municipality> {
    return this.http.get<any>(`/api/accounts/InfoMunicipality?name=${nome}`);
  }

  /**
 * Update user information.
 * @param user User object to be updated.
 * @param image User profile image.
 * @param passConfirm Password confirmation.
 * @returns Observable of updated user information.
 */
  updateUser(user: Citizen, image: File, passConfirm:string): Observable<any> {
    const headers = new HttpHeaders({ 'authorization': 'Client-ID a9e7323ad868dd2' });
    const imgurl = "https://api.imgur.com/3/image";
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(imgurl, formData, { headers }).pipe(
      switchMap((response: any) => {
        // Upload emblem photo to Imgur if not null
        const photoUrl = image ? response['data']['link'] : user.photo;


        console.log(user);

        user.photo = photoUrl;
        return this.http.put(`/api/accounts/UpdateUserInfo?passwordConfirmation=${passConfirm}`, user );
      })
    );
  }

  /**
   * Dá update ao histórico de browsers do utilizador
   * @param email  email do utilizador
   * @param browserId browser id
   * @returns o resultado da ação
   */
  updateBrowserHistory(email: string, browserId: string): Observable<any> {
    return this.http.put(`/api/accounts/UpdateBrowserHistory?email=${email}&userAgent=${browserId}`, {});
  }

  /**
   * Retorna o histórico do browser
   * @param email email do utilizador
   * @returns retorna a ação
   */
  getBrowserHistory(email: string): Observable<any> {
    return this.http.get<any>(`/api/accounts/GetBrowserHistory?email=${email}`);
  }

  /**
   * Envia um email 
   * @param email email do cidadão
   * @returns retorna a resposta
   */
  sendEmail(email: string) {
    
    return this.http.post<any>(`/api/accounts/SendNewLogin?email=${email}`, {});
    
  }

  /**
 * Update municipality administrator user information.
 * @param user Municipality administrator user object to be updated.
 * @param image User profile image.
 * @param passConfirm Password confirmation.
 * @returns Observable of updated municipality administrator user information.
 */
  updateMunicipAdminUser(user: MunicipalAdministrator, image: File, passConfirm: string): Observable<any> {
    const headers = new HttpHeaders({ 'authorization': 'Client-ID a9e7323ad868dd2' });
    const imgurl = "https://api.imgur.com/3/image";
    const formData = new FormData();
    formData.append('image', image);

    


    return this.http.post(imgurl, formData, { headers }).pipe(
      switchMap((response: any) => {


        // Upload emblem photo to Imgur if not null
        const photoUrl = image ? response['data']['link'] : user.photo;


        console.log(user);

        user.photo = photoUrl;

        return this.http.put(`/api/accounts/UpdateAdmMunicipalInfo?passwordConfirmation=${passConfirm}`, user);
      })
    );
  }


  /**
  * Sign out the user.
  * @returns Observable of boolean indicating if sign out was successful.
  */
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
          localStorage.removeItem("infoByEmail");

          return true;
        }
        return false;
      })
    );
  }

  /**
  * Check if the user is signed in.
  * @returns Observable of boolean indicating if the user is signed in.
  */
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


