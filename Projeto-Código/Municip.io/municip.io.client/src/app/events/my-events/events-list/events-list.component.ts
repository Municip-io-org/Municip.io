import { Component } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth.service';
import { EventsService, Event } from '../../../services/events/events.service';
import { Router } from '@angular/router';
import { Municipality } from '../../../services/municipal-admin-auth.service';
import { Citizen } from '../../../services/citizen-auth.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css'
})
export class EventsListComponent {
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

  events: Event[] = [];
  isLoading = false;
  currentPage = 1;
  itemsPerPage = 6;


  constructor(private userAuthService: UserAuthService, private eventsService: EventsService, private router: Router) { }

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
            

            this.userAuthService.getInfoMunicipality(this.user.municipality).subscribe(
              (municipalityRes: any) => {
                this.municipality = municipalityRes as Municipality;

                console.log("municipality", this.municipality);


                this.loadData();
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

  toggleLoading() { this.isLoading = !this.isLoading; }

  loadData() {
    this.toggleLoading();
    this.eventsService.getPaginationEventByCitizen(this.currentPage, this.itemsPerPage, this.user.email).subscribe({
      next: res => this.events = res,
      error: err => console.log(err),
      complete: () => this.toggleLoading(),
    });
  }

  onScrollDown() {
    this.currentPage++;

    this.toggleLoading();
    this.eventsService.getPaginationEventByCitizen(this.currentPage, this.itemsPerPage, this.user.email).subscribe({
      next: res => this.events = [...this.events, ...res],
      error: err => console.log(err),
      complete: () => this.toggleLoading(),
    });
  } 

}
