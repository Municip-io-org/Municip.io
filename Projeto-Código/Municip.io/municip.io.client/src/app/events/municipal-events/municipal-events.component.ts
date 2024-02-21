import { Component } from '@angular/core';
import { Municipality } from '../../services/municipal-admin-auth.service';
import { Roles, UserAuthService } from '../../services/user-auth.service';
import { EventsService, Event } from '../../services/events/events.service';

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

  events: Event[] = [];
  isLoading = false;
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private userAuthService: UserAuthService, private eventsService: EventsService) { }

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
    this.eventsService.getItems(this.currentPage, this.itemsPerPage).subscribe({
      next: res => this.events = res,
      error: err => console.log(err),
      complete: () => this.toggleLoading(),
    });
  }

  onScrollDown() {
    this.currentPage++;

    this.toggleLoading();
    this.eventsService.getItems(this.currentPage, this.itemsPerPage).subscribe({
      next: res => this.events = [...this.events, ...res],
      error: err => console.log(err),
      complete: () => this.toggleLoading(),
    });
  } 

  
}
