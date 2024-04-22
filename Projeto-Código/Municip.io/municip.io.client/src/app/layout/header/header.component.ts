import { Component, HostBinding, HostListener } from '@angular/core';
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

  @HostBinding('class.visible') isVisible = true;
  private lastScrollTop = 50;
  private scroolOffset = 50;

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

    //get the entire url, like domain+path
    let url = window.location.href;

  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > this.lastScrollTop && scrollTop > this.scroolOffset) {
      // Scrolling down
      this.isVisible = false;
    } else {
      // Scrolling up
      this.isVisible = true;
    }

    this.lastScrollTop = scrollTop;
  }


}
