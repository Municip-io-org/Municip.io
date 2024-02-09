/// <reference path="../sign-up-municipal-administrator-account/sign-up-municipal-administrator-account.component.ts" />
import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
      description: '',
      areaha: '',
      codigo: '',
      codigoine: '',
      descpstal: '',
      distrito: '',
      eleitores: '',
      email: '',
      fax: '',
      localidade: '',
      nif: '',
      populacao: '',
      rua: '',
      sitio: '',
      telefone: '',
      emblemPhoto: '',
      landscapePhoto: ''
  };

  emblemImg!: File;
  landscapeImg!: File;



  constructor(private municipalAdminAuthService: MunicipalAdminAuthService, private router: Router, private route: ActivatedRoute) { }

  signUpMunicipalityForm = new FormGroup({
    president: new FormControl("", [Validators.required]),
    contact: new FormControl("", [Validators.required, Validators.pattern(/^\d{9}$/)]),
    description: new FormControl("", [Validators.required]),
    emblemPhoto: new FormControl(null, [Validators.required]), 
    landscapePhoto: new FormControl(null, [Validators.required]) 
  });

  // Getters for form controls
  get president() {
    return this.signUpMunicipalityForm.get('president');
  }

  get contact() {
    return this.signUpMunicipalityForm.get('contact');
  }

  get description() {
    return this.signUpMunicipalityForm.get('description');
  }

  get emblemPhoto() {
    return this.signUpMunicipalityForm.get('emblemPhoto');
  }

  get landscapePhoto() {
    return this.signUpMunicipalityForm.get('landscapePhoto');
  }

  onEmblemImagePicked(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.emblemImg = file;
    } else {
      console.error('No file selected');
    }
  }

  onLandscapeImagePicked(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.landscapeImg = file;
    } else {
      console.error('No file selected');
    }
  }


  onSubmit() {
    var municipalName = this.route.snapshot.params['municipalName'];

    // Construct municipality object from form values
    var municipality = this.signUpMunicipalityForm.value as unknown as Municipality;
    municipality.name = municipalName;

    // Call the service method to register the municipality
    this.municipalAdminAuthService.registerMunicipality(municipality, this.emblemImg, this.landscapeImg).subscribe(
      (result) => {
        this.router.navigateByUrl('/signUp-Success');
      });
  }

}

