import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CitizenAuthService, Citizen } from '../../services/citizen-auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Municipality, MunicipalAdminAuthService } from '../../services/municipal-admin-auth.service';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-sign-up-citizen-account',
  templateUrl: './sign-up-citizen-account.component.html',
  styleUrls: ['./sign-up-citizen-account.component.css'],
  providers: [provideNativeDateAdapter()],
})
export class SignUpCitizenAccountComponent {

  citizen: Citizen = {
    firstName: '',
    surname: '',
    email: '',
    password: '',
    nif: '',
    gender: '',
    municipality: '',
    address: '',
    postalCode1: '',
    postalCode2: '',
    birthDate: new Date(),
    photo: '',
  };

  errors: string[] | null = null;

  defaultMunicipalityOption = 'Escolha o seu município';
  municipalities: Municipality[] = [];

  image!: File;

  signUpCitizenForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    surname: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required]),
    nif: new FormControl("", [Validators.required, Validators.pattern(/^\d{9}$/)]),
    gender: new FormControl("", [Validators.required]),
    municipality: new FormControl("", [Validators.required, this.validateMunicipality.bind(this)]),
    address: new FormControl("", [Validators.required]),
    postalCode1: new FormControl("", [Validators.required, Validators.pattern(/^\d{4}$/)]),
    postalCode2: new FormControl("", [Validators.required, Validators.pattern(/^\d{3}$/)]),
    birthDate: new FormControl(new Date(), [Validators.required]),
    photo: new FormControl(null, [Validators.required])
  });

  constructor(private citizenAuthService: CitizenAuthService, private router: Router, private municipalityService: MunicipalAdminAuthService,
    private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('pt');
  }

  ngOnInit(): void {
    this.municipalityService.getApprovedMunicipalities().subscribe(
      (res: any) => {
        this.municipalities = res as Municipality[];
        this.municipalities.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));

        if (this.municipalities.length === 0) {
          this.defaultMunicipalityOption = 'Não há municípios neste momento';
        }
       
      },
      error => {
        console.error(error);
      }
    );
  }

  validateMunicipality(control: FormControl): { [key: string]: boolean } | null {
    if (!control.value || this.municipalities.find(municipality => municipality.name === control.value)) {
      return null;
    }
    return { 'invalidMunicipality': true };
  }

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
    return this.signUpCitizenForm.get('birthDate') as FormControl;
  }

  get photo() {
    return this.signUpCitizenForm.get('photo');
  }

  onImagePicked(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (file) {
      this.image = file;
    } else {
      console.error('No file selected');
    }
  }

  onSubmit() {
    console.log("SUBMIT");
    this.citizenAuthService.registerCitizen(this.signUpCitizenForm.value as Citizen, this.image).subscribe(
      result => {
        this.router.navigateByUrl('/signUp-Success');
      },
      (error) => {
        console.log(error.error.errors);
        this.errors = error.error.errors;
      }
    );
  }
}
