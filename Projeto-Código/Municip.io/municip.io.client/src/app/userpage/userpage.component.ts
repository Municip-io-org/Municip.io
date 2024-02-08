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

  ngOnInit() {

   
    this.userAuthService.getUserData().subscribe(
      res => {    
        this.user = res;
        var emailToParse = this.user.email;       
        var emailParsed = emailToParse.replace('@', '%40');
 
        this.userAuthService.getInfoByEmail(emailParsed).subscribe(
          res => {
            this.newUser = res;
            this.formatBirthDate();
          console.log(this.newUser);
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
    surname: new FormControl("", [Validators.required]),
    birthDate: new FormControl(new Date(), [Validators.required]),
    address: new FormControl("", [Validators.required]),
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
    
    return Object.keys(this.newUser).map(key => ({ key, value: this.newUser[key] }));
  }
  
  formatBirthDate() {

    const dateString = this.newUser.birthDate; 
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); 
    const day = ('0' + date.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`; 
    this.newUser.birthDate = formattedDate; 
  }
}
