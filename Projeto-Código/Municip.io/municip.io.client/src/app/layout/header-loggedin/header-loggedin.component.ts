import { Roles, UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';
import { AppFeature, AppFeaturesService } from '../../services/appFeatures/app-features.service';
import { DocsService } from '../../services/documents/docs.service';
import { Component, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'app-header-loggedin',
  templateUrl: './header-loggedin.component.html',
  styleUrl: './header-loggedin.component.css'
})

/**
 * HeaderComponent
 *
 * Este componente é utilizado para o cabeçalho.
 *
 * @param isSignedIn: boolean - O estado de autenticação do utilizador.
 * @param user: any - A informação do utilizador.
 * @param firstName: string - O primeiro nome do utilizador.
 * @param photo: string - A foto do utilizador.
 * @param role: string - O papel do utilizador.
 * @param appFeatures: AppFeature[] - As funcionalidades da aplicação.
 * @param showDropdownAgenda: boolean - O estado do dropdown de agenda.
 * @param showDropdownBiblioteca: boolean - O estado do dropdown de biblioteca.
 * @param showDropdownDocumentos: boolean - O estado do dropdown de documentos.
 * @param showDropdownNoticias: boolean - O estado do dropdown de notícias.
 * @param showDropdownTransportes: boolean - O estado do dropdown de transportes.
 * @param showSignOutDropdown: boolean - O estado do dropdown de sair.
 * @param showDropdownMunicipality: boolean - O estado do dropdown de município.
 * @param showDropdownAdmin: boolean - O estado do dropdown de administração.
 * @param numberOfRequests: number - O número de pedidos.
 * 
 */
export class HeaderLoggedinComponent {
  isSignedIn: boolean = false;
  user: any;
  firstName: string = '';
  photo: string = '';
  role: string = '';

  appFeatures: AppFeature[] = [];


  showDropdownAgenda: boolean = false;
  showDropdownBiblioteca: boolean = false;
  showDropdownDocumentos: boolean = false;
  showDropdownNoticias: boolean = false;
  showDropdownTransportes: boolean = false;
  showSignOutDropdown: boolean = false;
  showDropdownMunicipality: boolean = false;
  showDropdownAdmin: boolean = false;

  numberOfRequests: number = 0;

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
   * @param appFeaturesService: AppFeaturesService - O serviço de funcionalidades da aplicação.
   * @param router: Router - O router.
   * @param docsService: DocsService - O serviço de documentos.
   * 
   * Inicializador do componente HeaderComponent.
   */
  constructor(private auth: UserAuthService, private appFeaturesService: AppFeaturesService, private router: Router, private docsService : DocsService ) { }

  /**
   * ngOnInit
   *
   * Método que é chamado quando o componente é inicializado.
   */
  ngOnInit() {
    this.auth.onStateChanged().forEach((state: any) => {
      this.auth.isSignedIn().forEach((signedIn: boolean) => this.isSignedIn = signedIn);
    });

    this.auth.getUserData().subscribe(
      res => {
        this.user = res;
        var emailToParse = this.user.email;
        var emailParsed = emailToParse.replace('@', '%40');
        this.auth.getInfoByEmail(emailParsed).subscribe(
          res => {
            this.user = res;
            this.firstName = this.user.firstName;
            this.photo = this.user.photo;


            this.appFeaturesService.getAppFeaturesByMunicipality(this.user.municipality).subscribe(
              (appFeaturesRes: AppFeature[]) => {

                this.appFeatures = appFeaturesRes;

                this.auth.getUserRole().subscribe(
                  res => {

                    this.role = res.role;
                    if (this.role === Roles.Municipal) {
                      this.docsService.numberOfRequestsToApprove(this.user.municipality).subscribe(
                        res => {
                          this.numberOfRequests = res;
                          console.log("São" + this.numberOfRequests);
                        });

                    }





                  },
                  error => {
                    console.error(error);
                  }
                );


              },
              error => {
                console.error(error);
              }
            );


          },
          error => {
            console.error(error);

          }
        );
      },
      error => {
        console.error(error);
      }
    );

  }

  get Roles() {
    return Roles;
  }

  /**
   * signOut
   *
   * Método que é chamado quando o utilizador faz logout.
   *
   */ 
  signOut() {
    if (this.isSignedIn) {
      this.auth.signOut().forEach(response => {
        if (response) {
          this.router.navigateByUrl('');
        }
      });
    }
  }

