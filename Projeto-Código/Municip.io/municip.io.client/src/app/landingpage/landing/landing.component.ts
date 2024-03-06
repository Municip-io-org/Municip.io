import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

   anyUser: any;

  ngOnInit() {
    this.userAuthService.getUserData().subscribe(
      res => {
        this.anyUser = res;

        if (this.anyUser.email != null) {


          this.router.navigate(['/userpage']);
        
        }
      });

   
  }

constructor(private titleService: Title, private userAuthService : UserAuthService, private router : Router) {
    this.titleService.setTitle("Municip.io Landing");
  }

}
