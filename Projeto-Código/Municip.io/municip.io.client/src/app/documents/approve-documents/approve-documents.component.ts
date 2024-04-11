import { Component } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { DocsService, RequestDocument } from '../../services/documents/docs.service';
@Component({
  selector: 'app-approve-documents',
  templateUrl: './approve-documents.component.html',
  styleUrl: './approve-documents.component.css'
})

/**
 * @class ApproveDocumentsComponent
 *
 * Este componente é responsável por exibir uma lista de documentos pendentes de aprovação.
 *
 * @returns Uma lista de documentos pendentes de aprovação.
 *
 **/
export class ApproveDocumentsComponent {

  documents: RequestDocument[] = [];
  municipalityImage: string = '';
  nameSearch: string = '';
  orderOptions: any[] = [{ label: 'Pedidos Antigos', value: true }, { label: 'Pedidos Recentes', value: false }];
  ascendingOrder: boolean = true;
  municipalityName: string = '';

  /**
   * @constructor
   *
   * Este construtor é responsável por injetar o serviço de documentos e de autenticação de utilizadores.
   *
   * @param docsService - O serviço de documentos.
   * @param authService - O serviço de autenticação de utilizadores.
   *
   **/
  constructor(private docsService: DocsService, private authService: UserAuthService) {

  }


  /**
   * Este método é responsável por obter os documentos pendentes de aprovação.
   *
   * @returns A lista de documentos pendentes de aprovação.
   *
   **/
  ngOnInit(): void {
    this.sortEventsByDate();
    this.authService.getUserData().subscribe((user) => {
      this.authService.getInfoByEmail(user.email).subscribe((account) => {
        this.authService.getInfoMunicipality(account.municipality).subscribe((municipality) => {
          this.municipalityImage = municipality.landscapePhoto;
          this.municipalityName = municipality.name;
          this.docsService.getRequestsFromMunicipality(municipality.name).subscribe(
            (res: RequestDocument[]) => {
              this.documents = res;
              console.log("bidsbca cia s", this.documents);
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
   * @returns A lista de documentos filtrada.
   *
   **/
  get filteredDocuments() {
    return this.documents.filter(e => e.name.toLowerCase().includes(this.nameSearch.toLowerCase()));
  }

  /**
   * Este método é responsável por inverter a ordem de ordenação.
   *
   * @returns A lista de documentos ordenada.
   *
   **/
  toggleSortOrder() {

    this.sortEventsByDate();
  }

  /**
   * Este método é responsável por ordenar os eventos por data.
   *
   * @returns A lista de eventos ordenada.
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

  /**
   * Este método é responsável por aprovar um documento.
   *
   * @param doc - O documento a aprovar.
   *
   **/
  waitPayment(doc: any) {

    var documentRequest = doc.document as RequestDocument;


    var baseUrl = location.origin;

    this.docsService.createPayment(documentRequest, this.municipalityImage, `${baseUrl}/documents/my`, `${baseUrl}/documents/my`);

    this.docsService.waitingForPayment(doc.document.id).subscribe(
      (res) => {
       this.ngOnInit(); 
      },
      error => {
        console.error(error);
      }
    );
  }

  /**
   * Este método é responsável por rejeitar um documento.
   *
   * @param doc - O documento a rejeitar.
   *
   **/
  rejectDocument(doc: any) {
    this.docsService.rejectDocument(doc.document.id).subscribe(
      (res) => {
        this.ngOnInit();
      },
      error => {
        console.error(error);
      }
    );
  }
}
