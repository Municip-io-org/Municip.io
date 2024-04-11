import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
/**
 * HeaderComponent
 *
 * Este componente é utilizado para o cabeçalho.
 *
 */
export class HeaderComponent {

  /**
   *
   * @constructor
   *
   * HeaderComponent
   * 
   * @param auth: UserAuthService - O serviço de autenticação do utilizador.
   * @param router: Router - O router.
   * 
   * Inicializador do componente HeaderComponent.
   */
  constructor(private auth: UserAuthService, private router: Router) { }

  ngOnInit() {

  }


  //click for change the language
  onChange(value: any) {
    console.log(value.target.value);

    //get the entire url, like domain+path
    let url = window.location.href;
    console.log(url);





  }


}
