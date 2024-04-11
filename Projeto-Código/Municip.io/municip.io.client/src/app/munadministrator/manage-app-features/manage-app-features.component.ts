import { Component } from '@angular/core';
import { Municipality } from '../../services/municipal-admin-auth.service';
import { Roles, UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';
import { AppFeature, AppFeaturesService, AppFeatureCategory } from '../../services/appFeatures/app-features.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-manage-app-features',
  templateUrl: './manage-app-features.component.html',
  styleUrls: ['./manage-app-features.component.css']
})
/**
 * Manage App Features Component
 *
 * Este componente representa a gestão de funcionalidades da aplicação
 *
 * @param error - Erro
 * @param isDialogOpen - Diálogo aberto
 * @param user - Utilizador
 * @param isMunAdmin - É administrador municipal
 * @param municipality - Município
 * @param appFeatures - Funcionalidades da aplicação
 * @param appFeatureEditForm - Formulário de edição de funcionalidades da aplicação
 */
export class ManageAppFeaturesComponent {

  error: string | null = null;
  isDialogOpen: boolean = false;

  user: any;
  isMunAdmin: boolean = false;

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

  appFeatures: AppFeature[] = [];

  appFeatureEditForm = new FormGroup({
    documents: new FormControl(false),
    events: new FormControl(false),
    news: new FormControl(false),
    transports: new FormControl(false),
    library: new FormControl(false),
  });




  /**
   * @constructor
   * ManageAppFeaturesComponent
   *
   * @param userAuthService - Serviço de autenticação do utilizador
   * @param appFeaturesService - Serviço de funcionalidades da aplicação
   * @param router - O Router
   */
  constructor(private userAuthService: UserAuthService, private appFeaturesService: AppFeaturesService, private router: Router) { }

  /**
   * ngOnInit
   *
   * Inicializa o componente
   */
  ngOnInit(): void {

    this.userAuthService.getUserData().subscribe(
      res => {
        let anyUser: any;
        anyUser = res;
        this.userAuthService.getInfoByEmail(anyUser.email).subscribe(
          async (res: any) => {
            this.user = res;

            const userRole = await this.userAuthService.getUserRole().toPromise();
            if (userRole!.role === Roles.Municipal) {
              this.isMunAdmin = true;
            }

            this.userAuthService.getInfoMunicipality(this.user.municipality).subscribe(
              (municipalityRes: Municipality) => {
                this.municipality = municipalityRes;

                this.appFeaturesService.getAppFeaturesByMunicipality(this.municipality.name).subscribe(
                  (appFeaturesRes: AppFeature[]) => {
                  
                    this.appFeatures = appFeaturesRes;
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
      },
      error => {
        console.error(error);
      }
    );
  }

  /**
   * initForm
   *
   * Inicializa o formulário
   */
  initForm() {
    this.appFeatureEditForm.patchValue({
      documents: this.appFeatures.find(a => a.appFeatureCategory == "Documents")?.isEnabled,
      events: this.appFeatures.find(a => a.appFeatureCategory == "Events")?.isEnabled,
      news: this.appFeatures.find(a => a.appFeatureCategory == "News")?.isEnabled,
      transports: this.appFeatures.find(a => a.appFeatureCategory == "Transports")?.isEnabled,
      library : this.appFeatures.find(a => a.appFeatureCategory == "Library")?.isEnabled,
    });
  }

  /**
   * onSubmit
   *
   * Submete o formulário
   */
  onSubmit() {


    this.saveChanges();

    this.appFeaturesService.updateAppFeatures(this.appFeatures).subscribe(
      (response) => {
        this.error = null;
        this.isDialogOpen = true;
         
        
      },
      error => {
        console.error(error);
      }
    );

  }

  /**
   * saveChanges
   *
   * Guarda as alterações
   */
  saveChanges() {
    this.appFeatures.find(a => a.appFeatureCategory == "Documents")!.isEnabled = this.documents!.value!;
    this.appFeatures.find(a => a.appFeatureCategory == "Events")!.isEnabled = this.events!.value!;
    this.appFeatures.find(a => a.appFeatureCategory == "News")!.isEnabled = this.news!.value!;
    this.appFeatures.find(a => a.appFeatureCategory == "Transports")!.isEnabled = this.transports!.value!;
    this.appFeatures.find(a => a.appFeatureCategory == "Library")!.isEnabled = this.library!.value!;
  }
 

  //Getters
  get documents() {
    return this.appFeatureEditForm.get('documents');
  }
  get events() {
    return this.appFeatureEditForm.get('events');
  } 
  get news() {
    return this.appFeatureEditForm.get('news');
  } 
  get transports() {
    return this.appFeatureEditForm.get('transports');
  }

  get library() {
    return this.appFeatureEditForm.get('library');
  }

  /**
   * Método responsável por fechar o diálogo
   */
  closeDialog() {
    this.isDialogOpen = false;
  }
}


