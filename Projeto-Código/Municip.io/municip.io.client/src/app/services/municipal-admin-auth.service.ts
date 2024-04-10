
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin, map, switchMap, tap } from 'rxjs';

/**
 * Serviço que fornece métodos para autenticação de administradores municipais.
 */
@Injectable({
  providedIn: 'root'
})
export class MunicipalAdminAuthService {

  /**
   * Método construtor.
   * @param http O serviço HttpClient
   * @param router O Serviço Router
   */
  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Regista um administrador municipal 
   * @param municipalAdministrator objeto administrador municipal
   * @param image imagem do administrador
   * @returns retorna a resposta da ação
   */
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



  /**
   * Regista um município
   * @param municipality Objeto do muncipio
   * @param emblemImage Brasão do município
   * @param landscapeImage Imagem de fundo do município
   * @returns retorna a resposta da ação
   */
  registerMunicipality(municipality: Municipality, emblemImage: File, landscapeImage: File): Observable<Municipality> {
    const headers = new HttpHeaders({ 'authorization': 'Client-ID a9e7323ad868dd2' });
    const imgurl = "https://api.imgur.com/3/image";

    // Upload emblem photo to Imgur
    const emblemFormData = new FormData();
    emblemFormData.append('image', emblemImage);
    const emblemPhotoUpload$ = this.http.post(imgurl, emblemFormData, { headers }).pipe(
      map((response: any) => response['data']['link']),
      tap((emblemPhotoUrl: string) => municipality.emblemPhoto = emblemPhotoUrl)
    );

    // Upload landscape photo to Imgur
    const landscapeFormData = new FormData();
    landscapeFormData.append('image', landscapeImage);
    const landscapePhotoUpload$ = this.http.post(imgurl, landscapeFormData, { headers }).pipe(
      map((response: any) => response['data']['link']),
      tap((landscapePhotoUrl: string) => municipality.landscapePhoto = landscapePhotoUrl)
    );

    // Combine both uploads and make the final API call
    return forkJoin([emblemPhotoUpload$, landscapePhotoUpload$]).pipe(
      switchMap(([emblemPhotoUrl, landscapePhotoUrl]: [string, string]) => {
        // Ensure both URLs are set before making the API call
        municipality.emblemPhoto = emblemPhotoUrl;
        municipality.landscapePhoto = landscapePhotoUrl;
        // Make the API call to register the municipality
        return this.http.post<Municipality>('api/accounts/registerMunicipality', municipality);
      })
    );
  }

  /**
   * Atualiza o município
   * @param municipality Objeto município
   * @param emblemImage Brasão do município
   * @param landscapeImage Imagem de fundo do município
   * @returns retorna a resposta da ação
   */
  updateMunicipality(municipality: Municipality, emblemImage: File, landscapeImage: File): Observable<Municipality> {
    const headers = new HttpHeaders({ 'authorization': 'Client-ID a9e7323ad868dd2' });
    const imgurl = "https://api.imgur.com/3/image";

    // Upload emblem photo to Imgur if not null
    const emblemPhotoUpload$ = emblemImage ?
      this.uploadImageToImgur(imgurl, emblemImage, headers) :
      municipality.emblemPhoto;


    // Upload landscape photo to Imgur if not null
    const landscapePhotoUpload$ = landscapeImage ?
      this.uploadImageToImgur(imgurl, landscapeImage, headers) :
      municipality.landscapePhoto;

    // Combine both uploads and make the final API call
    return forkJoin([emblemPhotoUpload$, landscapePhotoUpload$]).pipe(
      switchMap(([emblemPhotoUrl, landscapePhotoUrl]: [string, string]) => {
        // Update municipality properties with the URLs
        municipality.emblemPhoto = emblemImage ? emblemPhotoUrl : municipality.emblemPhoto;
        municipality.landscapePhoto = landscapeImage ? landscapePhotoUrl : municipality.landscapePhoto;


        // Make the API call to update the municipality
        return this.http.put<Municipality>('api/accounts/UpdateMunicipality', municipality);
      })
    );
  }

  /**
   * Coloca a imagem no imgur
   * @param url url do caminho da imagem
   * @param image ficheiro da imagem 
   * @param headers header do pedido
   * @returns retorna a resposta do pedido
   */
  private uploadImageToImgur(url: string, image: File, headers: HttpHeaders): Observable<string> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(url, formData, { headers }).pipe(
      map((response: any) => response['data']['link'])
    );
  }

  /**
   * Retorna os municipios aprovados.
   * @returns
   */
  getApprovedMunicipalities() {
    return this.http.get<Municipality>('api/municipalitystatus/approvedMunicipalities');
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
  areaha: string;
  codigo: string;
  codigoine: string;
  codigopostal: string;
  contact: string;
  description: string;
  descpstal: string;
  distrito: string;
  eleitores: string;
  email: string;
  fax: string;
  libraryAddress? : string;
  localidade: string;
  name: string;
  nif: string;
  populacao: string;
  president: string;
  rua: string;
  sitio: string;
  telefone: string;
  emblemPhoto: string;
  landscapePhoto: string;
}




