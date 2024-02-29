import { Component } from '@angular/core';
import { MunicipalAdministrator, MunicipalAdminAuthService } from '../../services/municipal-admin-auth.service';
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

  
  municipalities = Municipalities;

  image!: File;

  getValues() {
    return Object.values(this.municipalities)
  }
  constructor(private municipalAdminAuthService: MunicipalAdminAuthService, private router: Router) { }

  signUpMunicipalAdminForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    surname: new FormControl("",[Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("",[Validators.required]),
    municipality: new FormControl("", [Validators.required]),
    photo: new FormControl(null, [Validators.required])
  });

  onSubmit() {

    this.municipalAdminAuthService.registerMunicipalAdmin(this.signUpMunicipalAdminForm.value as MunicipalAdministrator, this.image).subscribe(


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

