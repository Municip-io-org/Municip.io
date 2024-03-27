import { Component } from '@angular/core';
import { AdminStatisticsService } from '../services/stats/admin-statistics.service';
import { Citizen } from '../services/citizen-auth.service';
import { MunicipalAdministrator } from '../services/municipal-admin-auth.service';
import { RequestDocument } from '../services/documents/docs.service';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-munadmin-statistics-dashboard',
  templateUrl: './munadmin-statistics-dashboard.component.html',
  styleUrl: './munadmin-statistics-dashboard.component.css'
})
export class MunadminStatisticsDashboardComponent {


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

  user: any;
municipality : string = '';
  constructor(private adminStatisticsService: AdminStatisticsService, private userAuthService : UserAuthService) { }

  ngOnInit() {


    this.userAuthService.getUserData().subscribe(
      res => {
        let anyUser: any;
        anyUser = res;
        this.userAuthService.getInfoByEmail(anyUser.email).subscribe(
          async (res: any) => {
            this.user = res;
            this.municipality = this.user.municipality;


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





  }
}
