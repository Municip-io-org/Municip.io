import { Component } from '@angular/core';
import { Roles, UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';
import { Municipality } from '../../services/municipal-admin-auth.service';
import { DocsService, DocumentTemplate, DocumentTemplateStatus } from '../../services/documents/docs.service';


@Component({
  selector: 'app-request-document',
  templateUrl: './request-document.component.html',
  styleUrl: './request-document.component.css'
})
/**
 * @class RequestDocumentComponent
 *
 * Este componente é responsável por solicitar um documento.
 *
 * @param templates - Os modelos de documento.
 * @param user - O utilizador.
 * @param isMunAdmin - O administrador municipal.
 * @param municipality - O município.
 * @param nameSearch - A pesquisa por nome.
 * 
 * @returns Um documento solicitado.
 *
 **/
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


  /**
   * Construtor do componente.
   * @param userAuthService
   * @param router
   * @param documentsService
   *
   **/
  constructor(private userAuthService: UserAuthService, private router: Router, private documentsService: DocsService) {
   
  }

  /**
   * Este método é responsável por inicializar o componente.
   * 
   * @returns As informações do utilizador.
   *
   **/
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

  /**
   * Este método é responsável por filtrar os documentos.
   * 
   * @returns A lista de documentos filtrada.
   *
   **/
  get filteredDocuments() {
    return this.templates.filter(template => template.name.toLowerCase().includes(this.nameSearch.toLowerCase()) && template.status == DocumentTemplateStatus.active);
  }

  /**
   * Redireciona para a página para ver os documentos pedidos pelo cidadão.
   */
  goToMyDocuments() {
    this.router.navigateByUrl('documents/my');
  }
}
