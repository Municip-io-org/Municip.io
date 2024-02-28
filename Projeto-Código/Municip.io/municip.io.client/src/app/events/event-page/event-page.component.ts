import { Component } from '@angular/core';
import { Roles, UserAuthService } from '../../services/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Municipality } from '../../services/municipal-admin-auth.service';
import { EventsService, Event } from '../../services/events/events.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css'
})
export class EventPageComponent {

  isDialogOpen: boolean = false;
  isRemoveEventDialogOpen: boolean = false;
  dialogTitle = '';
  dialogMessage = '';
  isSuccesfullEnroll : boolean = false;
  

  event: Event = {
    id: '',
    title: 'Sem Titulo',
    capacity: 0,
    nRegistrations: 0,
    startDate: new Date(),
    endDate: new Date(),
    startRegistration: new Date(),
    endRegistration: new Date(),
    local: 'Sem Local',
    image: 'Sem Imagem',
    description: 'Sem Descrição',
    citizens: [],
    municipality: ''
  };

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
  itemsPerPage = 6;



  constructor(private userAuthService: UserAuthService, private activatedRoute: ActivatedRoute, private router: Router, private EventsService: EventsService) { }

  ngOnInit(): void {
    this.event = this.activatedRoute.snapshot.data['event'];
    console.log("EVENTO SELECIONADO");
    console.log(this.event);

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
              (municipalityRes: Municipality) => {
                this.municipality = municipalityRes;

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

  closeDialog() {
    this.isDialogOpen = false;
    window.location.reload();
  }

  goToEditEventPage() {
    this.router.navigateByUrl(`/events/edit/${this.event.id}`);
  }

  enrollInEvent(eventId: string, email: string) {
    console.log('Inscrição no evento:');
    this.EventsService.enrollEvent(eventId, email).subscribe(
      response => {
        this.isSuccesfullEnroll = true;
        this.isDialogOpen = true;
        this.dialogTitle = 'Inscrição bem-sucedida';
        this.dialogMessage = 'Foi inscrito com sucesso no evento ' + this.event.title;
        

        
      },
      error => {
        this.isSuccesfullEnroll = false;
        this.isDialogOpen = true;
        this.dialogTitle = 'Erro na inscrição';
        this.dialogMessage = error.error.message;
        console.log(error)
      }
    );
  }

  dropOutEvent(eventId: string, email: string) {

    this.EventsService.dropOutEvent(eventId, email).subscribe(
      response => {
        this.isDialogOpen = true;
        this.dialogTitle = 'Desistência bem-sucedida';
        this.dialogMessage = 'Desistiu com sucesso do evento ' + this.event.title;
        
        this.isSuccesfullEnroll = true;
        
      },
      error => {
        this.isDialogOpen = true;
        this.dialogTitle = 'Erro na desistência';
        this.dialogMessage = error.error.message;
        console.log(error)
      }
    );
  }

  openRemoveEventDialog() {
    console.log('Remoção do evento:' + this.event.id);
    this.isRemoveEventDialogOpen = true;
    this.dialogTitle = 'Deseja apagar o evento ' + this.event.title + '?';
    this.dialogMessage = 'Confirme a sua ação';
  }

  closeRemoveEventDialog() {
    this.isRemoveEventDialogOpen = false;
  }

  removeEvent() {
    this.closeRemoveEventDialog();
    console.log('Remover do evento: ' + this.event.id);
   
    this.EventsService.removeEvent(this.event.id!).subscribe(
      response => {
        if (response.status === 200) {
          this.router.navigateByUrl(`/events`);
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



  isEnrolled(): boolean {
    
    for (const citizen of this.event.citizens || []) {
      if (citizen.email === this.user.email) return true;
    }
    return false;
  }
}




