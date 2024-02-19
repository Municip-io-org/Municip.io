import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MunicipalAdminAuthService, Municipality } from '../../services/municipal-admin-auth.service';
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
    landscapePhoto: '',
  };

  currentEmblemPhoto!: string;
  currentLandscapePhoto!: string;

  emblemImg!: File;
  landscapeImg!: File;

  anyUser: any;
  user: any;

  editMode: boolean = false;

  municipalityEditForm = new FormGroup({
    president: new FormControl({ value: this.municipality.president, disabled:true}, [Validators.required]),
    contact: new FormControl({ value: this.municipality.contact, disabled: true }, [Validators.required, Validators.pattern(/^\d{9}$/)]),
    description: new FormControl({ value: this.municipality.description, disabled: true }, [Validators.required]),
    emblemPhoto: new FormControl({ value: null, disabled: true }),
    landscapePhoto: new FormControl({ value: null, disabled: true })
  });

  constructor(private userAuthService: UserAuthService, private municipalAdminAuthService :MunicipalAdminAuthService) { }

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
  }

  initForm() {
    this.municipalityEditForm.patchValue({
      president: this.municipality.president,
      contact: this.municipality.contact,
      description: this.municipality.description,
      emblemPhoto: null,
      landscapePhoto: null
    });

    this.currentEmblemPhoto = this.municipality.emblemPhoto;
    this.currentLandscapePhoto = this.municipality.landscapePhoto;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;

    if (this.editMode) {
      this.municipalityEditForm.enable();
    } else {
      this.municipalityEditForm.disable();
    }
  }

  cancelEditMode() {
    this.toggleEditMode();
    this.initForm();
  }

  

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
        this.currentEmblemPhoto = reader.result as string; // Atribui o URL temporário à propriedade emblemPhoto
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
      const reader = new FileReader();
      reader.onload = () => {
        this.currentLandscapePhoto = reader.result as string; // Atribui o URL temporário à propriedade emblemPhoto
      };
      reader.readAsDataURL(file); // Lê o conteúdo do arquivo como um URL de dados
    } else {
      console.error('No file selected');
    }
  }


  onSubmit() {

  this.toggleEditMode();

    /*console.log("ANTES DE ENVIAR Á API");*/

    this.municipality.president = this.president!.value!;
    this.municipality.contact = this.contact!.value!.toString();
    this.municipality.description = this.description!.value!;

    /*console.log(this.municipality);*/

  this.municipalAdminAuthService.updateMunicipality(this.municipality, this.emblemImg, this.landscapeImg).subscribe(
    //(result) => {
    //  console.log("RESULTADO DA API");
    //  console.log(result);
    //},
    //(error) => {
    //  // Lida com erros, se necessário
    //  console.log(error);
    //}
  );
  }
}
