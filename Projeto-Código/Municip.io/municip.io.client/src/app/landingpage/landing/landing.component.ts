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
export class LandingComponent {

  anyUser: any;
  citizens: number = 0;
municipalities: number = 0;

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

constructor(private titleService: Title, private userAuthService : UserAuthService, private router : Router, private adminStatisticsService : AdminStatisticsService) {
    this.titleService.setTitle("Municip.io");
  }

}


