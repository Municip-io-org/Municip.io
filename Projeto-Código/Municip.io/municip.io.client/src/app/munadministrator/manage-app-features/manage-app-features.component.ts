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
  });



  constructor(private userAuthService: UserAuthService, private appFeaturesService: AppFeaturesService, private router: Router) { }

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

  initForm() {
    this.appFeatureEditForm.patchValue({
      documents: this.appFeatures.find(a => a.appFeatureCategory == "Documents")?.isEnabled,
      events: this.appFeatures.find(a => a.appFeatureCategory == "Events")?.isEnabled,
      news: this.appFeatures.find(a => a.appFeatureCategory == "News")?.isEnabled,
      transports: this.appFeatures.find(a => a.appFeatureCategory == "Transports")?.isEnabled,
    });
  }

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

  saveChanges() {
    this.appFeatures.find(a => a.appFeatureCategory == "Documents")!.isEnabled = this.documents!.value!;
    this.appFeatures.find(a => a.appFeatureCategory == "Events")!.isEnabled = this.events!.value!;
    this.appFeatures.find(a => a.appFeatureCategory == "News")!.isEnabled = this.news!.value!;
    this.appFeatures.find(a => a.appFeatureCategory == "Transports")!.isEnabled = this.transports!.value!;
  }
 

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

  /**
   * Método responsável por fechar o diálogo
   */
  closeDialog() {
    this.isDialogOpen = false;
    window.location.reload();
  }
}


