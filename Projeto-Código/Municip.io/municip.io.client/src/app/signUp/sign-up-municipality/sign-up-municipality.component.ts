/// <reference path="../sign-up-municipal-administrator-account/sign-up-municipal-administrator-account.component.ts" />
import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Municipality, MunicipalAdminAuthService } from '../../services/municipal-admin-auth.service';

@Component({
  selector: 'app-sign-up-municipality',
  templateUrl: './sign-up-municipality.component.html',
  styleUrl: './sign-up-municipality.component.css'
})
export class SignUpMunicipalityComponent {
  municipality: Municipality = {
name: '',
    president: '',
    contact: '',
description: ''
  };

  
  
  constructor(private municipalAdminAuthService: MunicipalAdminAuthService, private router: Router, private route: ActivatedRoute) { }

  signUpMunicipalityForm = new FormGroup({
    president: new FormControl(),
    contact: new FormControl(),
    description: new FormControl()
  });

  onSubmit() {
    var municipalName = this.route.snapshot.params['municipalName'];


    var municipality = this.signUpMunicipalityForm.value as Municipality
    municipality.name = municipalName
    this.municipalAdminAuthService.registerMunicipality(municipality as Municipality).subscribe(


      (result) => {
     
        this.router.navigateByUrl('/signUp-Success');
  




      });

  }
}

