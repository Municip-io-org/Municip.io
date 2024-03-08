import { Component, ViewEncapsulation } from '@angular/core';
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
    country: new FormControl({ alpha2Code: 'PT' }, [Validators.required, this.validateCountry.bind(this)]),
    nif: new FormControl("", [Validators.required, Validators.pattern(/^\d{9}$/)]),
    gender: new FormControl("", [Validators.required]),
    municipality: new FormControl("", [Validators.required, this.validateMunicipality.bind(this)]),
    address: new FormControl("", [Validators.required]),
    postalCode1: new FormControl("", [Validators.required, Validators.pattern(/^\d{4}$/)]),
    postalCode2: new FormControl("", [Validators.required, Validators.pattern(/^\d{3}$/)]),
    birthDate: new FormControl(new Date(), [Validators.required, this.adultAgeValidator.bind(this)]),
    photo: new FormControl(null, [Validators.required])
  });

  validateMunicipality(control: FormControl): { [key: string]: boolean } | null {
    if (!control.value || this.municipalities.find(municipality => municipality.name === control.value)) {
      return null;
    }
    return { 'invalidMunicipality': true };
  }

  validateCountry(control: FormControl): { [key: string]: boolean } | null {
    const value: Country = control.value;
    if (value && typeof value === 'object' && 'alpha2Code' in value && 'name' in value) {
      return null; 
    } else {
      return { 'invalidCountry': true }; 
    }
   
  }

  adultAgeValidator(control: FormControl): { [key: string]: boolean } | null {
    const birthDate: Date = control.value;
    const today: Date = new Date();
    const age: number = today.getFullYear() - birthDate.getFullYear();

    if (age < 18) {
      return { 'underage': true };
    } else if (age > 120) {
      return { 'over120': true };
    }

    return null;
  };


  constructor(private citizenAuthService: CitizenAuthService, private router: Router, private municipalityService: MunicipalAdminAuthService,
    private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('pt');
  }

  ngOnInit(): void {
    this.signUpCitizenForm.get('country')!.valueChanges
      .subscribe(country => console
        .log('this.signUpCitizenForm.get("country").valueChanges', country));


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

  get country() {
    return this.signUpCitizenForm.get('country') as FormControl;
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
interface Country {
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  numericCode: string;
  callingCode: string;
}
