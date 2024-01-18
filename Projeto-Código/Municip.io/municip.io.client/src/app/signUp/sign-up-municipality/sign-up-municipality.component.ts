import { Component } from '@angular/core';
import { Citizen, CitizenAuthService } from '../../services/citizen-auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Municipality } from '../../services/municipal-admin-auth.service';

@Component({
  selector: 'app-sign-up-municipality',
  templateUrl: './sign-up-municipality.component.html',
  styleUrl: './sign-up-municipality.component.css'
})
export class SignUpMunicipalityComponent {
  municipality: Municipality= {
    president: '',
    contact: '',
description: ''
  };

  

 
  constructor(private citizenAuthService: CitizenAuthService, private router: Router) { }

  signUpMunicipalityForm = new FormGroup({
    president: new FormControl(),
    contact: new FormControl(),
    description: new FormControl()
  });

  onSubmit() {
    console.log(this.signUpMunicipalityForm.value);

    this.registerCitizen(this.signUpMunicipalityForm.value as Citizen).subscribe(res => {
      console.log('Citizen registed successfully!');
      this.router.navigateByUrl('');
    });
  }
}
