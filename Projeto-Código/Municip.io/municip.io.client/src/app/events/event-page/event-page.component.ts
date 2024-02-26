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
  }

  goToEditEventPage(eventId: string) {
    this.router.navigateByUrl(`/events/edit/${eventId}`);
  }

  enrollInEvent(eventId: string, email: string) {
    console.log('Inscrição no evento:');
    this.EventsService.enrollEvent(eventId, email).subscribe(
      response => {
        this.isSuccesfullEnroll = true;
        this.isDialogOpen = true;
        this.dialogTitle = 'Inscrição bem-sucedida';
        this.dialogMessage = 'Foi inscrito com sucesso no evento ' + this.event.title;
        this.event.nRegistrations++;
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
}




