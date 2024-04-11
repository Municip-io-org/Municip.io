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
/**
 *
 * @class EventsListComponent
 *
 * Este componente é responsável por exibir a lista de eventos.
 *
 * @param municipality - O município.
 * @param user - O utilizador.
 * @param events - A lista de eventos.
 * @param showEvents - Os eventos a exibir.
 * @param nameSearch - A pesquisa por nome.
 * @param ascendingOrder - A ordem ascendente.
 * @param orderOptions - As opções de ordem.
 * @param isLoading - O estado de carregamento.
 * @param currentPage - A página atual.
 * @param itemsPerPage - O número de itens por página.
 *
 */
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
  nameSearch: string = '';
  ascendingOrder: boolean = true;
  orderOptions: any[] = [{ label: 'Brevemente', value: true }, { label: 'Mais Distantes', value: false }];

  isLoading = false;
  currentPage = 1;
  itemsPerPage = 6;


  /**
   * @constructor
   *
   * EventsListComponent
   *
   * Construtor do componente.
   * @param userAuthService - O serviço de autenticação de utilizador.
   * @param eventsService - O serviço de eventos.
   * @param router - O router.
   *
   */
  constructor(private userAuthService: UserAuthService, private eventsService: EventsService, private router: Router) { }

  /**
   *
   * Este método é responsável por obter as informações di utilizador, do evento e do município.
   *
   * @returns A lista de templates de documentos.
   *
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
   * Este método é responsável por alternar o estado de carregamento.
   */
  toggleLoading() { this.isLoading = !this.isLoading; }

  /**
   * Este método é responsável por carregar os dados.
   */
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

  /**
   * Este método é responsável por carregar mais eventos.
   */
  onScrollDown() {
    if (this.events.length > this.showEvents.length) {

      this.currentPage++;
      this.showEvents = [...this.showEvents, ...this.eventsService.getPaginationEvent(this.currentPage, this.itemsPerPage, this.events)];
      this.toggleLoading();
    }
  }

  /**
   * Este método é responsável por filtrar os eventos.
   */
  get filteredEvents() {
    if (this.nameSearch == '') return this.showEvents;
    return this.events.filter(e => e.title.toLowerCase().includes(this.nameSearch.toLowerCase()));
  }


  /**
   * Este método é responsável por alternar a ordem de classificação.
   */
  toggleSortOrder() {

    this.sortEventsByDate();
  }

  /**
   * Este método é responsável por ordenar os eventos por data.
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
