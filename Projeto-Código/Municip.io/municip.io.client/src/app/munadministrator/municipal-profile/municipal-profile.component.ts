import { Component } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { Municipality } from '../../services/municipal-admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-municipal-profile',
  templateUrl: './municipal-profile.component.html',
  styleUrl: './municipal-profile.component.css'
})
export class MunicipalProfileComponent {
  
  constructor(private userAuthService: UserAuthService, private router: Router) { }

  public events = [
    { image: '/assets/images/carnaval.jpg', title: 'Event 1', date: new Date(2000, 0, 11) },
    { image: '/assets/images/carnaval.jpg', title: 'Event 2', date: new Date(2000, 0, 12) },
    { image: '/assets/images/carnaval.jpg', title: 'Event 3', date: new Date(2000, 0, 13) },
    { image: '/assets/images/carnaval.jpg', title: 'Event 4', date: new Date(2000, 0, 14) },
    { image: '/assets/images/carnaval.jpg', title: 'Event 5', date: new Date(2000, 0, 15) },
  ];

  public newsList = [
    { image: '/assets/images/carnaval.jpg', title: 'Setúbal sai à rua para brincar ao Carnaval', text: 'Setúbal vive o Carnaval de 2024 por todo o concelho, com um conjunto variado de atividades associadas aos festejos, de que se destacam duas tardes de animação no centro da cidade, a 11 e 13 de fevereiro.' },
    { image: '/assets/images/carnaval.jpg', title: 'Setúbal sai à rua para brincar ao Carnaval', text: 'Setúbal vive o Carnaval de 2024 por todo o concelho, com um conjunto variado de atividades associadas aos festejos, de que se destacam duas tardes de animação no centro da cidade, a 11 e 13 de fevereiro.' },
    { image: '/assets/images/carnaval.jpg', title: 'Setúbal sai à rua para brincar ao Carnaval', text: 'Setúbal vive o Carnaval de 2024 por todo o concelho, com um conjunto variado de atividades associadas aos festejos, de que se destacam duas tardes de animação no centro da cidade, a 11 e 13 de fevereiro.' },
  ];

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


  ngOnInit(): void {
    this.userAuthService.getUserData().subscribe(
      res => {
        this.anyUser = res;
        this.userAuthService.getInfoByEmail(this.anyUser.email).subscribe(
          (res: any) => {
            this.user = res;
            console.log("user", this.user);

            this.userAuthService.getInfoMunicipality(this.user.municipality).subscribe(
              (municipalityRes: any) => {
                this.municipality = municipalityRes as Municipality;
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

  exploreMapClick(){
    this.router.navigateByUrl("/");
  }

  seeMoreNewsClick() {
    this.router.navigateByUrl("/");
  }
}
