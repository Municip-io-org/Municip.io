
import { Component } from '@angular/core';
import { Roles, UserAuthService } from '../../services/user-auth.service';
import { MunicipalAdministrator, Municipality } from '../../services/municipal-admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mun-admin-home-page',
  templateUrl: './mun-admin-home-page.component.html',
  styleUrl: './mun-admin-home-page.component.css'
})
export class MunAdminHomePageComponent {
  constructor(private userAuthService: UserAuthService, private router: Router) { }


  anyUser: any;
  role: string = "";

  user: MunicipalAdministrator = {
    firstName: '',
    surname: '',
    email: '',
    password: '',
    municipality: ''
  };


  municipality: Municipality = {
    areaha: '0',
    codigo: '0',
    codigoine: '0',
    contact: 'Sem contato',
    description: 'Sem descrição',
    descpstal: 'Sem descrição postal',
    distrito: 'Sem distrito',
    eleitores: '0',
    email: 'sem_email@example.com',
    fax: 'Sem fax',
    localidade: 'Sem localidade',
    name: 'Sem nome',
    nif: '000000000',
    populacao: '0',
    president: 'Sem presidente',
    rua: 'Sem rua',
    sitio: 'Sem sitio',
    telefone: 'Sem telefone',
    emblemPhoto: 'Sem emblema',
    landscapePhoto: 'Sem landscape',
  };


  ngOnInit(): void {
    this.userAuthService.getUserData().subscribe(
      res => {
        this.anyUser = res;
        this.userAuthService.getInfoByEmail(this.anyUser.email).subscribe(
          res => {
            this.user = res as MunicipalAdministrator;
            console.log("user", this.user);

            this.userAuthService.getInfoMunicipality(this.user.municipality).subscribe(
              res => {
                this.municipality = res as Municipality;
                console.log("municipality", this.municipality);

              },
              error => {
                console.error(error);
              }
            )
          });
      },
      error => {
        console.error(error);
      }
    );

    this.userAuthService.getUserRole().subscribe(
      res => {
        if (res.role == Roles.Municipal) {
          this.role = res.role;
        }
      },
      error => {
        console.error(error);
      }
    );

  }

  pendingCitizensClick() {
    this.router.navigateByUrl("/");
  }

  approveDocumentsClick() {
    this.router.navigateByUrl("/");
  }
}
