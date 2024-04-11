import { Component } from '@angular/core';
import { MunicipalAdministrator, MunicipalAdminAuthService, Municipality } from '../../services/municipal-admin-auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Municipalities } from '../../municipalities.enum';

@Component({
  selector: 'app-sign-up-municipal-administrator-account',
  templateUrl: './sign-up-municipal-administrator-account.component.html',
  styleUrl: './sign-up-municipal-administrator-account.component.css',
})
/**
 * Componente para a criação de uma conta de administrador municipal
 *
 * @param municipalAdministrator O administrador municipal a registar
 * @param errors Os erros
 * @param defaultMunicipalityOption A opção de município padrão
 * @param municipalities Os municípios
 * @param signUpMunicipalAdminForm O formulário de registo de administrador municipal
 * @param image A imagem
 * @param imageUrl A URL da imagem
 * @param files Os ficheiros
 */
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

  
  defaultMunicipalityOption = 'Escolha o seu município';
  municipalities = Municipalities;

  image!: File;
  imageUrl: string | null = null;
  files: any[] = [];

  getMunicipalities() {
    return Object.values(this.municipalities)
  }

  /**
  * @constructor
  * SignUpMunicipalAdministratorAccountComponent
  * 
  * @param municipalAdminAuthService 
  * @param router 
  */
  constructor(private municipalAdminAuthService: MunicipalAdminAuthService, private router: Router) { }

  signUpMunicipalAdminForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    surname: new FormControl("",[Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, this.validatePassword.bind(this)]),
    municipality: new FormControl("", [Validators.required, this.validateMunicipality.bind(this)])
  });

  /**
   * Validador de município
   * @param control O controlador
   * @returns Validação
   */
  validateMunicipality(control: FormControl): { [key: string]: boolean } | null {
    if (!control.value || this.getMunicipalities().find((municipality: Municipalities) => municipality === control.value)) {
      return null;
    }
    return { 'invalidMunicipality': true };
  }

  /**
   * Validação da password
   * @param control
   * @returns
   */
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

  /**
 * Evento dispultado aquando do selecionamento de uma imagem
 * @param event
 */
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

  /**
   * Método responsável por validar se o ficheiro é uma imagem
   * @param file
   * @returns
   */

  isValidImageFile(file: File): boolean {
    // Adicione aqui a lógica para validar se o arquivo é uma imagem
    // Por exemplo, verificando a extensão do arquivo ou seu tipo MIME
    return file.type.startsWith('image/');
  }

  /**
   * Metodo onDragOver
   * @param event 
   */
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  /**
   * Método onDrop
   * @param event
   */
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


  /**
   * Método onSubmit
   */
  onSubmit() {

    this.municipalAdminAuthService.registerMunicipalAdmin(this.signUpMunicipalAdminForm.value as MunicipalAdministrator, this.image).subscribe(


      (result: any) => {
        if (result) {
          this.router.navigateByUrl('/signUp-Success');
        } else {
          var municipal, municipalname;
          municipal = this.signUpMunicipalAdminForm.value as MunicipalAdministrator
          municipalname = municipal.municipality
          console.log("AQUI");
     
          this.router.navigateByUrl('/signUp-Municipality/'+municipalname);
        }
      },
      (error) => {
        console.log(error.error.errors)
        console.log("AQUI2");
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


  



    
  }

