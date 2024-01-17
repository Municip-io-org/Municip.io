import { Component } from '@angular/core';
import { Citizen, CitizenAuthService } from '../../services/citizen-auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Municipalities } from '../../municipalities.enum';

@Component({
  selector: 'app-sign-up-municipal-administrator-account',
  templateUrl: './sign-up-municipal-administrator-account.component.html',
  styleUrl: './sign-up-municipal-administrator-account.component.css'
})


export class SignUpMunicipalAdministratorAccountComponent {
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
    birthDate: new Date()
  };

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
    console.log(this.signUpCitizenForm.value);

    this.citizenAuthService.registerCitizen(this.signUpCitizenForm.value as Citizen).subscribe(res => {
      console.log('Citizen registed successfully!');
      this.router.navigateByUrl('');
    });
  }
}
