import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CitizenAuthService, Citizen, Country } from '../../services/citizen-auth.service';
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

  

  signUpCitizenForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    surname: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required, this.validatePassword.bind(this)]),
    country: new FormControl({ alpha2Code: 'PT' }, [Validators.required]),
    nif: new FormControl("", [Validators.required, Validators.pattern(/^\d{9}$/)]),
    gender: new FormControl("", [Validators.required]),
    municipality: new FormControl("", [Validators.required, this.validateMunicipality.bind(this)]),
    address: new FormControl("", [Validators.required]),
    postalCode1: new FormControl("", [Validators.required, Validators.pattern(/^\d{4}$/)]),
    postalCode2: new FormControl("", [Validators.required, Validators.pattern(/^\d{3}$/)]),
    birthDate: new FormControl(new Date(), [Validators.required, this.adultAgeValidator.bind(this)]),
  });

  image!: File;
  imageUrl: string | null = null;
  files: any[] = [];
   

  validateMunicipality(control: FormControl): { [key: string]: boolean } | null {
    if (!control.value || this.municipalities.find(municipality => municipality.name === control.value)) {
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

  

  adultAgeValidator(control: FormControl): { [key: string]: boolean } | null {
    const birthDate: Date = control.value;
    const today: Date = new Date();
    const age: number = today.getFullYear() - birthDate.getFullYear();

    if (age > 120) {
      return { 'over120': true };
    }

    return null;
  };




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



  


  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const fileList: FileList | null = fileInput?.files;

    if (fileList && fileList.length > 0) {
      this.image = fileList[0];
      this.imageUrl = URL.createObjectURL(this.image);

      console.log("ON FILE CHANGE");
    } else {
      console.error('Nenhuma imagem selecionada');
    }
  }


  

  isValidImageFile(file: File): boolean {
    // Adicione aqui a lógica para validar se o arquivo é uma imagem
    // Por exemplo, verificando a extensão do arquivo ou seu tipo MIME
    return file.type.startsWith('image/');
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files: FileList | null = event.dataTransfer?.files || null;
    if (files && files.length > 0) {
      const file = files[0];
      if (file && this.isValidImageFile(file)) { // Verifique se file não é null ou undefined
        this.image = file;
        this.imageUrl = URL.createObjectURL(this.image);

      } else {
        console.error('Por favor, solte uma imagem válida.');
      }
    } else {
      console.error('Nenhuma imagem solta.');
    }
  }



  



  onSubmit() {

    const citizen: Citizen = {
      firstName: this.firstName!.value!,
      surname: this.surname!.value!,
      email: this.email!.value!,
      password: this.password!.value!,
      nif: `${(this.country!.value! as Country).alpha2Code}${this.nif!.value!}`, 
      gender: this.gender!.value!,
      municipality: this.municipality!.value!,
      address: this.address!.value!,
      postalCode1: this.postalCode1!.value!,
      postalCode2: this.postalCode2!.value!,
      birthDate: this.birthDate!.value!
    };


    this.citizenAuthService.registerCitizen(citizen, this.image).subscribe(
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

