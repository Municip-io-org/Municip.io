import { Component } from '@angular/core';
import { AdminStatisticsService } from '../services/stats/admin-statistics.service';
import { Citizen } from '../services/citizen-auth.service';
import { MunicipalAdministrator } from '../services/municipal-admin-auth.service';
import { RequestDocument } from '../services/documents/docs.service';
import { UserAuthService } from '../services/user-auth.service';
import { Book, BookRequest, LibraryService } from '../services/library/library.service';

@Component({
  selector: 'app-munadmin-statistics-dashboard',
  templateUrl: './munadmin-statistics-dashboard.component.html',
  styleUrl: './munadmin-statistics-dashboard.component.css'
})

 /**
 * Municipal Administrator Statistics Dashboard Component
 *
 * Este componente representa o dashboard de estatísticas do administrador municipal
 *
 * @param selectedButton - Botão selecionado
 * @param orderOptions - Opções de ordenação
 * @param citizens - Cidadãos
 * @param municipalAdmins - Administradores municipais
 * @param municipalities - Municípios
 * @param documentRequests - Pedidos de documentos
 * @param numberOfCitizens - Número de cidadãos
 * @param activeCitizens - Cidadãos ativos
 * @param numberOfMunicipalAdmins - Número de administradores municipais
 * @param blockedCitizens - Cidadãos bloqueados
 * @param blockedCitizensPercentage - Percentagem de cidadãos bloqueados
 * @param news - Notícias
 * @param events - Eventos
 * @param newsPublished - Notícias publicadas
 * @param newsPublishedToday - Notícias publicadas hoje
 * @param eventsRegistered - Eventos registados
 * @param eventsToday - Eventos de hoje
 * @param documentsRequested - Documentos pedidos
 * @param documentsApproved - Documentos aprovados
 * @param totalEarnings - Total de ganhos
 * @param numberOfBooks - Número de livros
 * @param Authors - Autores
 * @param mostPopularGenre - Género mais popular
 * @param user - Utilizador
 * @param municipality - Município
 * @param bookrequests - Pedidos de livros
 * @param books - Livros
 */
export class MunadminStatisticsDashboardComponent {
  selectedButton: number = 1;
  orderOptions: any[] = [{ label: '1', value: true }, { label: '2', value: false }];

  citizens: any[] = [];
  municipalAdmins: MunicipalAdministrator[] = [];
  municipalities: any[] = [];
  documentRequests: RequestDocument[] = [];
  numberOfCitizens: number = 0;
  activeCitizens: number = 0;
  numberOfMunicipalAdmins: number = 0;
  blockedCitizens: number = 0;
  blockedCitizensPercentage: number = 0;

  news: any[] = [];
  events: any[] = [];

  newsPublished: number = 0;
  newsPublishedToday: number = 0;

  eventsRegistered: number = 0;
  eventsToday: number = 0;

  documentsRequested: number = 0;
  documentsApproved: number = 0;
  totalEarnings: number = 0;

  numberOfBooks: number = 0;
  Authors: number = 0;
  mostPopularGenre: string ="Não Existem Livros";
  user: any;
  municipality: string = '';
  bookrequests: BookRequest[] = [];
  books: Book[] = [];
  

  /**
   * @constructor
   * MunadminStatisticsDashboardComponent
   *
   * @param adminStatisticsService - Serviço de estatísticas do administrador
   * @param userAuthService - Serviço de autenticação do utilizador
   * @param libraryService - Serviço da biblioteca
   *
   */
  constructor(private adminStatisticsService: AdminStatisticsService, private userAuthService : UserAuthService,private libraryService : LibraryService) { }

  /**
   * ngOnInit
   *
   * Inicializa o componente
   */
  ngOnInit() {

    this.userAuthService.getUserData().subscribe(
      res => {
        let anyUser: any;
        anyUser = res;
        this.userAuthService.getInfoByEmail(anyUser.email).subscribe(
          async (res: any) => {
            this.user = res;
            this.municipality = this.user.municipality;

            this.adminStatisticsService.getRequestsByMunicipality(this.municipality).subscribe((data: BookRequest[]) => {
                this.bookrequests = data;
            });

            this.libraryService.getBooks(this.municipality).subscribe((data: Book[]) => {
              this.books = data;
              console.log(this.books);
            });

    this.adminStatisticsService.getAllCitizens().subscribe((data: Citizen[]) => {
      this.citizens = data.filter(citizen => citizen.municipality === this.municipality);
      this.adminStatisticsService.getAllMunicipalAdmins().subscribe((datamunadmin: MunicipalAdministrator[]) => {
        this.municipalAdmins = datamunadmin.filter(admin => admin.municipality === this.municipality);

        

          this.adminStatisticsService.getAllNews().subscribe((datanews: any) => {
            this.news = datanews.filter((news: { municipality: string; }) => news.municipality === this.municipality);

            this.adminStatisticsService.getAllEvents().subscribe((dataevents: any) => {
              this.events = dataevents.filter((event: { municipality: string; }) => event.municipality === this.municipality);
              this.adminStatisticsService.getAllDocumentRequests().subscribe((datadoc: any) => {


                this.documentRequests = datadoc.filter((doc: { municipality: string; }) => doc.municipality === this.municipality);
                this.generateStatistics();
              });

           
          }
          );
        }
        );
      }
      );
    }
            );
            

            
          }
        );
      }
    );
  }

  /**
   * generateStatistics
   *
   * Gera as estatísticas
   */
  generateStatistics() {
    this.numberOfCitizens = this.citizens.length;
    this.numberOfMunicipalAdmins = this.municipalAdmins.length;

    this.activeCitizens = this.citizens.filter(citizen => citizen.status === 'Approved').length;

    this.blockedCitizens = this.citizens.filter(citizen => citizen.status === 'Blocked').length;

    this.blockedCitizensPercentage = (this.blockedCitizens / this.numberOfCitizens) * 100;


    this.newsPublished = this.news.length;

    this.newsPublishedToday = this.news.filter(news => new Date(news.date).toDateString() === new Date().toDateString()).length;

    this.eventsRegistered = this.events.length;



    this.eventsToday = this.events.filter(event => new Date(event.startDate) <= new Date() && new Date(event.endDate) >= new Date()).length;

    this.documentsRequested = this.documentRequests.length;
    this.documentsApproved = this.documentRequests.filter(doc => doc.status === 'Approved').length;

    this.documentRequests.forEach(doc => {
      this.totalEarnings += doc.documentTemplate.price;
    });

    this.numberOfBooks = this.books.length;
    this.Authors = this.books.map(book => book.author).length;
    const genreCounts: { [genre: string]: number } = {};

    this.books.forEach(book => {
      book.genre.forEach(genre => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
        console.log(genreCounts);
      });
    });

    this.mostPopularGenre = Object.entries(genreCounts).reduce((prev, curr) => curr[1] > prev[1] ? curr : prev)[0];
    console.log(this.books);
  }



  /**
   * selectButton
   *
   * Seleciona o botão
   *
   * @param buttonNumber - Número do botão
   */
  selectButton(buttonNumber: number): void {
    this.selectedButton = buttonNumber;
  }
}
