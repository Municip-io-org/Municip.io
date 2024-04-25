import { Component } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from '../services/citizen-auth.service';
import { Municipality } from '../services/municipal-admin-auth.service';

/**
 * Componente para a página de perfil do utilizador.
 *
 * @param isDialogOpen - Estado do diálogo
 * @param isRemoveEventDialogOpen - Estado do diálogo de remoção de evento
 * @param dialogTitle - Título do diálogo
 * @param dialogMessage - Mensagem do diálogo
 * @param dialogTitleConfirm - Título do diálogo de confirmação
 * @param dialogMessageConfirm - Mensagem do diálogo de confirmação
 * @param isConfirm - Estado de confirmação
 * @param editMode - Modo de edição
 * @param newUser - Novo utilizador
 * @param errors - Erros
 * @param originalName - Nome original
 * @param image - Imagem
 * @param imageUrl - URL da imagem
 * @param files - Ficheiros
 * @param municipality - Município
 * @param confirmPassDialog - Confirmação da password
 * 
 */
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
  dialogTitleConfirm = '';
  dialogMessageConfirm = '';
  isConfirm: boolean = false;
  editMode: boolean = false;
  newUser: any; 
  errors: string[] | null = null;
  originalName: string = "";
  image!: File;
  imageUrl: string | null = null;
  files: any[] = [];
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
  confirmPassDialog:boolean = false;



  /**
   * Método construtor para instanciar o componente.
   * @param userAuthService  Serviço de autenticação do utilizador.
   */
  constructor(private userAuthService: UserAuthService) { }
  user: any;
  role: string = "";
 
  /**
   * Método onInit
   */
  ngOnInit() {
    
    
    this.userAuthService.getUserData().subscribe(
      res => {
        this.user = res;
        this.userAuthService.getInfoByEmail(this.user.email).subscribe(
          res => {
            this.newUser = res;
            
            this.originalName = this.newUser.firstName;
            this.imageUrl = this.newUser.photo;
            this.formatBirthDate();
            
            this.userAuthService.getUserRole().subscribe(
              res => {
                this.role = res.role;
                if (this.role == "Citizen") {
                  this.country.setValue({ alpha2Code: this.newUser.nif.slice(0, 2) });
                  this.nif.setValue(this.newUser.nif.slice(2));
                }
                this.userAuthService.getInfoMunicipality(this.newUser.municipality).subscribe(
                  async (municipalityRes: Municipality) => {
                    this.municipality = municipalityRes;
                    console.log(this.municipality)
                  });
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
    postalCode1: new FormControl("", [Validators.required, Validators.pattern(/^\d{4}$/)]),
    postalCode2: new FormControl("", [Validators.required, Validators.pattern(/^\d{3}$/)]),
    password: new FormControl("", [
      Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)
    ]),
    passwordConfirmation: new FormControl("", [Validators.required]),
  });
   
  passConfirmForm = new FormGroup({
    passConfirm: new FormControl("", [Validators.required])
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

  get passConfirm() {
    return this.profileEdit.get('passConfirm');
  }
  /**
   * Método de submissão
   */
  OnSubmit() {

    this.toggleEditMode();
    const formValues = this.profileEdit.value;
    const formPassValues = this.passConfirmForm.value;
    this.newUser.firstName = formValues.firstName || this.newUser.firstName;
    this.newUser.surname = formValues.surname || this.newUser.surname;
    this.newUser.email = formValues.email || this.newUser.email;
    this.newUser.birthDate = formValues.birthDate || this.newUser.birthDate;
    this.newUser.address = formValues.address || this.newUser.address;
    this.newUser.country = formValues.country || this.newUser.country;
    this.newUser.photo = this.image || this.imageUrl!; 
    this.newUser.nif = formValues.nif || this.newUser.nif;

    this.newUser.postalCode1 = formValues.postalCode1 || this.newUser.postalCode1;
    this.newUser.postalCode2 = formValues.postalCode2 || this.newUser.postalCode2;
    this.newUser.password = formValues.password ? formValues.password : "";
    var passConfirm = formPassValues.passConfirm || "";
    this.newUser.events = [];
    console.log("A IMG", this.image);



    if (this.role == 'Citizen') {
      this.userAuthService.updateUser(this.newUser, this.newUser.photo, passConfirm).subscribe(
        res => {


          this.originalName = this.newUser.firstName;
          this.imageUrl = this.newUser.photo;

          this.initForm();

          this.isDialogOpen = true;
          this.dialogTitle = 'Atualização bem-sucedida';
          this.dialogMessage = 'Os seus dados foram atualizados com sucesso';
          this.isConfirm = true;
          this.closeConfirmPassDialog();
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
          this.imageUrl = this.newUser.photo;
          this.initForm();
          this.closeConfirmPassDialog()
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

  /**
   * Método para formatar a data de nascimento 
   */
  formatBirthDate() {
    const dateString = this.newUser.birthDate;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;
    this.newUser.birthDate = formattedDate;
  }

  /**
   * Inverter o modo de edição
   */
  toggleEditMode() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.profileEdit.enable();
      this.profileEdit.controls['email'].disable();
      this.profileEdit.controls['nif'].disable();
    } else {
      this.profileEdit.disable();
    }
  }
  /**
   * Cancelar o estado de edição
   */
  cancelEditMode() {
    this.toggleEditMode();
    this.initForm();
  }
  /**
   * Inicializar o formulário
   */
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
    this.imageUrl = this.newUser.photo; 
  }

  initPassConfirmForm() {
    this.passConfirmForm.patchValue({
      passConfirm: ''
    });
  }

  /**
   * Evento resposável pela alteração do ficheiro
   * @param event evento HTML
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
   * Validação da image 
   * @param file ficheiro da imagem 
   * @returns o resultado
   */
  isValidImageFile(file: File): boolean {
    // Adicione aqui a lógica para validar se o arquivo é uma imagem
    // Por exemplo, verificando a extensão do arquivo ou seu tipo MIME
    return file.type.startsWith('image/');
  }
  /**
   * Evento ao arrastar a imagem
   * @param event evento HTML
   */
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
  /**
   * Evento ao largar a imagem 
   * @param event evento HTML
   * @returns o resultado
   */
  onDrop(event: DragEvent) {
    if (!this.editMode) return;

    event.preventDefault();
    const files: FileList | null = event.dataTransfer?.files || null;
    if (files && files.length > 0) {
      const file = files[0];
      if (file && this.isValidImageFile(file)) { 
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
   * Fechar o diálogo
   */
  closeDialog() {
    this.isDialogOpen = false;
    window.location.reload();
  }

  /**
   * Confirmar a Password
   */
  openConfirmPassDialog() {
    this.confirmPassDialog = true;

  }

  /**
   * Fechar o diálogo de confirmação
   */
  closeConfirmPassDialog() {
    this.confirmPassDialog = false;
  }
}
