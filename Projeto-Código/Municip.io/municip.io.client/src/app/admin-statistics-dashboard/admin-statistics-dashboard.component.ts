import { Component } from '@angular/core';
import { AdminStatisticsService } from '../services/stats/admin-statistics.service';
import { Citizen } from '../services/citizen-auth.service';
import { MunicipalAdministrator, Municipality } from '../services/municipal-admin-auth.service';
import { RequestDocument } from '../services/documents/docs.service';
import { Book, BookRequest, LibraryService } from '../services/library/library.service';

@Component({
  selector: 'app-admin-statistics-dashboard',
  templateUrl: './admin-statistics-dashboard.component.html',
  styleUrl: './admin-statistics-dashboard.component.css'
})
/**
 * @class AdminStatisticsDashboardComponent
 *
 * Este componente é responsável por exibir um dashboard de estatísticas do administrador.
 *
 * @returns Um dashboard com várias estatísticas sobre os cidadãos, administradores municipais, municípios, notícias, eventos e documentos.
 *
 **/
export class AdminStatisticsDashboardComponent {

  citizens: Citizen[] = [];
  municipalAdmins: MunicipalAdministrator[] = [];
  municipalities: any[] = [];
  documentRequests: RequestDocument[] = [];
  numberOfCitizens: number = 0;
  activeMunicipalities: number = 0;
  numberOfMunicipalAdmins: number = 0;
  blockedMunicipalities: number = 0;
  percentageOfBlockedMunicipalities: number = 0;
  sortingOrder: string = 'desc'; 

  news: any[] = [];
  events: any[] = [];

  newsPublished: number = 0;
  newsPublishedToday: number = 0;

  eventsRegistered: number = 0;
  eventsToday: number = 0;

  documentsRequested: number = 0;
  documentsApproved: number = 0;
  totalEarnings: number = 0;

  mostPopularGenre: string = 'Não Existe';
  numberOfBooks: number = 0;
  Authors: number = 0;
  books: Book[] = [];
  bookrequests: BookRequest[] = [];
  selectedButton: number = 1;
  /**
  * @constructor
  *
  * Este construtor é responsável por injetar o serviço estatístico do administrador.
  *
  * @param adminStatisticsService - O serviço de estatísticas do administrador.
  *
  **/
  constructor(private adminStatisticsService: AdminStatisticsService,private libraryService: LibraryService) { }

  /**
   * Este método é responsável por obter as estatísticas.
   * 
   * @returns As estatísticas.
   *
   **/
  ngOnInit() {
    this.adminStatisticsService.getAllCitizens().subscribe((data: Citizen[]) => {
      this.citizens = data;
      this.adminStatisticsService.getAllMunicipalAdmins().subscribe((datamunadmin: MunicipalAdministrator[]) => {
        this.municipalAdmins = datamunadmin;

        this.adminStatisticsService.getAllMunicipalities().subscribe((datamun: any) => {
        this.municipalities = datamun;
          this.sortMunicipalities();
          this.libraryService.getRequests().subscribe((data: BookRequest[]) => {
            this.bookrequests = data;
          });
          this.adminStatisticsService.getAllBooks().subscribe((data: Book[]) => {
            this.books = data;

          });
          this.adminStatisticsService.getAllNews().subscribe((datanews: any) => {
            this.news = datanews;

this.adminStatisticsService.getAllEvents().subscribe((dataevents: any) => {
              this.events = dataevents;
  this.adminStatisticsService.getAllDocumentRequests().subscribe((datadoc: any) => {


    this.documentRequests = datadoc;
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

/**
   * Este método é responsável por inverter a ordem de ordenação.
   * 
   * @returns A lista de municípios ordenada.
   *
   **/
  toggleSorting() {
    this.sortingOrder = this.sortingOrder === 'asc' ? 'desc' : 'asc';
    this.sortMunicipalities();
  }

  /**
   * Este método é responsável por ordenar a lista de municípios.
   * 
   * @returns A lista de municípios ordenada.
   *
   **/
  sortMunicipalities() {
    this.municipalities.sort((a, b) => {
      if (this.sortingOrder === 'asc') {
        return a.numberOfUsers - b.numberOfUsers;
      } else {
        return b.numberOfUsers - a.numberOfUsers;
      }
    });
  }

  /**
   * Este método é responsável por gerar as estatísticas.
   * 
   * @returns As estatísticas.
   *
   **/
  generateStatistics() {
    this.numberOfCitizens = this.citizens.length;
    this.numberOfMunicipalAdmins = this.municipalAdmins.length;

    this.activeMunicipalities = this.municipalities.filter(mun => mun.status === 'Approved').length;

    this.blockedMunicipalities = this.municipalities.filter(mun => mun.status === 'Blocked').length;

this.percentageOfBlockedMunicipalities = (this.blockedMunicipalities / this.municipalities.length) * 100;

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
