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
    profileimg: new FormControl(null, [Validators.required]),
    postalCode1: new FormControl("", [Validators.required, Validators.pattern(/^\d{4}$/)]),
    postalCode2: new FormControl("", [Validators.required, Validators.pattern(/^\d{3}$/)]), 
  });

  OnSubmit() {
    console.log(this.profileEdit.value);
    this.newUser.name = this.profileEdit.value.firstName;
    this.newUser.surname = this.profileEdit.value.surname;
    this.newUser.email = this.profileEdit.value.email;
    this.newUser.birthDate = this.profileEdit.value.birthDate;
    this.newUser.address = this.profileEdit.value.address;
    this.newUser.nif = this.profileEdit.value.nif;
    this.newUser.postalCode1 = this.profileEdit.value.postalCode1;
    this.newUser.postalCode2 = this.profileEdit.value.postalCode2;
    this.userAuthService.updateUser(this.newUser).subscribe(
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
