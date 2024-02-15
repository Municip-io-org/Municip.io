import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Municipality } from '../../services/municipal-admin-auth.service';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-municipal-edit',
  templateUrl: './municipal-edit.component.html',
  styleUrl: './municipal-edit.component.css'
})
export class MunicipalEditComponent {

  municipality: Municipality = {
    name: '',
    president: '',
    contact: '',
    description: '',
    areaha: '',
    codigo: '',
    codigopostal: '',
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

  anyUser: any;
  user: any;

  constructor(private userAuthService: UserAuthService) { }

  ngOnInit(): void {
    this.userAuthService.getUserData().subscribe(
      res => {
        this.anyUser = res;
        this.userAuthService.getInfoByEmail(this.anyUser.email).subscribe(
          (res: any) => {
            this.user = res;
            console.log("user", this.user);

            this.userAuthService.getInfoMunicipality(this.user.municipality).subscribe(
              (municipalityRes: any) => {
                this.municipality = municipalityRes as Municipality;
     
                console.log("municipality", this.municipality);
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
  }


  municipalityEditForm = new FormGroup({
    president: new FormControl(null, [Validators.required]),
    contact: new FormControl(null, [Validators.required, Validators.pattern(/^\d{9}$/)]),
    description: new FormControl(null, [Validators.required]),
    emblemPhoto: new FormControl(null, [Validators.required]),
    landscapePhoto: new FormControl(null, [Validators.required])
  });

 

  get president() {
    return this.municipalityEditForm.get('president');
  }

  get contact() {
    return this.municipalityEditForm.get('contact');
  }

  get description() {
    return this.municipalityEditForm.get('description');
  }

  get emblemPhoto() {
    return this.municipalityEditForm.get('emblemPhoto');
  }

  get landscapePhoto() {
    return this.municipalityEditForm.get('landscapePhoto');
  }

  onEmblemImagePicked(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.emblemImg = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.municipality.emblemPhoto = reader.result as string; // Atribui o URL temporário à propriedade emblemPhoto
      };
      reader.readAsDataURL(file); // Lê o conteúdo do arquivo como um URL de dados
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

    // Construct municipality object from form values
    var municipality = this.municipalityEditForm.value as unknown as Municipality;

    //// Call the service method to register the municipality
    //this.municipalAdminAuthService.registerMunicipality(municipality, this.emblemImg, this.landscapeImg).subscribe(
    //  (result) => {
    //    this.router.navigateByUrl('/signUp-Success');
    //  });


  }
}
