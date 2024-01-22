import { Component } from '@angular/core';
import { MunicipalAdministrator, MunicipalAdminAuthService } from '../../services/municipal-admin-auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Municipalities } from '../../municipalities.enum';

@Component({
  selector: 'app-sign-up-municipal-administrator-account',
  templateUrl: './sign-up-municipal-administrator-account.component.html',
  styleUrl: './sign-up-municipal-administrator-account.component.css'
})


export class SignUpMunicipalAdministratorAccountComponent {
  municipalAdministrator: MunicipalAdministrator = {
    firstName: '',
    surname: '',
    email: '',
    password: '',
    municipality: '',

  };

  
  errors: string[] | null = null;

  
  municipalities = Municipalities;

  getValues() {
    return Object.values(this.municipalities)
  }
  constructor(private municipalAdminAuthService: MunicipalAdminAuthService, private router: Router) { }

  signUpMunicipalAdminForm = new FormGroup({
    firstName: new FormControl(Validators.required),
    surname: new FormControl(Validators.required),
    email: new FormControl(Validators.required, Validators.email),
    password: new FormControl(Validators.required),
    municipality: new FormControl(Validators.required)
  });

  onSubmit() {

    this.municipalAdminAuthService.registerMunicipalAdmin(this.signUpMunicipalAdminForm.value as MunicipalAdministrator).subscribe(


      (result) => {
        if (result) {
          this.router.navigateByUrl('/signUp-Success');
        } else {
          var municipal, municipalname;
          municipal = this.signUpMunicipalAdminForm.value as MunicipalAdministrator
          municipalname = municipal.municipality

     
          this.router.navigateByUrl('/signUp-Municipality/'+municipalname);
        }
      },
      (error) => {
        console.log(error.error.errors)

        this.errors = error.error.errors;

      }



    );
      }

    
  }

