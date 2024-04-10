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
/**
 * Municipal Edit Component
 *
 * Este componente representa a edição municipal
 *
 * @param municipality - Município
 * @param editor - Editor
 * @param toolbar - Barra de ferramentas
 * @param currentEmblemPhoto - Foto de emblema atual
 * @param currentLandscapePhoto - Foto de paisagem atual
 * @param emblemImg - Imagem de emblema
 * @param landscapeImg - Imagem de paisagem
 * @param user - Utilizador
 * @param editMode - Modo de edição
 * @param municipalityEditForm - Formulário de edição do município
 */
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
    emblemPhoto: new FormControl({ value: null, disabled: true }),
    landscapePhoto: new FormControl({ value: null, disabled: true })
  });

  /**
   * @constructor
   * MunicipalEditComponent
   *
   * @param municipalAdminAuthService - Serviço de autenticação do administrador municipal
   * @param userAuthService - Serviço de autenticação do cidadão
   */
  constructor(private userAuthService: UserAuthService, private municipalAdminAuthService :MunicipalAdminAuthService) { }

  /**
   * ngOnInit
   *
   * Inicializa o componente
   */
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

  /**
   * ngOnDestroy
   *
   * Destroi o editor
   */
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  /**
   * initForm
   *
   * Inicializa o formulário
   */
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

  /**
   * toggleEditMode
   *
   * Ativa/desativa o modo de edição
   */
  toggleEditMode() {
    this.editMode = !this.editMode;

    if (this.editMode) {
      this.municipalityEditForm.enable();
    } else {
      this.municipalityEditForm.disable();
    }
  }

  /**
   * cancelEditMode
   *
   * Cancela o modo de edição
   */
  cancelEditMode() {
    this.toggleEditMode();
    this.initForm();
  }

  
  //Getters
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

  /**
   * onEmblemImagePicked
   *
   * Seleciona a imagem de emblema
   *
   * @param event - Evento
   */
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



  /**
   * onLandscapeImagePicked
   *
   * Seleciona a imagem de paisagem
   *
   * @param event - Evento
   */
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


  /**
   * onSubmit
   *
   * Submete o formulário
   */
  onSubmit() {

  this.toggleEditMode();


    this.municipality.president = this.president!.value!;
    this.municipality.contact = this.contact!.value!.toString();
    this.municipality.description = this.description!.value!;


  this.municipalAdminAuthService.updateMunicipality(this.municipality, this.emblemImg, this.landscapeImg).subscribe(

  );
  }
}
