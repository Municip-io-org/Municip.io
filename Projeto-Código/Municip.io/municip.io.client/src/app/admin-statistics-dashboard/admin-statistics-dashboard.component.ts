import { Component } from '@angular/core';
import { AdminStatisticsService } from '../services/stats/admin-statistics.service';
import { Citizen } from '../services/citizen-auth.service';
import { MunicipalAdministrator, Municipality } from '../services/municipal-admin-auth.service';

@Component({
  selector: 'app-admin-statistics-dashboard',
  templateUrl: './admin-statistics-dashboard.component.html',
  styleUrl: './admin-statistics-dashboard.component.css'
})
export class AdminStatisticsDashboardComponent {

  citizens: Citizen[] = [];
  municipalAdmins: MunicipalAdministrator[] = [];
  municipalities: any[] = [];
  numberOfCitizens: number = 0;
  activeMunicipalities: number = 0;
  numberOfMunicipalAdmins: number = 0;
  blockedMunicipalities: number = 0;
  percentageOfBlockedMunicipalities: number = 0;
  sortingOrder: string = 'desc'; 

  news: any[] = [];
  events: any[] = [];
  documentRequests: any[] = [];

  newsPublished: number = 0;
  newsPublishedToday: number = 0;

  eventsRegistered: number = 0;
eventsToday: number = 0;


  constructor(private adminStatisticsService: AdminStatisticsService) { }

  ngOnInit() {
    this.adminStatisticsService.getAllCitizens().subscribe((data: Citizen[]) => {
      this.citizens = data;
      this.adminStatisticsService.getAllMunicipalAdmins().subscribe((datamunadmin: MunicipalAdministrator[]) => {
        this.municipalAdmins = datamunadmin;

        this.adminStatisticsService.getAllMunicipalities().subscribe((datamun: any) => {
        this.municipalities = datamun;
          this.sortMunicipalities();

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


  



     

  toggleSorting() {
    this.sortingOrder = this.sortingOrder === 'asc' ? 'desc' : 'asc';
    this.sortMunicipalities();
  }

  sortMunicipalities() {
    this.municipalities.sort((a, b) => {
      if (this.sortingOrder === 'asc') {
        return a.numberOfUsers - b.numberOfUsers;
      } else {
        return b.numberOfUsers - a.numberOfUsers;
      }
    });
  }


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







  }
}
