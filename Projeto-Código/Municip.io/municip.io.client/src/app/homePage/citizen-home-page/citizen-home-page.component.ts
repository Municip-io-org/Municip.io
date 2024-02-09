import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Roles, UserAuthService } from '../../services/user-auth.service';
import { Citizen } from '../../services/citizen-auth.service';
import { MunicipalAdministrator } from '../../services/municipal-admin-auth.service';

@Component({
  selector: 'app-citizen-home-page',
  templateUrl: './citizen-home-page.component.html',
  styleUrl: './citizen-home-page.component.css',
})
export class CitizenHomePageComponent {

  constructor(private userAuthService: UserAuthService) { }

  public date1 = new Date(2000, 0, 10);

  public events = [
    { image: '/assets/images/carnaval.jpg', title: 'Event 1', date: new Date(2000, 0, 11) },
    { image: '/assets/images/carnaval.jpg', title: 'Event 2', date: new Date(2000, 0, 12) },
    { image: '/assets/images/carnaval.jpg', title: 'Event 3', date: new Date(2000, 0, 13) },
    { image: '/assets/images/carnaval.jpg', title: 'Event 4', date: new Date(2000, 0, 14) },
    { image: '/assets/images/carnaval.jpg', title: 'Event 5', date: new Date(2000, 0, 15) }, 
  ];

  public startIndex = 0;

  moveLeft() {
    if (this.startIndex > 0) {
      this.startIndex--;
    }
  }

  moveRight() {
    if (this.startIndex < this.events.length - 4) {
      this.startIndex++;
    }
  }

  anyUser: any;
  role: string = "";

  user: Citizen = {
    firstName: 'Sem Nome',
    surname: 'Sem Apelido',
    email: 'Sem email',
    password: '',
    nif: 'Sem nif',
    gender: '',
    municipality: '',
    address: '',
    postalCode1: '',
    postalCode2: '',
    birthDate: new Date(),
    photo: "/assets/images/maria.jpg"
  };

  ngOnInit(): void {
    this.userAuthService.getUserData().subscribe(
      res => {
        this.anyUser = res;
        this.userAuthService.getInfoByEmail(this.anyUser.email).subscribe(
          res => {
            this.user = res as Citizen;
            console.log("user", this.user);
          });
      },
      error => {
        console.error(error);
      }
    );

    this.userAuthService.getUserRole().subscribe(
      res => {
        if (res.role == Roles.Citizen) {
          this.role = res.role;
        }
      },
      error => {
        console.error(error);
      }
    );
  }
}

