import { Component } from '@angular/core';
import { Roles, UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';
import { AppFeature, AppFeaturesService } from '../../services/appFeatures/app-features.service';

@Component({
  selector: 'app-header-loggedin',
  templateUrl: './header-loggedin.component.html',
  styleUrl: './header-loggedin.component.css'
})
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

  constructor(private auth: UserAuthService, private appFeaturesService: AppFeaturesService, private router: Router) { }

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

    this.auth.getUserRole().subscribe(
      res => {

        this.role = res.role;

      },
      error => {
        console.error(error);
      }
    );
  }

  get Roles() {
    return Roles;
  }

  signOut() {
    if (this.isSignedIn) {
      this.auth.signOut().forEach(response => {
        if (response) {
          this.router.navigateByUrl('');
        }
      });
    }
  }

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
      case Dropdowns.Municipality:
        this.showDropdownMunicipality = !this.showDropdownMunicipality;
        break;
      default:
    }
  }


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
      if (dropdown !== Dropdowns.Municipality) {
        this.showDropdownMunicipality = false;
      }
    }


  


  get Dropdowns() {
    return Dropdowns;
  }

  goToHomePage() {
    if (this.role === 'Citizen') {
      this.router.navigateByUrl(`/citizen/homePage`)
    }
    if (this.role === 'Municipal') {
      this.router.navigateByUrl(`/municipal/homePage`)
    }
  }

  isDocumentsFeatureActive() {
    return this.appFeatures.find(a => a.appFeatureCategory == "Documents")?.isEnabled;
  }

  isEventsFeatureActive() {
    return this.appFeatures.find(a => a.appFeatureCategory == "Events")?.isEnabled;
  }

  isNewsFeatureActive() {
    return this.appFeatures.find(a => a.appFeatureCategory == "News")?.isEnabled;
  }

  isTransportsFeatureActive() {
    return this.appFeatures.find(a => a.appFeatureCategory == "Transports")?.isEnabled;
  }
}




//create a ennum for the name of the dropdowns




export enum Dropdowns {
    Events = 'events',
    Library = 'library',
    Documents = 'documents',
    News = 'news',
    Transports = 'transports',
    CloseAll = 'closeAll',
    Municipality = "Municipality"
}




