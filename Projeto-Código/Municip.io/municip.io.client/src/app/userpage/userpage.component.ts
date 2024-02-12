import { Component, Query } from '@angular/core';

import {Roles, UserAuthService } from '../services/user-auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.css'
})
export class UserpageComponent {
  //user: any;
  newUser: any;
  errors: string[] | null = null;
  originalName: string = "";


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
            this.originalName = this.newUser.firstName;
            this.formatBirthDate();
            console.log(this.newUser);
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
    photo: new FormControl(null, [Validators.required]),
    postalCode1: new FormControl("", [Validators.required, Validators.pattern(/^\d{4}$/)]),
    postalCode2: new FormControl("", [Validators.required, Validators.pattern(/^\d{3}$/)]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)
    ]),

  });
  get firstName() {
    return this.profileEdit.get('firstName');
  }

  get surname() {
    return this.profileEdit.get('surname');
  }

  get email() {
    return this.profileEdit.get('email');
  }

  get password() {
    return this.profileEdit.get('password');
  }

  get nif() {
    return this.profileEdit.get('nif');
  }

  get address() {
    return this.profileEdit.get('address');
  }

  get postalCode1() {
    return this.profileEdit.get('postalCode1');
  }

  get postalCode2() {
    return this.profileEdit.get('postalCode2');
  }

  get birthDate() {
    return this.profileEdit.get('birthDate');
  }

  get photo() {
    return this.profileEdit.get('photo');
  }
  OnSubmit() {
    console.log(this.profileEdit.value);
    
    const formValues = this.profileEdit.value;
    this.newUser.name = formValues.firstName || this.newUser.name;
    this.newUser.surname = formValues.surname || this.newUser.surname;
    this.newUser.email = formValues.email || this.newUser.email;
    this.newUser.birthDate = formValues.birthDate || this.newUser.birthDate;
    this.newUser.address = formValues.address || this.newUser.address;
    this.newUser.nif = formValues.nif || this.newUser.nif;
    this.newUser.postalCode1 = formValues.postalCode1 || this.newUser.postalCode1;
    this.newUser.postalCode2 = formValues.postalCode2 || this.newUser.postalCode2;
    this.newUser.password = formValues.password || this.newUser.password;
    this.newUser.photo = formValues.photo || this.newUser.photo;
    
    this.userAuthService.updateUser(this.newUser).subscribe(
      res => {
        console.log(res);
      },
      (error) => {
        console.log("erro " +error.error.errors)
        this.errors = error.error.errors;
      }
    );
    this.originalName = this.newUser.firstName;
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
