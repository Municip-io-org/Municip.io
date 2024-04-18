import { Component } from '@angular/core';
import { MunicipalityStatusService } from '../../services/municipality-status.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DocsService, DocumentTemplate, DocumentTemplateStatus } from '../../services/documents/docs.service';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrl: './template-list.component.css'
})
/**
 * @class TemplateListComponent
 *
 * Este componente é responsável por listar os templates de documentos.
 *
 * @param municipalityImage - A imagem do município.
 * @param municipalName - O nome do município.
 * @param documents - Os documentos.
 * @param sortType - O tipo de ordenação.
 * @param sortReverse - A ordem de ordenação.
 * @param nameSearch - A pesquisa por nome.
 * @param selectedUser - O utilizador selecionado.
 * 
 * @returns Uma lista de templates de documentos.
 *
 **/
export class TemplateListComponent {
  municipalityImage: string = "";
  municipalName: string = "";
  documents: DocumentTemplate[] = [];

  sortType = 'firstName';
  sortReverse = false;
  nameSearch: string = '';
  selectedUser: any;

  /**
   * @constructor
   *
   * Este construtor é responsável por injetar o serviço de documentos, o router e o ActivatedRoute.
   *
   * @param service - O serviço de documentos.
   * @param router - O router.
   * @param route - O ActivatedRoute.
   * @param authService - O serviço de autenticação de utilizadores.
   *
   **/
  constructor(private service: DocsService, private router: Router, private route: ActivatedRoute,
    private authService: UserAuthService) { }

    /**
     *
     * Este método é responsável por obter os templates de documentos.
     *
     * @returns A lista de templates de documentos.
     *
     */
  ngOnInit() {
    this.authService.getUserData().subscribe((user) => {
      this.authService.getInfoByEmail(user.email).subscribe((account) => {
        this.authService.getInfoMunicipality(account.municipality).subscribe((municipality) => {
          this.municipalityImage = municipality.landscapePhoto;
          this.service.getTemplatesFromMunicipality(account.municipality).subscribe((templates) => {
            this.documents = templates;
          });
        });
      });

    });
  }

  /**
   * Retorna o estado de um template.
   * @returns O estado do template.
   */
  DocumentTemplateStatus() {
    return DocumentTemplateStatus;
  }



  /**
   * Ordena a tabela de administradores municipais com base na coluna especificada.
   * @param column A coluna pela qual a tabela será ordenada.
   */
  sortTable(column: string): void {
    if (this.sortType === column) {
      this.sortReverse = !this.sortReverse;
    } else {
      this.sortType = column;
      this.sortReverse = false;
    }

    this.documents.sort((a: any, b: any) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === 'string') {
        return this.sortString(valueA, valueB);
      } else {
        return this.sortNumeric(valueA, valueB);
      }
    });
  }
  /**
   * Atiav um template
   * @param document - O template a ser ativado.
   */
  activeDocument(document: DocumentTemplate) {
    this.service.activeTemplate(document.id!).subscribe(
      (response) => {
        document.status = DocumentTemplateStatus.active
      },
      (error) => {
        console.error(error);
      }
    );
  }
  /**
   * Desactiva um template
   * @param document - O template a ser desativado.
   */
  desactiveDocument(document: DocumentTemplate) {
    this.service.desactiveTemplate(document.id!).subscribe(
      (response) => {
        document.status = DocumentTemplateStatus.inactive
      },
      (error) => {
        console.error(error);
      }
    );

  }
  /**
   * Elimina um template
   * @param document - O template a ser eliminado.
   */
  deleteDocument(document: DocumentTemplate) {
    this.service.removeTemplate(document.id!).subscribe(
      (response) => {
        this.documents = this.documents.filter(d => d.id !== document.id);
      },
      (error) => {
        console.error(error);
      }
    );

  }
  /**
   * Editar um template
   * @param document - O template a ser editado.
   */
  editDocument(document: DocumentTemplate) {
    //redirect to edit page documents/edit-template/:templateId
    this.router.navigateByUrl(`documents/edit-template/${document.id}`);
  }



  /**
   * Filtra os documentos com base no nome.
   */
  get filteredDocuments() {
    return this.documents.filter(d => d.name.toLowerCase().includes(this.nameSearch.toLowerCase()) && d.status !== DocumentTemplateStatus.notListed);
  }

  /**
   * Compara duas strings para ordenação.
   * @param a A primeira string.
   * @param b A segunda string.
   * @returns O valor da comparação.
   */
  private sortString(a: string, b: string): number {
    return a.localeCompare(b) * (this.sortReverse ? -1 : 1);
  }

  /**
   * Compara dois números para ordenação.
   * @param a O primeiro número.
   * @param b O segundo número.
   * @returns O valor da comparação.
   */
  private sortNumeric(a: number, b: number): number {
    return (a - b) * (this.sortReverse ? -1 : 1);
  }

  /**
   * Redireciona para a página de criação de template.
   */
  goCreateTemplate() {
    this.router.navigateByUrl('documents/createtemplate');
  }
}
