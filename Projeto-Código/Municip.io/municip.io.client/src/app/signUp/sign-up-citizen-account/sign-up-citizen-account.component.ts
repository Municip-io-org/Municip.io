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
    firstName: new FormControl("",[Validators.required]),
    surname: new FormControl("",[Validators.required]),
    email: new FormControl("", [Validators.email,Validators.required]),
    password: new FormControl("",[Validators.required]),
    nif: new FormControl("",[Validators.required ,Validators.pattern(/^\d{9}$/)]),
    gender: new FormControl("",[Validators.required]),
    municipality: new FormControl("",[Validators.required]),
    address: new FormControl("",[Validators.required]),
    postalCode1: new FormControl("",[Validators.required, Validators.pattern(/^\d{4}$/)]),
    postalCode2: new FormControl("",[Validators.required, Validators.pattern(/^\d{3}$/)]),
    birthDate: new FormControl(new Date(),[Validators.required])
  });


  // getters for form validation
  get firstName() {
    return this.signUpCitizenForm.get('firstName');
  }

  get surname() {
    return this.signUpCitizenForm.get('surname');
  }

  get email() {
    return this.signUpCitizenForm.get('email');
  }

  get password() {
    return this.signUpCitizenForm.get('password');
  }

  get nif() {
    return this.signUpCitizenForm.get('nif');
  }

  get gender() {
    return this.signUpCitizenForm.get('gender');
  }

  get municipality() {
    return this.signUpCitizenForm.get('municipality');
  }

  get address() {
    return this.signUpCitizenForm.get('address');
  }

  get postalCode1() {
    return this.signUpCitizenForm.get('postalCode1');
  }

  get postalCode2() {
    return this.signUpCitizenForm.get('postalCode2');
  }

  get birthDate() {
    return this.signUpCitizenForm.get('birthDate');
  }




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
