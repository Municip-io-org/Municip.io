import { Component } from '@angular/core';
import { Municipality } from '../../services/municipal-admin-auth.service';
import { Roles, UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-municipal-events',
  templateUrl: './municipal-events.component.html',
  styleUrl: './municipal-events.component.css'
})
export class MunicipalEventsComponent {
  municipality: Municipality = {
    name: '',
    president: '',
    contact: '',
    description: '',
    areaha: '',
    codigo: '',
    codigopostal: '',
    codigoine: '',
    descpstal: '',
    distrito: '',
    eleitores: '',
    email: '',
    fax: '',
    localidade: '',
    nif: '',
    populacao: '',
    rua: '',
    sitio: '',
    telefone: '',
    emblemPhoto: '',
    landscapePhoto: '',
  };

  user: any;
  isMunAdmin: boolean = false;

  public events = [
    {
      image: '/assets/images/carnaval.jpg', title: 'Event 1', date: new Date(2000, 0, 11),
      nRegistrations: 32,
      nTotalRegistrations: 40,
      text: 'Mostra fotográfica patente na Galeria de Exposições e no Espaço João Paulo Cotrim, que apela ao respeito pela diferença e ao combate ao racismo, sendo o resultado do palmilhar daquele território por Luís Ramos.' 
    },
    {
      image: '/assets/images/carnaval.jpg', title: 'Event 2', date: new Date(2000, 0, 12),
      nRegistrations: 32,
      nTotalRegistrations: 60,
      text: 'Mostra fotográfica patente na Galeria de Exposições e no Espaço João Paulo Cotrim, que apela ao respeito pela diferença e ao combate ao racismo, sendo o resultado do palmilhar daquele território por Luís Ramos.'
    },
    {
      image: '/assets/images/carnaval.jpg', title: 'Event 3', date: new Date(2000, 0, 13),
      nRegistrations: 32,
      nTotalRegistrations: 40,
      text: 'Mostra fotográfica patente na Galeria de Exposições e no Espaço João Paulo Cotrim, que apela ao respeito pela diferença e ao combate ao racismo, sendo o resultado do palmilhar daquele território por Luís Ramos.'
    },
    {
      image: '/assets/images/carnaval.jpg', title: 'Event 4', date: new Date(2000, 0, 14),
      nRegistrations: 32,
      nTotalRegistrations: 40,
      text: 'Mostra fotográfica patente na Galeria de Exposições e no Espaço João Paulo Cotrim, que apela ao respeito pela diferença e ao combate ao racismo, sendo o resultado do palmilhar daquele território por Luís Ramos.'
    },
    {
      image: '/assets/images/carnaval.jpg', title: 'Event 5', date: new Date(2000, 0, 15),
      nRegistrations: 32,
      nTotalRegistrations: 40,
      text: 'Mostra fotográfica patente na Galeria de Exposições e no Espaço João Paulo Cotrim, que apela ao respeito pela diferença e ao combate ao racismo, sendo o resultado do palmilhar daquele território por Luís Ramos.'
    },
  ];

  constructor(private userAuthService: UserAuthService) { }

  ngOnInit(): void {
    this.userAuthService.getUserData().subscribe(
      res => {
        let anyUser: any;
        anyUser = res;
        this.userAuthService.getInfoByEmail(anyUser.email).subscribe(
          async (res: any) => {
            this.user = res;
            console.log("user", this.user);


            const userRole = await this.userAuthService.getUserRole().toPromise();
            console.log(userRole);
            if (userRole!.role === Roles.Municipal) {
              console.log("É admin municipal")
              this.isMunAdmin = true;
            }

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

}