  /**
   * setActiveDropdown
   *
   * Método que é chamado quando um dropdown é ativado.
   *
   * @param dropdown: Dropdowns - O dropdown.
   */
  setActiveDropdown(dropdown: Dropdowns) {
    this.closeAllOtherDropdowns(dropdown);

    switch (dropdown) {
      case Dropdowns.Events:
        this.showDropdownAgenda = !this.showDropdownAgenda;
        break;
      case Dropdowns.Library:
        this.showDropdownBiblioteca = !this.showDropdownBiblioteca;
        break;
      case Dropdowns.Documents:
        this.showDropdownDocumentos = !this.showDropdownDocumentos;
        break;
      case Dropdowns.News:
        this.showDropdownNoticias = !this.showDropdownNoticias;
        break;
      case Dropdowns.Transports:
        this.showDropdownTransportes = !this.showDropdownTransportes;
        break;
      case Dropdowns.SignOut:
        this.showSignOutDropdown = !this.showSignOutDropdown;
        break;
      case Dropdowns.Municipality:
        this.showDropdownMunicipality = !this.showDropdownMunicipality;
        break;
      case Dropdowns.Admin:
        this.showDropdownAdmin = !this.showDropdownAdmin;
        break;

      default:
    }
  }


  /**
   * closeAllOtherDropdowns
   *
   * Método que é chamado para fechar todos os outros dropdowns.
   *
   * @param dropdown: Dropdowns - O dropdown.
   */
  closeAllOtherDropdowns(dropdown: Dropdowns) {
    if (dropdown !== Dropdowns.Events) {
      this.showDropdownAgenda = false;
    }
    if (dropdown !== Dropdowns.Library) {
      this.showDropdownBiblioteca = false;
    }
    if (dropdown !== Dropdowns.Documents) {
      this.showDropdownDocumentos = false;
    }
    if (dropdown !== Dropdowns.News) {
      this.showDropdownNoticias = false;
    }
    if (dropdown !== Dropdowns.Transports) {
      this.showDropdownTransportes = false;
    }
    if (dropdown !== Dropdowns.SignOut) {
      this.showSignOutDropdown = false;
    }
    if (dropdown !== Dropdowns.Municipality) {
      this.showDropdownMunicipality = false;
    }
    if (dropdown !== Dropdowns.Admin) {
      this.showDropdownAdmin = false;
    }
  }

  /**
   * closeAllDropdowns
   *
   * Método que é chamado para fechar todos os dropdowns.
   *
   * @param dropdown: Dropdowns - O dropdown.
   */
  closeAllDropdowns() {
    this.showDropdownAgenda = false;
    this.showDropdownBiblioteca = false;
    this.showDropdownDocumentos = false;
    this.showDropdownNoticias = false;
    this.showDropdownTransportes = false;
    this.showSignOutDropdown = false;
    this.showDropdownMunicipality = false;
    this.showDropdownAdmin = false;
  }



  get Dropdowns() {
    return Dropdowns;
  }

  /**
   * goToHomePage
   *
   * Método que é chamado quando o utilizador vai para a página inicial.
   *
   */
  goToHomePage() {
    if (this.role === 'Citizen') {
      this.router.navigateByUrl(`/citizen/homePage`)
    }
    if (this.role === 'Municipal') {
      this.router.navigateByUrl(`/municipal/homePage`)
    }
    if (this.role === 'Admin') {
      this.router.navigateByUrl(`/admindashboard`)
    }
  }

  /**
   *
   * Método que é chamado para verificiar se as funcionlidade Documentos está ativa.
   *
   */
  isDocumentsFeatureActive() {
    return this.appFeatures.find(a => a.appFeatureCategory == "Documents")?.isEnabled;
  }
  /**
   *
   * Método que é chamado para verificiar se as funcionlidade Eventos está ativa.
   *
   */
  isEventsFeatureActive() {
    return this.appFeatures.find(a => a.appFeatureCategory == "Events")?.isEnabled;
  }

  /**
   *
   * Método que é chamado para verificiar se as funcionlidade Notícias está ativa.
   *
   */
  isNewsFeatureActive() {
    return this.appFeatures.find(a => a.appFeatureCategory == "News")?.isEnabled;
  }
  /**
   *
   * Método que é chamado para verificiar se as funcionlidade Transportes está ativa.
   *
   */
  isTransportsFeatureActive() {
    return this.appFeatures.find(a => a.appFeatureCategory == "Transports")?.isEnabled;
  }

  /**
  *
  * Método que é chamado para verificiar se as funcionlidade Biblioteca está ativa.
  *
  */
  isLibraryFeatureActive() {
    return this.appFeatures.find(a => a.appFeatureCategory == "Library")?.isEnabled;
  }


  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > this.lastScrollTop && scrollTop > this.scroolOffset) {
      // Scrolling down
      this.isVisible = false;
      this.closeAllDropdowns();
    } else {
      // Scrolling up
      this.isVisible = true;
    }
   

    this.lastScrollTop = scrollTop;
  }
}




export enum Dropdowns {
  Events = 'events',
  Library = 'library',
  Documents = 'documents',
  News = 'news',
  Transports = 'transports',
  SignOut = 'signOut',
  Municipality = "Municipality",
  Admin = "Admin",
  CloseAll = 'closeAll',
}




