import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';
import { AdminStatisticsService } from '../../services/stats/admin-statistics.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
/**
 * LandingComponent
 *
 * Este componente é utilizado para a página de aterragem.
 *
 * @param anyUser: any - A informação do utilizador.
 * @param citizens: number - O número de cidadãos.
 * @param municipalities: number - O número de municípios.
 *  
 */
export class LandingComponent {

  anyUser: any;
  citizens: number = 0;
municipalities: number = 0;

  /*
  * Inicializador do componente LandingComponent.
  */
  ngOnInit() {

    this.adminStatisticsService.getLandingPageCitizens().subscribe(
      res => {
        this.citizens = res;
     

    this.adminStatisticsService.getLandingPageMunicipalities().subscribe(
res => {
        this.municipalities = res;
    

    
      });
      });

   
  }

  /*
  * @constructor
  * 
  * Construtor do componente LandingComponent.
  *
  * @param titleService: Title - O serviço de título.
  * @param userAuthService: UserAuthService - O serviço de autenticação de utilizador.
  * @param router: Router - O router.
  * @param adminStatisticsService: AdminStatisticsService - O serviço de estatísticas de administrador.
  *
  */
constructor(private titleService: Title, private userAuthService : UserAuthService, private router : Router, private adminStatisticsService : AdminStatisticsService) {
    this.titleService.setTitle("Municip.io");
  }

}


