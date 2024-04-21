import { Component } from '@angular/core';
import { Municipality } from '../../services/municipal-admin-auth.service';
import { Roles, UserAuthService } from '../../services/user-auth.service';
import { EventsService, Event } from '../../services/events/events.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-municipal-events',
  templateUrl: './municipal-events.component.html',
  styleUrl: './municipal-events.component.css'
})
 /**
  *
  * @class MunicipalEventsComponent
  *
  * Este componente é responsável por exibir os eventos municipais.
  *
  * @param municipality - O município.
  * @param user - O utilizador.
  * @param isMunAdmin - O estado do administrador municipal.
  * @param events - A lista de eventos.
  * @param eventIdToRemove - O ID do evento a remover.
  * @param showEvents - Os eventos a exibir.
  * @param nameSearch - A pesquisa por nome.
  * @param ascendingOrder - A ordem ascendente.
  * @param orderOptions - As opções de ordem.
  * @param isLoading - O estado de carregamento.
  * @param currentPage - A página atual.
  * @param itemsPerPage - O número de itens por página.
  * @param isDialogOpen - O estado do dialog.
  * @param isRemoveEventDialogOpen - O estado do dialog de remoção de evento.
  * @param dialogTitle - O título do dialog.
  * @param dialogMessage - A mensagem do dialog.
  *
  */
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
  nameSearch: string = '';
  ascendingOrder: boolean = true;
  orderOptions: any[] = [{ label: 'Brevemente', value: true }, { label: 'Eventos Futuros', value: false }];
 

  isLoading = false;
  currentPage = 1;
  itemsPerPage = 3;

  isDialogOpen: boolean = false;
  isRemoveEventDialogOpen: boolean = false;
  dialogTitle = '';
  dialogMessage = '';
  

  /**
   *  @constructor
   *
   * MunicipalEventsComponent
   *
   * Construtor do componente.
   *
   * @param userAuthService - O serviço de autenticação de utilizador.
   * @param eventsService - O serviço de eventos.
   * @param router - O router.
   *
   */
  constructor(private userAuthService: UserAuthService, private eventsService: EventsService, private router: Router) { }

  /**
   * Método executado ao inicializar o componente.
   */
  ngOnInit(): void {
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
              (municipalityRes: any) => {
                this.municipality = municipalityRes as Municipality;
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



  /**
   * Método para carregar os dados.
   */
  loadData() {

    this.eventsService.getEventByMunicipality(this.municipality.name).subscribe(
      (eventsRes: any) => {
        this.events = eventsRes as Event[];
        this.sortEventsByDate();
      },
      error => {
        console.error(error);
      }
    );
     

  }

  /**
   * Método para carregar mais eventos.
   */
  onScrollDown() { 
    if (this.events.length > this.showEvents.length) {
      this.currentPage++;
      this.showEvents = [...this.showEvents, ...this.eventsService.getPaginationEvent(this.currentPage, this.itemsPerPage, this.events)];
    }
  } 

  /**
   * Método para navegar para a página de criação de evento.
   */
  goToCreateEventPage() {
    this.router.navigateByUrl(`events/create`);
  }

  /**
   * Método para navegar para o calendário do Município.
   */
  goToMunicipalCalendarPage() {
    this.router.navigateByUrl(`events/municipal-calendar`);
  }

  /**
   * Método para navegar para os eventos em que o cidadão está inscrito.
   */
  goToMyEventsPage() {
    this.router.navigateByUrl(`events/myEvents`);
  }

  /**
   * Método para navegar para o calendário de eventos do cidadão.
   */
  goToCalendarPage() {
    this.router.navigateByUrl(`events/calendar`);
  }

  /** 
   * Método para abrir o dialog de remoção de evento.
   * @param eventData - Os dados do evento.
   */
  openRemoveEventDialog(eventData: string) {

    const [eventId, eventTitle] = eventData.split('|');

    
    this.isRemoveEventDialogOpen = true;
    this.dialogTitle = 'Deseja apagar o evento ' + eventTitle + '?';
    this.dialogMessage = 'Confirme a sua ação';
    this.eventIdToRemove = eventId;
  }

  /**
   * Método para fechar o dialog de remoção de evento.
   */
  closeRemoveEventDialog() {
    this.isRemoveEventDialogOpen = false;
  }

  /**
   * Método para fechar o dialog.
   */
  closeDialog() {
    this.isDialogOpen = false;
    window.location.reload();
  }

  /**
   * Método para remover um evento.
   */
  removeEvent() {
    this.closeRemoveEventDialog();


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

  /**
   * Método para filtrar eventos.
   */
  get filteredEvents() {
    if (this.nameSearch == '') return this.showEvents;
    return this.events.filter(e => e.title.toLowerCase().includes(this.nameSearch.toLowerCase()));
  }


  /**
   * Método para alternar a ordem de ordenação.
   */
  toggleSortOrder() {

    this.sortEventsByDate();
  }

  /**
   * Método para ordenar eventos por data.
   */
  sortEventsByDate() {
    this.currentPage = 1;
    if (this.ascendingOrder) {
      this.events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
      this.showEvents = this.eventsService.getPaginationEvent(this.currentPage, this.itemsPerPage, this.events);
      
    } else {
      this.events.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
      this.showEvents = this.eventsService.getPaginationEvent(this.currentPage, this.itemsPerPage, this.events);
    }
  }
}
