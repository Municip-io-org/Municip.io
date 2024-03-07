import { Component } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { Municipality } from '../../services/municipal-admin-auth.service';
import { Router } from '@angular/router';
import { EventsService, Event } from '../../services/events/events.service';
import { News, NewsService } from '../../services/news/news.service';

@Component({
  selector: 'app-municipal-profile',
  templateUrl: './municipal-profile.component.html',
  styleUrl: './municipal-profile.component.css'
})
export class MunicipalProfileComponent {
  
  

  events: Event[] = [];

  newsList:News[] = [];

  anyUser: any;
  user: any;

  municipality: Municipality = {
      areaha: '0',
      codigo: '0',
      codigoine: '0',
      codigopostal: 'Sem código postal',
      contact: 'Sem contato',
      description: 'Sem descrição',
      descpstal: 'Sem descrição postal',
      distrito: 'Sem distrito',
      eleitores: '0',
      email: 'sem_email@example.com',
      fax: 'Sem fax',
      localidade: 'Sem localidade',
      name: 'Sem nome',
      nif: '000000000',
      populacao: '0',
      president: 'Sem presidente',
      rua: 'Sem rua',
      sitio: 'Sem sitio',
      telefone: 'Sem telefone',
      emblemPhoto: 'Sem emblema',
      landscapePhoto: 'Sem landscape',
      
  };

  constructor(private userAuthService: UserAuthService, private eventsService: EventsService, private router: Router,private newsService:NewsService) { }


  ngOnInit(): void {
    this.userAuthService.getUserData().subscribe(
      res => {
        this.anyUser = res;
        this.userAuthService.getInfoByEmail(this.anyUser.email).subscribe(
          (res: any) => {
            this.user = res;

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

  exploreMapClick(){
    this.router.navigateByUrl("/");
  }

  seeMoreNewsClick() {
    this.router.navigateByUrl("/news");
  }

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

    this.newsService.getNews(this.user.municipality).subscribe(
      (listOfNews: any) => {
        this.newsList = listOfNews as News[];
        console.log(this.newsList);
        },
        error => {
          console.log(error);
      }
);
      
  }
  

  sortEventsByDate() {
    this.events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());   
  }
}
