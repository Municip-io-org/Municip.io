import { Component } from '@angular/core';
import { Municipality } from '../../services/municipal-admin-auth.service';
import { Citizen } from '../../services/citizen-auth.service';
import { Roles, UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-citizen-home-page',
  templateUrl: './citizen-home-page.component.html',
  styleUrl: './citizen-home-page.component.css'
})
export class CitizenHomePageComponent {

  constructor(private userAuthService: UserAuthService) { }

  public date1 = new Date(2000, 0, 10);

  public events = [
    { image: '/assets/images/carnaval.jpg', title: 'Event 1', date: new Date(2000, 0, 11) },
    { image: '/assets/images/carnaval.jpg', title: 'Event 2', date: new Date(2000, 0, 12) },
    { image: '/assets/images/carnaval.jpg', title: 'Event 3', date: new Date(2000, 0, 13) },
    { image: '/assets/images/carnaval.jpg', title: 'Event 4', date: new Date(2000, 0, 14) },
    { image: '/assets/images/carnaval.jpg', title: 'Event 5', date: new Date(2000, 0, 15) },
  ];

  public startIndex = 0;

  moveLeft() {
    if (this.startIndex > 0) {
      this.startIndex--;
    }
  }

  moveRight() {
    if (this.startIndex < this.events.length - 4) {
      this.startIndex++;
    }
  }

  anyUser: any;
  role: string = "";

  user: Citizen = {
    firstName: 'Sem Nome',
    surname: 'Sem Apelido',
    email: 'Sem email',
    password: '',
    nif: 'Sem nif',
    gender: '',
    municipality: 'Sem município',
    address: 'Sem endereço',
    postalCode1: '0000-000',
    postalCode2: '000',
    birthDate: new Date(),
    photo: "/assets/images/maria.jpg"
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
            this.user = res as Citizen;
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
        if (res.role == Roles.Citizen) {
          this.role = res.role;
        }
      },
      error => {
        console.error(error);
      }
    );



  }
}
