import { Component } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-library-homepage',
  templateUrl: './library-homepage.component.html',
  styleUrl: './library-homepage.component.css'
})
/**
 * Library Homepage Component
 *
 * Este componente representa a página inicial da biblioteca
 *
 * @param municipality - Nome da cidade do cidadão
 */ 
export class LibraryHomepageComponent {

  municipality: string = '';

  /**
   * @constructor
   * LibraryHomepageComponent
   *
   * @param service - Serviço de autenticação do usuário
   */ 
  constructor(private service: UserAuthService) {
    service.getMunicipality().toPromise().then((municipality) => {
      this.municipality = municipality || '';
    });
  }

}


