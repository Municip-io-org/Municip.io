import { Component } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from '../services/citizen-auth.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.css'
})
export class UserpageComponent {

  isDialogOpen: boolean = false;
  isRemoveEventDialogOpen: boolean = false;
  dialogTitle = '';
  dialogMessage = '';
  isConfirm: boolean = false;
  editMode: boolean = false;
  newUser: any; 
  errors: string[] | null = null;
  originalName: string = "";
  originalPhoto: string = "";
  image!: File;

  constructor(private userAuthService: UserAuthService) { }
  user: any;
  role: string = "";
 

  ngOnInit() {
    
    
    this.userAuthService.getUserData().subscribe(
      res => {
        this.user = res;
        this.userAuthService.getInfoByEmail(this.user.email).subscribe(
          res => {
            this.newUser = res;
            
            this.originalName = this.newUser.firstName;
            this.originalPhoto = this.newUser.photo;
            this.formatBirthDate();
            
            this.userAuthService.getUserRole().subscribe(
              res => {
                this.role = res.role;
                if (this.role == "Citizen") {
                  this.country.setValue({ alpha2Code: this.newUser.nif.slice(0, 2) });
                  this.nif.setValue(this.newUser.nif.slice(2));
                }
                this.initForm();
              },
              error => {
                console.error(error);
              }
            );
          },
          error => {
            console.error(error);
          }
        );
      },
      error => {
        console.error(error);
      }
    );
    this.profileEdit.disable();
    
  }

  profileEdit = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.email, Validators.required]),
    surname: new FormControl("", [Validators.required]),
    birthDate: new FormControl(new Date(), [Validators.required]),
    address: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    nif: new FormControl("", [Validators.required, Validators.pattern(/^\d{9}$/)]),
    photo: new FormControl(null, [Validators.required]),
    postalCode1: new FormControl("", [Validators.required, Validators.pattern(/^\d{4}$/)]),
    postalCode2: new FormControl("", [Validators.required, Validators.pattern(/^\d{3}$/)]),
    password: new FormControl("", [
      Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)
    ]),
    passwordConfirmation: new FormControl("", [Validators.required]),
  });

  get firstName() {
    return this.profileEdit.get('firstName');
  }

  get surname() {
    return this.profileEdit.get('surname');
  }

  get email() {
    return this.profileEdit.get('email');
  }

  get password() {
    return this.profileEdit.get('password');
  }

  get country() {
    return this.profileEdit.get('country') as FormControl;
  }

  get nif() {
    return this.profileEdit.get('nif') as FormControl;
  }

  get address() {
    return this.profileEdit.get('address');
  }

  get postalCode1() {
    return this.profileEdit.get('postalCode1');
  }

  get postalCode2() {
    return this.profileEdit.get('postalCode2');
  }

  get birthDate() {
    return this.profileEdit.get('birthDate');
  }

  get photo() {
    return this.profileEdit.get('photo');
  }

  get passwordConfirmation() {
    return this.profileEdit.get('passwordConfirmation');
  }

  OnSubmit() {

    this.toggleEditMode();
    const formValues = this.profileEdit.value;
    this.newUser.firstName = formValues.firstName || this.newUser.firstName;
    this.newUser.surname = formValues.surname || this.newUser.surname;
    this.newUser.email = formValues.email || this.newUser.email;
    this.newUser.birthDate = formValues.birthDate || this.newUser.birthDate;
    this.newUser.address = formValues.address || this.newUser.address;
    this.newUser.country = formValues.country || this.newUser.country;

    this.newUser.nif = `${(this.country!.value! as Country).alpha2Code}${this.nif!.value!}` || this.newUser.nif;

    this.newUser.postalCode1 = formValues.postalCode1 || this.newUser.postalCode1;
    this.newUser.postalCode2 = formValues.postalCode2 || this.newUser.postalCode2;
    this.newUser.password = formValues.password ? formValues.password : "";
    var passConfirm = formValues.passwordConfirmation || "";
    this.newUser.events = [];
    if (this.role == 'Citizen') {
      this.userAuthService.updateUser(this.newUser, this.newUser.photo, passConfirm).subscribe(
        res => {


          this.originalName = this.newUser.firstName;
          this.originalPhoto = this.newUser.photo;
          this.initForm();

          this.isDialogOpen = true;
          this.dialogTitle = 'Atualização bem-sucedida';
          this.dialogMessage = 'Os seus dados foram atualizados com sucesso';
          this.isConfirm = true;
        },
        (error) => {
          console.log("erro " + error.error.errors)
          this.errors = error.error.errors;


          this.isDialogOpen = true;
          this.dialogTitle = 'Erro na Atualização de dados';
          this.dialogMessage = error.error.message;
          this.isConfirm = false;
        }
      );
    }
    else {
      this.userAuthService.updateMunicipAdminUser(this.newUser, this.newUser.photo, passConfirm).subscribe(
        res => {
          this.originalName = this.newUser.firstName;
          this.originalPhoto = this.newUser.photo;
          this.initForm();
        },
        (error) => {
          console.log("erro " + error.error.errors)
          this.errors = error.error.errors;
        }
      );
    }
   

  }

  //getUserAttributes(): { key: string, value: any }[] {
  //  if (!this.newUser) {
  //    return [];
  //  }
  //  return Object.keys(this.newUser).map(key => ({ key, value: this.newUser[key] }));
  //}

  formatBirthDate() {
    const dateString = this.newUser.birthDate;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;
    this.newUser.birthDate = formattedDate;
  }

  onImagePicked(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput?.files?.[0];
    if (file) {
      this.image = file;
      this.newUser.photo = this.image;
    } else {
      console.error('No file selected');
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.profileEdit.enable();
    } else {
      this.profileEdit.disable();
    }
  }

  cancelEditMode() {
    this.toggleEditMode();
    this.initForm();
  }

  initForm() {
    console.log("isiodjasdnoasin",this.newUser);
    this.profileEdit.patchValue({
      firstName: this.newUser.firstName || '',
      surname: this.newUser.surname || '',
      email: this.newUser.email || '',
      birthDate: this.newUser.birthDate || '',
      address: this.newUser.address || '',
      country: this.newUser.country || '',
      nif: this.newUser.nif || '',
      postalCode1: this.newUser.postalCode1 || '',
      postalCode2: this.newUser.postalCode2 || '',
      password: '',
      passwordConfirmation: ''
    });

    this.formatBirthDate();
    this.newUser.photo = this.originalPhoto; 
  }

  closeDialog() {
    this.isDialogOpen = false;
    window.location.reload();
  }
}
