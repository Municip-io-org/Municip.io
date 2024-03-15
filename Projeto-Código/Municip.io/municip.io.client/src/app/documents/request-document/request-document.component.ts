import { Component } from '@angular/core';
import { Roles, UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';
import { Municipality } from '../../services/municipal-admin-auth.service';
import { DocsService, DocumentTemplate } from '../../services/documents/docs.service';


@Component({
  selector: 'app-request-document',
  templateUrl: './request-document.component.html',
  styleUrl: './request-document.component.css'
})
export class RequestDocumentComponent {

  templates: DocumentTemplate[] = [];

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

  nameSearch: string = '';


  constructor(private userAuthService: UserAuthService, private router: Router, private documentsService: DocsService) {
   
  }

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
                this.documentsService.getTemplatesFromMunicipality(this.municipality.name).subscribe(
                  (docRes: any) => {

                    this.templates = docRes as DocumentTemplate[];            
              
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

  get filteredDocuments() {
    return this.templates.filter(template => template.name.toLowerCase().includes(this.nameSearch.toLowerCase()));
  }
}
