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
/**
 * @class EventPageComponent
 *
 * Este componente é responsável por exibir a página de um evento.
 *
 * @param isDialogOpen - O estado do dialog.
 * @param isRemoveEventDialogOpen - O estado do dialog de remoção de evento.
 * @param dialogTitle - O título do dialog.
 * @param dialogMessage - A mensagem do dialog.
 * @param isSuccesfullEnroll - O estado da inscrição.
 * @param isEnrolledDialogOpen - O estado do dialog de inscrição.
 * @param dialogEnrolledTitle - O título do dialog de inscrição.
 * @param dialogEnrolledMessage - A mensagem do dialog de inscrição.
 * @param isAddGenreDialogOpen - O estado do dialog de adição de género.
 * @param isConfirm - O estado de confirmação.
 * @param event - O evento.
 * @param municipality - O município.
 * @param user - O utilizador.
 * @param isMunAdmin - O estado do administrador municipal.
 * @param events - A lista de eventos.
 * @param isLoading - O estado de carregamento.
 * @param currentPage - A página atual.
 * @param itemsPerPage - O número de itens por página.
 * 
 * 
 * @returns A página de um evento.
 *
 **/
export class EventPageComponent {

  isDialogOpen: boolean = false;
  isRemoveEventDialogOpen: boolean = false;
  dialogTitle = '';
  dialogMessage = '';
  isSuccesfullEnroll: boolean = false;

  isEnrolledDialogOpen: boolean = false;
  dialogEnrolledTitle = '';
  dialogEnrolledMessage = '';
  isAddGenreDialogOpen: boolean = false;
  isConfirm: boolean = true;


  

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

  /**
   * @constructor
   *
   * Este é o contrutor do componente EventPageComponent.
   * 
   * @param userAuthService
   * @param activatedRoute
   * @param router
   * @param EventsService
   */
  constructor(private userAuthService: UserAuthService, private activatedRoute: ActivatedRoute, private router: Router, private EventsService: EventsService) { }

  /**
     *
     * Este método é responsável por obter as informações di utilizador, do evento e do município.
     *
     * @returns A lista de templates de documentos.
     *
     */
  ngOnInit(): void {
    this.event = this.activatedRoute.snapshot.data['event'];

    this.userAuthService.getUserData().subscribe(
      res => {
        let anyUser: any;
        anyUser = res;
        this.userAuthService.getInfoByEmail(anyUser.email).subscribe(
          async (res: any) => {
            this.user = res;


            const userRole = await this.userAuthService.getUserRole().toPromise();
            if (userRole!.role === Roles.Municipal) {
              this.isMunAdmin = true;
            }

            this.userAuthService.getInfoMunicipality(this.user.municipality).subscribe(
              (municipalityRes: Municipality) => {
                this.municipality = municipalityRes;

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


  /**
   *
   * Este método é responsável por fechar o dialog.
   * 
   */
  closeDialog() {
    this.isDialogOpen = false;
    this.isEnrolledDialogOpen = false;
  }

  /**
   *
   * Este método é responsável por abrir o dialog.
   * 
   */
  openEnrolledDialog() {
    this.dialogEnrolledTitle = 'Cidadãos inscritos no evento '+ this.event.title ;
    this.isEnrolledDialogOpen = true;

    //show enrolled citizens

    if (this.event.citizens != null) {
      //loop all citizens
      this.dialogEnrolledMessage = '';
      for (const citizen of this.event.citizens) {
        this.dialogEnrolledMessage += citizen.firstName + ' ' + citizen.surname + ' - ' + citizen.email + '\n';
      }

    }

  }

  /**
   *
   * Este método é responsável por fechar o dialog.
   * 
   */
  closeEnrolledDialog() {
    this.isEnrolledDialogOpen = false;

    

  }

  /**
   *
   * Este método é responsável por redirecionar para a pagina de edição de um evento
   * 
   */
  goToEditEventPage() {
    this.router.navigateByUrl(`/events/edit/${this.event.id}`);
  }

  /** 
  *
  * Este método é responsável por inscrever um cidadão num evento
  *
  * @param eventId - ID do evento
  * @param email - email do cidadão
  */
  enrollInEvent(eventId: string, email: string) {
    this.EventsService.enrollEvent(eventId, email).subscribe(
      response => {
        this.isSuccesfullEnroll = true;
        this.isDialogOpen = true;
        this.dialogTitle = 'Inscrição bem-sucedida';
        this.dialogMessage = 'Foi inscrito com sucesso no evento ' + this.event.title;
        
        this.isSuccesfullEnroll = true;
        this.event.nRegistrations++;
        this.event.citizens?.push(this.user);
        
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


  /**
   *
   * Este método é responsável por desistir de um evento
   *
   * @param eventId - ID do evento
   * @param email - email do cidadão
   *
   */
  dropOutEvent(eventId: string, email: string) {
    this.EventsService.dropOutEvent(eventId, email).subscribe(
      response => {
        this.isDialogOpen = true;
        this.dialogTitle = 'Desistência bem-sucedida';
        this.dialogMessage = 'Desistiu com sucesso do evento ' + this.event.title;

        this.isSuccesfullEnroll = true;

        this.event.nRegistrations--;
        if (this.event.citizens && this.user) {
          const index = this.event.citizens.findIndex(citizen => citizen.email === this.user.email);
          if (index !== -1) {
            this.event.citizens.splice(index, 1);
          }
        }
      },
      error => {
        this.isDialogOpen = true;
        this.dialogTitle = 'Erro na desistência';
        this.dialogMessage = error.error.message;
        console.log(error)
      }
    );
  }


  /**
   *
   * Este método é responsável por abrir o dialog de remoção de evento
   * 
   */
  openRemoveEventDialog() {
    this.isRemoveEventDialogOpen = true;
    this.dialogTitle = 'Deseja apagar o evento ' + this.event.title + '?';
    this.dialogMessage = 'Confirme a sua ação';
  }

  /**
   *
   * Este método é responsável por fechar o dialog de remoção de evento
   * 
   */
  closeRemoveEventDialog() {
    this.isRemoveEventDialogOpen = false;
  }

  /**
   *
   * Este método é responsável por remover um evento
   * 
   */
  removeEvent() {
    this.closeRemoveEventDialog();
   
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


  /**
   *
   * Este método é responsável por verificar se um cidadão está inscrito num evento
   * 
   */

  isEnrolled(): boolean {
    
    for (const citizen of this.event.citizens || []) {
      if (citizen.email === this.user.email) return true;
    }
    return false;
  }
}




