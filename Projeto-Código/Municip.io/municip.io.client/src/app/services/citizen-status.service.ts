import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for citizen status
 */
export class CitizenStatusService {

  /**
   * @constructor
   * CitizenStatusService
   * 
   * @param http 
   */
  constructor(private http: HttpClient) { }


  /**
   * Obtem a lista de cidadãos
   * 
   * @param name 
   * @returns A lista de cidadãos
   */
  getCitizens(name: string) {
    return this.http.get<any>(`/api/citizenstatus/citizens?name=${name}`);
  }


  /**
   * Aprova um cidadão
   * 
   * @param email O email do cidadão a aprovar
   * @returns A aprovação do cidadão
   */
  approveCitizen(email: string) {
    var emailParse = email.replace('@', '%40');

    return this.http.post<any>(`/api/citizenstatus/approveCitizen?email=${emailParse}`, {});

  }

  /**
   * Rejeita um cidadão
   * 
   * @param email O email do cidadão a rejeitar
   * @returns A rejeição do cidadão
   */
  deleteCitizen(email: string) {
    var emailParse = email.replace('@', '%40');
    return this.http.post<any>(`/api/citizenstatus/deleteCitizen?email=${emailParse}`, {});
  }

  /**
   * Bloqueia um cidadão
   * 
   * @param email O email do cidadão a bloquear
   * @returns O bloqueio do cidadão
   */
  blockCitizen(email: string) {
    var emailParse = email.replace('@', '%40');
    return this.http.post<any>(`/api/citizenstatus/blockCitizen?email=${emailParse}`, {});

  }
}

