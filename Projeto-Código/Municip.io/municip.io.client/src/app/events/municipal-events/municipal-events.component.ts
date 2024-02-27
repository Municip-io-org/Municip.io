import { Component } from '@angular/core';
import { Municipality } from '../../services/municipal-admin-auth.service';
import { Roles, UserAuthService } from '../../services/user-auth.service';
import { EventsService, Event } from '../../services/events/events.service';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { Router } from '@angular/router';

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
  eventIdToRemove: string = '';
  showEvents: Event[] = [];

  isLoading = false;
  currentPage = 1;
  itemsPerPage = 3;

  isDialogOpen: boolean = false;
  isRemoveEventDialogOpen: boolean = false;
  dialogTitle = '';
  dialogMessage = '';
  

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

    this.eventsService.getEventByMunicipality(this.municipality.name).subscribe(
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

 

  goToCreateEventPage() {
    this.router.navigateByUrl(`events/create`);
  }

  openRemoveEventDialog(eventData: string) {

    const [eventId, eventTitle] = eventData.split('|');

    console.log('Remoção do evento:' + eventTitle);
    this.isRemoveEventDialogOpen = true;
    this.dialogTitle = 'Deseja apagar o evento ' + eventTitle + '?';
    this.dialogMessage = 'Confirme a sua ação';
    this.eventIdToRemove = eventId;
  }

  closeRemoveEventDialog() {
    this.isRemoveEventDialogOpen = false;
  }

  closeDialog() {
    this.isDialogOpen = false;
    window.location.reload();
  }

  
  removeEvent() {
    this.closeRemoveEventDialog();

    console.log('Remover do evento: ' + this.eventIdToRemove);

    this.eventsService.removeEvent(this.eventIdToRemove).subscribe(
      response => {
        if (response.status === 200) {
          window.location.reload();
        } else {
          this.isDialogOpen = true;
          this.dialogTitle = 'Erro na remoção do evento';
          this.dialogMessage = 'Ocorreu um erro ao remover o evento';
        }
      },
      error => {
        console.error('Erro ao remover o evento:', error);
        this.isDialogOpen = true;
        this.dialogTitle = 'Erro na remoção do evento';
        this.dialogMessage = 'Ocorreu um erro ao remover o evento';
      }
    );
  }
}
