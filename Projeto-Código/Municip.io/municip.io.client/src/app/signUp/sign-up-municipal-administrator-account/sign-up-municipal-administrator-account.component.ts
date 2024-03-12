import { Component } from '@angular/core';
import { MunicipalAdministrator, MunicipalAdminAuthService, Municipality } from '../../services/municipal-admin-auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Municipalities } from '../../municipalities.enum';

@Component({
  selector: 'app-sign-up-municipal-administrator-account',
  templateUrl: './sign-up-municipal-administrator-account.component.html',
  styleUrl: './sign-up-municipal-administrator-account.component.css',
})


export class SignUpMunicipalAdministratorAccountComponent {
  municipalAdministrator: MunicipalAdministrator = {
    firstName: '',
    surname: '',
    email: '',
    password: '',
    municipality: '',
    photo : ''
  };

  
  errors: string[] | null = null;

  
  defaultMunicipalityOption = 'Escolha o seu município';
  municipalities = Municipalities;

  image!: File;

  getMunicipalities() {
    return Object.values(this.municipalities)
  }

  constructor(private municipalAdminAuthService: MunicipalAdminAuthService, private router: Router) { }

  signUpMunicipalAdminForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    surname: new FormControl("",[Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, this.validatePassword.bind(this)]),
    municipality: new FormControl("", [Validators.required, this.validateMunicipality.bind(this)]),
    photo: new FormControl(null, [Validators.required])
  });

  validateMunicipality(control: FormControl): { [key: string]: boolean } | null {
    if (!control.value || this.getMunicipalities().find((municipality: Municipalities) => municipality === control.value)) {
      return null;
    }
    return { 'invalidMunicipality': true };
  }

  validatePassword(control: FormControl): { [key: string]: boolean } | null {
    const value: string = control.value;


    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    const symbolRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    const hasUpperCase = upperCaseRegex.test(value);
    const hasLowerCase = lowerCaseRegex.test(value);
    const hasDigit = digitRegex.test(value);
    const hasSymbol = symbolRegex.test(value);


    const isValid = hasUpperCase && hasLowerCase && hasDigit && hasSymbol;

    return isValid ? null : { 'invalidPassword': true };
  }


  onSubmit() {

    this.municipalAdminAuthService.registerMunicipalAdmin(this.signUpMunicipalAdminForm.value as MunicipalAdministrator, this.image).subscribe(


      (result: any) => {
        if (result) {
          this.router.navigateByUrl('/signUp-Success');
        } else {
          var municipal, municipalname;
          municipal = this.signUpMunicipalAdminForm.value as MunicipalAdministrator
          municipalname = municipal.municipality
          console.log("AQUI");
     
          this.router.navigateByUrl('/signUp-Municipality/'+municipalname);
        }
      },
      (error) => {
        console.log(error.error.errors)
        console.log("AQUI2");
        this.errors = error.error.errors;

      }



    );
  }

// Getter for firstName form control
  get firstName() {
    return this.signUpMunicipalAdminForm.get('firstName');
  }

  // Getter for surname form control
  get surname() {
    return this.signUpMunicipalAdminForm.get('surname');
  }

  // Getter for email form control
  get email() {
    return this.signUpMunicipalAdminForm.get('email');
  }

  // Getter for password form control
  get password() {
    return this.signUpMunicipalAdminForm.get('password');
  }

  // Getter for municipality form control
  get municipality() {
    return this.signUpMunicipalAdminForm.get('municipality');
  }


  get photo() {

    return this.signUpMunicipalAdminForm.get('photo');


  }

  onImagePicked(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput?.files?.[0]; // Use optional chaining here

    if (file) {
      this.image = file;


    } else {
      console.error('No file selected');
    }
  }



    
  }

