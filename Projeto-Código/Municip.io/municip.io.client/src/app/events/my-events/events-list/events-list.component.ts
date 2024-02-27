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
  showEvents: Event[] = [];

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

    this.eventsService.getEventByCitizen(this.user.email).subscribe(
      (eventsRes: any) => {
        this.events = eventsRes as Event[];
        this.events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        this.showEvents = [...this.showEvents, ...this.eventsService.getPaginationEvent(this.currentPage, this.itemsPerPage, this.events)];
        this.toggleLoading();
      },
      error => {
        console.error(error);
      }
    );

    this.showEvents = this.eventsService.getPaginationEvent(this.currentPage, this.itemsPerPage, this.events);


  }

  onScrollDown() {
    if (this.events.length > this.showEvents.length) {
      console.log("Scroll");
      console.log((this.events.length > this.showEvents.length));

      this.currentPage++;
      this.showEvents = [...this.showEvents, ...this.eventsService.getPaginationEvent(this.currentPage, this.itemsPerPage, this.events)];
      this.toggleLoading();
    }
  } 

}
