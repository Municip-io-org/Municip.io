import { Component } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { Municipality } from '../../services/municipal-admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-municipal-profile',
  templateUrl: './municipal-profile.component.html',
  styleUrl: './municipal-profile.component.css'
})
export class MunicipalProfileComponent {
  
  constructor(private userAuthService: UserAuthService, private router: Router) { }


  anyUser: any;
  user: any;



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
          (res: any) => {
            this.user = res;
            console.log("user", this.user);

            this.userAuthService.getInfoMunicipality(this.user.municipality).subscribe(
              (municipalityRes: any) => {
                this.municipality = municipalityRes as Municipality;
                console.log("municipality", this.municipality);
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

  pendingCitizensClick() {
    this.router.navigateByUrl("/");
  }

  approveDocumentsClick() {
    this.router.navigateByUrl("/");
  }
}
