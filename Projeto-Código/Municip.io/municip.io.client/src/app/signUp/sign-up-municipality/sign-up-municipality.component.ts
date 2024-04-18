/// <reference path="../sign-up-municipal-administrator-account/sign-up-municipal-administrator-account.component.ts" />
import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Municipality, MunicipalAdminAuthService } from '../../services/municipal-admin-auth.service';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-sign-up-municipality',
  templateUrl: './sign-up-municipality.component.html',
  styleUrl: './sign-up-municipality.component.css'
})

  /**
   * Componente para a criação de uma conta de um município
   *
   * @param municipality
   * @param editor
   * @param toolbar
   * @param emblemPhoto
   * @param landscapePhoto
   * @param emblemImg
   * @param landscapeImg
   * @param emblemUrl
   * @param landscapeUrl
   * @param files
   * 
   * 
   */  
export class SignUpMunicipalityComponent {
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
  emblemImg!: File;
  landscapeImg!: File;

  emblemUrl: string | null = null;
  landscapeUrl: string | null = null;
  files: any[] = [];
  

  /**
  * @constructor
  * SignUpMunicipalityComponent
  * 
  * @param municipalAdminAuthService 
  * @param router
  * @param route
  */
  constructor(private municipalAdminAuthService: MunicipalAdminAuthService, private router: Router, private route: ActivatedRoute) { }

  signUpMunicipalityForm = new FormGroup({
    president: new FormControl("", [Validators.required]),
    contact: new FormControl("", [Validators.required, Validators.pattern(/^\d{9}$/)]),
    description: new FormControl("", [Validators.required]),
  });


  /**
   * Método onInit
   */
  ngOnInit() {
    this.editor = new Editor();
  }

  /**
   * ngOnDestroy
   */
  ngOnDestroy() {
    this.editor.destroy();
  }

  //Getters for form controls
  get president() {
    return this.signUpMunicipalityForm.get('president');
  }

  get contact() {
    return this.signUpMunicipalityForm.get('contact');
  }

  get description() {
    return this.signUpMunicipalityForm.get('description');
  }


 
  openFilePicker(inputId: string) {
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    if (fileInput) {
      fileInput.click(); // Abre o seletor de arquivo correspondente
    }
  }


  /**
   * Método para a mudança de imagem do emblema
   * @param event
   * @returns A alteração da imagem
   */ 
  onEmblemChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const fileList: FileList | null = fileInput?.files;

    if (fileList && fileList.length > 0) {
      this.emblemImg = fileList[0];
      this.emblemUrl = URL.createObjectURL(this.emblemImg);

      console.log("ON FILE CHANGE");
    } else {
      console.error('Nenhuma imagem selecionada');
    }
  }

  /**
   * Método para a mudança de imagem do emblema
   * @param event
   * @returns A alteração da imagem
   */
  onDropEmblem(event: DragEvent) {
    event.preventDefault();
    const files: FileList | null = event.dataTransfer?.files || null;
    if (files && files.length > 0) {
      const file = files[0];
      if (file && this.isValidImageFile(file)) { // Verifique se file não é null ou undefined
        this.emblemImg = file;
        this.emblemUrl = URL.createObjectURL(this.emblemImg);

      } else {
        console.error('Por favor, solte uma imagem válida.');
      }
    } else {
      console.error('Nenhuma imagem solta.');
    }
  }

  /**
   * Método para a mudança de imagem da paisagem
   * @param event
   * @returns A alteração da imagem
   */
  onLandscapeChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const fileList: FileList | null = fileInput?.files;

    if (fileList && fileList.length > 0) {
      this.landscapeImg = fileList[0];
      this.landscapeUrl = URL.createObjectURL(this.landscapeImg);

      console.log("ON FILE CHANGE");
    } else {
      console.error('Nenhuma imagem selecionada');
    }
  }

  /**
   * Método para a mudança de imagem da paisagem
   * @param event
   * @returns A alteração da imagem
   */
  onDropLandscape(event: DragEvent) {
    event.preventDefault();
    const files: FileList | null = event.dataTransfer?.files || null;
    if (files && files.length > 0) {
      const file = files[0];
      if (file && this.isValidImageFile(file)) { // Verifique se file não é null ou undefined
        this.landscapeImg = file;
        this.landscapeUrl = URL.createObjectURL(this.landscapeImg);

      } else {
        console.error('Por favor, solte uma imagem válida.');
      }
    } else {
      console.error('Nenhuma imagem solta.');
    }
  }

  

  /**
   * Método para validar se o ficheiro é uma imagem
   * @param file
   * @returns A validade do ficheiro
   */
  isValidImageFile(file: File): boolean {
    // Adicione aqui a lógica para validar se o arquivo é uma imagem
    // Por exemplo, verificando a extensão do arquivo ou seu tipo MIME
    return file.type.startsWith('image/');
  }

  /**
   * Método para prevenir o comportamento padrão do navegador
   * @param event
   */
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  


  /**
   * Método onSubmit
   */
  onSubmit() {
    var municipalName = this.route.snapshot.params['municipalName'];

    // Construct municipality object from form values
    var municipality = this.signUpMunicipalityForm.value as unknown as Municipality;
    municipality.name = municipalName;

    // Call the service method to register the municipality
    this.municipalAdminAuthService.registerMunicipality(municipality, this.emblemImg, this.landscapeImg).subscribe(
      (result) => {
        this.router.navigateByUrl('/signUp-Success');
      });


  }
  
}

