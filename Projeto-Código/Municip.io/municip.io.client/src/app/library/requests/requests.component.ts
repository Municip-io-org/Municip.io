import { Component } from '@angular/core';
import { BookRequest, BookRequestStatus, LibraryService } from '../../services/library/library.service';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
/**
 * Requests Component
 *
 * Este componente representa os pedidos
 *
 * @param booksRequested - Livros pedidos
 * @param municipalityImage - Imagem do município
 * @param nameSearch - Nome da pesquisa
 * @param orderOptions - Opções de pedido
 * @param ascendingOrder - Ordem ascendente
 * @param municipalityName - Nome do município
 */
export class RequestsComponent {

  booksRequested: BookRequest[] = [];
  municipalityImage: string = '';
  nameSearch: string = '';
  orderOptions: any[] = [{ label: 'Mais antigo', value: true }, { label: 'Mais Recente', value: false }];
  ascendingOrder: boolean = true;


  municipalityName: string = '';

  /**
   * @constructor
   * RequestsComponent
   *
   * @param service - Serviço da biblioteca
   * @param authService - Serviço de autenticação do cidadão
   */
  constructor(private service: LibraryService, private authService: UserAuthService) {

  }



  /**
   * ngOnInit
   *
   * Inicializa o componente
   */
  ngOnInit(): void {
    this.authService.getUserData().subscribe((user) => {
      this.authService.getInfoByEmail(user.email).subscribe((account) => {
        this.authService.getInfoMunicipality(account.municipality).subscribe((municipality) => {
          this.municipalityImage = municipality.landscapePhoto;
          this.municipalityName = municipality.name;
          this.service.getRequestsByMunicipality(municipality.name).subscribe(
            (requests) => {
              this.booksRequested = requests;
              this.sortEventsByDate();
            },
            (error) => {
              console.error(error);
            }
          );
        });
      });

    });

  }

  /**
   * get filteredBooks
   *
   * Filtra os livros
   *
   * @returns Lista de livros filtrados
   */
  get filteredBooks() {
    return this.booksRequested.filter(b => b.book.title.toLowerCase().includes(this.nameSearch.toLowerCase()) && b.status !== BookRequestStatus.Delivered && b.status !== BookRequestStatus.Denied
    );
  }

  /**
   * toggleSortOrder
   *
   * Alterna a ordem de listagem
   */
  toggleSortOrder() {

    this.sortEventsByDate();
  }

  /**
   * sortEventsByDate
   *
   * Ordena eventos por data
   */
  sortEventsByDate() {
    //sort events by date

    this.booksRequested.sort((a, b) => {
      if (this.ascendingOrder) {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
  }

  /**
   * updateRequests
   *
   * Atualiza os pedidos
   */
  updateRequests() {
    this.service.getRequestsByMunicipality(this.municipalityName).subscribe(
      (requests) => {
        this.booksRequested = requests;
        this.sortEventsByDate();
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
