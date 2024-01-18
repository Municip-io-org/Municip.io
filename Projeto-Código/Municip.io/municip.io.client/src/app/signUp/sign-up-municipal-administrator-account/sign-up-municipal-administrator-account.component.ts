import { Component } from '@angular/core';
import { MunicipalAdministrator, MunicipalAdminAuthService } from '../../services/municipal-admin-auth.service';
import { FormControl, FormGroup } from '@angular/forms';
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
    municipality: ''
  };

  municipalities = Municipalities;

  getValues() {
    return Object.values(this.municipalities)
  }
  constructor(private municipalAdminAuthService: MunicipalAdminAuthService, private router: Router) { }

  signUpMunicipalAdminForm = new FormGroup({
    firstName: new FormControl(),
    surname: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    municipality: new FormControl()
  });

  onSubmit() {

    this.municipalAdminAuthService.registerMunicipalAdmin(this.signUpMunicipalAdminForm.value as MunicipalAdministrator).subscribe(


      (result) => {


        if (result) {
          this.router.navigateByUrl('');
         
        }
      },
      (error) => {
        console.log(error.status)
 
      }



    );
      }

    
  }

