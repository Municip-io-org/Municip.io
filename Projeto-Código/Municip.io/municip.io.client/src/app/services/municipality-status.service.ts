import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Serviço responsável por lidar com o status dos municipios.
 */
@Injectable({
  providedIn: 'root'
})
export class MunicipalityStatusService {

  /**
   * Método construtor.
   * @param http  O serviço HttpClient.
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtém todas os municipios.
   * @returns Uma requisição HTTP GET para '/api/municipalitystatus/municipalities'.
   */
  getMunicipalities() {
    return this.http.get<any>('/api/municipalitystatus/municipalities');
  }

  /**
   * Aprova um municipio.
   * @param name O nome da municipio a ser aprovado.
   * @returns Uma requisição HTTP POST para '/api/municipalitystatus/approveMunicipality?name=${name}'.
   */
  approveMunicipality(name: string) {
    return this.http.post<any>(`/api/municipalitystatus/approveMunicipality?name=${name}`, {});
  }

  /**
   * Deleta o municipio.
   * @param name O nome da municipio a ser removido.
   * @returns Uma requisição HTTP POST para '/api/municipalitystatus/deleteMunicipality?name=${name}'.
   */
  deleteMunicipality(name: string) {
    return this.http.post<any>(`/api/municipalitystatus/deleteMunicipality?name=${name}`, {});
  }

  /**
   * Obtém todos os administradores municipais de um municipio.
   * @param name O nome do municipio.
   * @returns Uma requisição HTTP GET para '/api/municipalAdministratorStatus/municipalAdministrators?name=${name}'.
   */
  getMunicipalAdmins(name: string) {
    return this.http.get<any>(`/api/municipalAdministratorStatus/municipalAdministrators?name=${name}`);
  }

  /**
   * Aprova um administrador municipal.
   * @param username O nome de usuário do administrador municipal a ser aprovado.
   * @returns Uma requisição HTTP POST para '/api/municipalAdministratorStatus/approveMunicipalAdministrator?email=${username}'.
   */
  approveMunicipalAdmin(username: string) {
    return this.http.post<any>(`/api/municipalAdministratorStatus/approveMunicipalAdministrator?email=${username}`, {});
  }

  /**
   * Deleta um administrador municipal.
   * @param username O nome de usuário do administrador municipal a ser deletado.
   * @returns Uma requisição HTTP POST para '/api/municipalAdministratorStatus/deleteMunicipalAdministrator?email=${username}'.
   */
  deleteMunicipalAdmin(username: string) {
    return this.http.post<any>(`/api/municipalAdministratorStatus/deleteMunicipalAdministrator?email=${username}`, {});
  }

  /**
   * Bloqueia um administrador municipal.
   * @param email O email do administrador municipal a ser bloqueado.
   * @returns Uma requisição HTTP POST para '/api/municipalAdministratorStatus/blockMunicipalAdministrator?email=${emailParse}'.
   */
  blockMunicipalAdmin(email: string) {
    var emailParse = email.replace('@', '%40');
    return this.http.post<any>(`/api/municipalAdministratorStatus/blockMunicipalAdministrator?email=${emailParse}`, {});
  }

}
