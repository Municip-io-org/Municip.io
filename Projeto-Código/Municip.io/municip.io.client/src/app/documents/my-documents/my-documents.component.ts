import { Component } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { DocsService, RequestDocument } from '../../services/documents/docs.service';

@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.component.html',
  styleUrl: './my-documents.component.css'
})
/**
 * @class MyDocumentsComponent
 *
 * Este componente é responsável por exibir a lista de documentos do cidadão.
 *
 * @param documents - A lista de documentos.
 * @param municipalityImage - A imagem do município.
 * @param nameSearch - A pesquisa por nome.
 * @param orderOptions - As opções de ordenação.
 * @param ascendingOrder - A ordem ascendente.
 * 
 * 
 * @returns A lista de documentos do cidadão.
 *
 **/
export class MyDocumentsComponent {

  documents: RequestDocument[] = [];
  municipalityImage: string = '';
  nameSearch: string = '';
  orderOptions: any[] = [{ label: 'Mais antigo', value: true }, { label: 'Mais Recente', value: false }];
  ascendingOrder: boolean = true;

  /**
   * @constructor
   *
   * Este construtor é responsável por injetar o serviço de documentos e de autenticação de utilizadores.
   *
   * @param service - O serviço de documentos.
   * @param authService - O serviço de autenticação de utilizadores.
   *
   **/
  constructor(private service: DocsService, private authService: UserAuthService) {
    
  }



  /**
   * Este método é responsável por obter os documentos do cidadão.
   *
   * @returns A lista de documentos do cidadão.
   *
   **/
  ngOnInit(): void {
    this.sortEventsByDate();
    this.authService.getUserData().subscribe((user) => {
      this.authService.getInfoByEmail(user.email).subscribe((account) => {
        this.authService.getInfoMunicipality(account.municipality).subscribe((municipality) => {
          this.municipalityImage = municipality.landscapePhoto;

          this.service.getRequestsFromCitizen(user.email).subscribe(
            (docRes: any) => {
              this.documents = docRes as RequestDocument[];

            },
            error => {
              console.error(error);
            }
          );
        });
      });

    });

  }

  /**
   * Este método é responsável por filtrar os documentos.
   *
   * @returns Os documentos filtrados.
   *
   **/
  get filteredDocuments() {
    return this.documents.filter(e => e.name.toLowerCase().includes(this.nameSearch.toLowerCase()));
  }

  /**
   * Este método é responsável por ordenar os documentos.
   *
   * @param column - A coluna a ordenar.
   *
   **/
  toggleSortOrder() {

    this.sortEventsByDate();
  }

  /**
   * Este método é responsável por ordenar os eventos por data.
   *
   **/
  sortEventsByDate() {
    //sort events by date
    this.documents.sort((a, b) => {
      if (this.ascendingOrder) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  }

}
