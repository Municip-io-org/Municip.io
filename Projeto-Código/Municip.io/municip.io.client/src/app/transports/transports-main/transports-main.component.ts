import { Component } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';

/**
 * Componente para a página principal de transportes.
  */
@Component({
  selector: 'app-transports-main',
  templateUrl: './transports-main.component.html',
  styleUrl: './transports-main.component.css'
})
export class TransportsMainComponent {


  municipality: string = '';

  /**
   * Método construtor para instanciar o componente.
   * @param service
   */
  constructor(private service: UserAuthService) {
    service.getMunicipality().toPromise().then((municipality) => {
      this.municipality = municipality || '';
    });
  }

  /**
   * Método oninit
   */
  ngOnInit(): void {
  }



}
