import { Component } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-docs-homepage',
  templateUrl: './docs-homepage.component.html',
  styleUrl: './docs-homepage.component.css'
})
/**
 * @class DocsHomepageComponent
 *
 * Este componente é responsável por exibir a página inicial dos documentos.
 *
 * @param municipality - O município.
 * 
 * @returns A página inicial dos documentos.
 *
 **/
export class DocsHomepageComponent {

  municipality: string = '';

  /**
   * @constructor
   *
   * Este construtor é responsável por injetar o serviço de autenticação de utilizadores.
   *
   * @param service - O serviço de autenticação de utilizadores.
   *
   **/
  constructor(private service: UserAuthService) {
    service.getMunicipality().toPromise().then((municipality) => {
      this.municipality = municipality || '';
    });
  }

}
