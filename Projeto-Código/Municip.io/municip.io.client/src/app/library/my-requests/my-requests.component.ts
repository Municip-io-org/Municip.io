import { Component } from '@angular/core';
import { BookRequest, LibraryService } from '../../services/library/library.service';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrl: './my-requests.component.css'
})
/**
 * My Requests Component
 *
 * Este componente representa as solicitações do cidadão
 *
 * @param booksRequested - Livros solicitados
 * @param municipalityImage - Imagem do município
 * @param nameSearch - Nome da pesquisa
 * @param orderOptions - Opções de pedido
 * @param ascendingOrder - Ordem ascendente
 * @param citizenEmail - Email do cidadão
 */
export class MyRequestsComponent {

  booksRequested: BookRequest[] = [];
  municipalityImage: string = '';
  nameSearch: string = '';
  orderOptions: any[] = [{ label: 'Mais antigo', value: true }, { label: 'Mais Recente', value: false }];
  ascendingOrder: boolean = true;

  citizenEmail: string = '';


  /**
   * @constructor
   * MyRequestsComponent
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
          this.citizenEmail = user.email;
          this.service.getRequestsByCitizen(user.email).subscribe(
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
    return this.booksRequested.filter(b => b.book.title.toLowerCase().includes(this.nameSearch.toLowerCase()));
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
   * Classifica os eventos por data
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
   * Atualiza os Pedidos
   */
  updateRequests() {
    this.service.getRequestsByCitizen(this.citizenEmail).subscribe(
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
