import { Component } from '@angular/core';
import { Book, BookStatus, LibraryService } from '../../services/library/library.service';
import { Roles, UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';
import { Municipality } from '../../services/municipal-admin-auth.service';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrl: './library-list.component.css'
})
/**
 * Library List Component
 *
 * Este componente representa a lista de livros da biblioteca
 *
 * @param books - Lista de livros
 * @param nameSearch - Nome do livro a ser pesquisado
 * @param user - Usuário
 * @param municipality - Município
 * @param filteredBookList - Lista de livros filtrados
 * @param filterWindow - Janela de filtro
 * @param isbnSearch - ISBN do livro a ser pesquisado
 * @param authorSearch - Autor do livro a ser pesquisado
 * @param genreSearch - Gênero do livro a ser pesquisado
 * @param options - Opções de pesquisa
 * @param dateOptions - Opções de data
 * @param genreOptions - Opções de gênero
 */
export class LibraryListComponent {

  books: Book[] = [];
  showBooks: Book[] = [];
  currentPage = 1;
  itemsPerPage = 8;

  nameSearch: string = '';
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



  filterWindow: boolean = false;
  isbnSearch: string = '';
  authorSearch: string = '';
  genreSearch: string = '';
  options: string[] = [];
  dateOptions: string[] = [];
  genreOptions: string[] = [];

  minDateFilter: number = 2000;
  maxDateFilter: number = 2024;

  startDateFilter: number = this.minDateFilter;
  endDateFilter: number = this.maxDateFilter;

  /**
   * @constructor
   * LibraryListComponent
   *
   * @param userAuthService - Serviço de autenticação do cidadão
   * @param libraryService - Serviço da biblioteca
   * @param router - O Router
   */
  constructor(private userAuthService: UserAuthService, private libraryService: LibraryService, private router: Router) { }

  /**
   * ngOnInit
   *
   * Inicializa o componente
   */
  ngOnInit() {

    this.userAuthService.getUserData().subscribe(
      res => {
        let anyUser: any;
        anyUser = res;
        this.userAuthService.getInfoByEmail(anyUser.email).subscribe(
          async (res: any) => {
            this.user = res;
            console.log(this.user);


            const userRole = await this.userAuthService.getUserRole().toPromise();
            if (userRole!.role === Roles.Municipal) {
              this.isMunAdmin = true;
            }


            this.userAuthService.getInfoMunicipality(this.user.municipality).subscribe(
              async (municipalityRes: Municipality) => {
                this.municipality = municipalityRes;
                console.log(this.municipality)
                this.libraryService.getBooks(this.municipality.name).subscribe((data: Book[]) => {
                  this.books = data;
                  this.books = this.books.filter(b => b.status != BookStatus.Unavailable);

                  this.showBooks = this.libraryService.getPaginationBooks(this.currentPage, this.itemsPerPage, this.books);

                  this.loadDateOptions();
                  this.loadGenreOptions();
                });
              });



          }
        )
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

    if (this.nameSearch === '' &&
      this.isbnSearch === '' &&
      this.authorSearch === '' &&
      this.genreSearch === '' &&
      (this.startDateFilter === this.minDateFilter) &&
      (this.endDateFilter === this.maxDateFilter)) return this.showBooks;

    let filteredList = this.books;

    if (this.nameSearch !== '') {
      filteredList = filteredList.filter(book => book.title.toLowerCase().includes(this.nameSearch.toLowerCase()));
    }

    if (this.isbnSearch !== '') {
      filteredList = filteredList.filter(book => book.isbn?.toLowerCase().includes(this.isbnSearch.toLowerCase()));
    }

    if (this.authorSearch !== '') {
      filteredList = filteredList.filter(book => this.filterArray(book.author, this.authorSearch.toLowerCase()));
    }

    if (this.genreSearch !== '') {
      filteredList = filteredList.filter(book => this.filterArray(book.genre, this.genreSearch.toLowerCase()));
    }


    if (this.startDateFilter !== this.minDateFilter) {
      filteredList = filteredList.filter(book => new Date(book.publicationDate).getFullYear() >= this.startDateFilter);
    }

    if (this.endDateFilter !== this.maxDateFilter) {
      filteredList = filteredList.filter(book => new Date(book.publicationDate).getFullYear() <= this.endDateFilter);
    }

    return filteredList;
  }

  /**
   * filterArray
   *
   * Filtra um array
   *
   * @param array - Array a ser filtrado
   * @param searchTerm - Termo de pesquisa
   * @returns true se o array contém o termo de pesquisa
   */
  filterArray(array: string[], searchTerm: string): boolean {
    return array.some(item => item.toLowerCase().includes(searchTerm));
  }


  /**
   * editBook
   *
   * Edita um livro
   *
   * @param book - Livro a ser editado
   */
  editBook(book: any) {
    this.router.navigateByUrl('/library/edit/' + book.book.id);
    console.log("Editar livro", book);
  }

  /**
   * deleteBook
   *
   * Apaga um livro
   *
   * @param book - Livro a ser apagado
   */
  deleteBook(book: any) {
    this.libraryService.removeBook(book.book.id).subscribe(
      (res) => {
        console.log("Livro apagado com sucesso", res);
        this.loadBooks();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * loadBooks
   *
   * Carrega os livros
   */
  loadBooks() {
    this.libraryService.getBooks(this.municipality.name).subscribe((data: Book[]) => {
      this.books = data;
      this.books = this.books.filter(b => b.status != BookStatus.Unavailable)
    });
  }

  /**
   * Método para carregar mais eventos.
   */
  onScrollDown() {
    if (this.books.length > this.showBooks.length) {
      this.currentPage++;
      this.showBooks = [...this.showBooks, ...this.libraryService.getPaginationBooks(this.currentPage, this.itemsPerPage, this.books)];
    }
  } 

  /**
   * openFilterWindow
   *
   * Abre a janela de filtro
   */
  OpenFilterWindow() {
    this.filterWindow = !this.filterWindow;
  }

  /**
   * clearFilters
   *
   * Limpa os filtros
   */
  loadDateOptions() {

    this.dateOptions = [...new Set(this.books.map(book => {
      return book.publicationDate.toString().split("-")[0];
    }))].sort();

    const minDate = Math.min(...this.dateOptions.map(date => parseInt(date)));
    const maxDate = Math.max(...this.dateOptions.map(date => parseInt(date)));
    if (minDate < this.minDateFilter) {
      this.minDateFilter = minDate;
    }

    if (maxDate > this.maxDateFilter) {
      this.maxDateFilter = maxDate;
    }


    this.startDateFilter = this.minDateFilter;
    this.endDateFilter = this.maxDateFilter;




  }


  /**
   * goToCreateBookPage
   *
   * Redireciona para a página de criação de livros
   *
   */
  goToCreateBookPage() {
    this.router.navigateByUrl(`library/create`);
  }

  /**
   * loadGenreOptions
   *
   * Carrega as opções de gênero
   *
   */
  loadGenreOptions() {

    this.genreOptions = Array.from(new Set(this.books.flatMap(book => book.genre)));
    console.log(this.genreOptions);
  }

  /**
   * goToBookPage
   *
   * Redirecionamento para a página do livro
   *
   * @param book - Livro
   */
  goToBookPage(book: any) {
    this.router.navigateByUrl('/library/' + book);
  }
}
