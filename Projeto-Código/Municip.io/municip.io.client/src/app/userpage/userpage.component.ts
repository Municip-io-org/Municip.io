import { Component, Query } from '@angular/core';

import {Roles, UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.css'
})
export class UserpageComponent {
  user: any;
  newUser: any;

  constructor(private userAuthService: UserAuthService ) { }

  role: string = "";

  ngOnInit(): void {
    this.userAuthService.getUserData().subscribe(
      res => {
        this.user = res;
        this.userAuthService.getInfoByEmail(this.user.email).subscribe(
          res => {
            this.newUser = res;

            console.log("user", this.newUser);
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
  getUserAttributes(): { key: string, value: any }[] {
    if (!this.newUser) {
      return [];
    }

    // Extract key-value pairs from user object
    return Object.keys(this.newUser).map(key => ({ key, value: this.newUser[key] }));
  }
}
