import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MunicipalAdminAuthService, Municipality } from '../../services/municipal-admin-auth.service';
import { UserAuthService } from '../../services/user-auth.service';
import { Editor, Toolbar } from 'ngx-editor';

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
      libraryAddress: ''
  };

  editor = new Editor();
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  currentEmblemPhoto!: string;
  currentLandscapePhoto!: string;

  emblemImg!: File;
  landscapeImg!: File;

  user: any;

  editMode: boolean = false;

  municipalityEditForm = new FormGroup({
    president: new FormControl({ value: this.municipality.president, disabled:true}, [Validators.required]),
    contact: new FormControl({ value: this.municipality.contact, disabled: true }, [Validators.required, Validators.pattern(/^\d{9}$/)]),
    description: new FormControl({ value: this.municipality.description, disabled: true }, [Validators.required]),
    libraryAddress: new FormControl({ value: this.municipality.libraryAddress, disabled: true }),
    emblemPhoto: new FormControl({ value: null, disabled: true }),
    landscapePhoto: new FormControl({ value: null, disabled: true })
  });

  constructor(private userAuthService: UserAuthService, private municipalAdminAuthService :MunicipalAdminAuthService) { }

  ngOnInit(): void {
    this.editor = new Editor();
    this.userAuthService.getUserData().subscribe(
      res => {
        let anyUser = res;
        this.userAuthService.getInfoByEmail(anyUser.email).subscribe(
          (res: any) => {
            this.user = res;

            this.userAuthService.getInfoMunicipality(this.user.municipality).subscribe(
              (municipalityRes: any) => {
                this.municipality = municipalityRes as Municipality;
     

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

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  initForm() {
    this.municipalityEditForm.patchValue({
      president: this.municipality.president,
      contact: this.municipality.contact,
      description: this.municipality.description,
      libraryAddress: this.municipality.libraryAddress,
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

  get libraryAddress() {
    return this.municipalityEditForm.get('libraryAddress');
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


    this.municipality.president = this.president!.value!;
    this.municipality.contact = this.contact!.value!.toString();
    this.municipality.description = this.description!.value!;
    this.municipality.libraryAddress = this.libraryAddress!.value!;


  this.municipalAdminAuthService.updateMunicipality(this.municipality, this.emblemImg, this.landscapeImg).subscribe(

  );
  }
}
