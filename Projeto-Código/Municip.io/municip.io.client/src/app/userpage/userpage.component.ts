import { Component, Query } from '@angular/core';

import {Roles, UserAuthService } from '../services/user-auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Citizen } from '../services/citizen-auth.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.css'
})
export class UserpageComponent {
  //user: any;
  newUser: any;
  
  errors: string[] | null = null;

  constructor(private userAuthService: UserAuthService ) { }
 user: any;
  role: string = "";

  ngOnInit(): void {
    this.userAuthService.getUserData().subscribe(
      res => {
        this.user = res;
        console.log("DADOOODOODDODO : ", this.user.firstName);
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

  profileEdit = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.email, Validators.required]),
    birthDate: new FormControl(new Date(), [Validators.required]),
    morada: new FormControl("", [Validators.required]),
    nif: new FormControl("", [Validators.required, Validators.pattern(/^\d{9}$/)]),
    profileimg: new FormControl(null, [Validators.required])
  });

  OnSubmit() {
    console.log(this.profileEdit.value);
    this.userAuthService.updateUser(this.profileEdit.value as Citizen).subscribe(
      res => {
        console.log(res);
      },
      (error: any) => {
        console.log(error.error.errors)
        this.errors = error.error.errors;
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
