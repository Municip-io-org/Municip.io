/// <reference path="../sign-up-municipal-administrator-account/sign-up-municipal-administrator-account.component.ts" />
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CitizenAuthService, Citizen } from '../../services/citizen-auth.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Municipalities } from '../../municipalities.enum';

@Component({
  selector: 'app-sign-up-citizen-account',
  templateUrl: './sign-up-citizen-account.component.html',
  styleUrl: './sign-up-citizen-account.component.css'
})
export class SignUpCitizenAccountComponent {

  citizen: Citizen = {
    firstName: '',
    surname: '',
    email: '',
    password: '',
    nif: '',
    gender: '',
    municipality: 'test',
    address: '',
    postalCode1: '',
    postalCode2: '',
    birthDate:  new Date() };


  errors: string[] | null = null;

  municipalities = Municipalities;

  getValues() {
    return Object.values(this.municipalities)
  }
  constructor(private citizenAuthService: CitizenAuthService, private router: Router) { }

  signUpCitizenForm = new FormGroup({
    firstName: new FormControl(),
    surname: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    nif: new FormControl(),
    gender: new FormControl(),
    municipality: new FormControl(),
    address: new FormControl(),
    postalCode1: new FormControl(),
    postalCode2: new FormControl(),
    birthDate: new FormControl()
  });

  onSubmit() {
    this.citizenAuthService.registerCitizen(this.signUpCitizenForm.value as Citizen).subscribe(

      result => {
        this.router.navigateByUrl('/signUp-Success');
      },

      (error) => {
        console.log(error.error.errors)
        this.errors = error.error.errors;
    }
    );
  }

}
