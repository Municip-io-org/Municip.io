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
export class TemplateListComponent {
  municipalityImage: string = "";
  municipalName: string = "";
  documents: DocumentTemplate[] = [];

  sortType = 'firstName';
  sortReverse = false;
  nameSearch: string = '';
  selectedUser: any;

  constructor(private service: DocsService, private router: Router, private route: ActivatedRoute,
    private authService: UserAuthService) { }

  ngOnInit() {
    this.authService.getUserData().subscribe((user) => {
      this.authService.getInfoByEmail(user.email).subscribe((account) => {
        this.authService.getInfoMunicipality(account.municipality).subscribe((municipality) => {
          this.municipalityImage = municipality.landscapePhoto;
          this.service.getTemplatesFromMunicipality(account.municipality).subscribe((templates) => {
            this.documents = templates;
            console.log(this.documents)
          });
        });
      });

    });
  }

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

  activeDocument(document: DocumentTemplate) {

  }

  desactiveDocument(document: DocumentTemplate) {

  }

  deleteDocument(document: DocumentTemplate) {

  }

  editDocument(document: DocumentTemplate) {

  }



  /**
   * Filtra os documentos com base no nome.
   */
  get filteredDocuments() {
    return this.documents.filter(d => d.name.toLowerCase().includes(this.nameSearch.toLowerCase()));
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
}
