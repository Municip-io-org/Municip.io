import { Component } from '@angular/core';
import { Book, BookStatus, LibraryService } from '../../services/library/library.service';

import { Roles, UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrl: './library-list.component.css'
})
export class LibraryListComponent {

  books: Book[] = [];
  nameSearch: string = '';
    user: any;
  municipality: any;
    filteredBookList: Book[] = [];
  filterWindow: boolean = true;
  isbnSearch: string = '';
  authorSearch: string = '';
  dateSearch: string ='';
  genreSearch: string = '';
  options: string[] = [];
  dateOptions: string[] = [];
  showDropdown: boolean = false;

  constructor(private userAuthService:UserAuthService, private libraryService: LibraryService,private router :Router) { }

  ngOnInit() {

    this.userAuthService.getUserData().subscribe(
      res => {
        let anyUser: any;
        anyUser = res;
        this.userAuthService.getInfoByEmail(anyUser.email).subscribe(
          async (res: any) => {
            this.user = res;
            this.municipality = this.user.municipality;
            const role = await this.userAuthService.getUserRole().toPromise();
            
            this.libraryService.getBooks(this.municipality).subscribe((data: Book[]) => {
              this.books = data;
              this.books = this.books.filter(b => b.status != BookStatus.Unavailable);
              
              this.loadDateOptions();
            });


          }
        )
      });
    
  }

  get filteredBooks() {
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
    if (this.dateSearch !== '') {
      filteredList = filteredList.filter(book => book.publicationDate.toString().split("-")[0] === this.dateSearch);
    }

    return filteredList;
  }

  filterArray(array: string[], searchTerm: string): boolean {
    return array.some(item => item.toLowerCase().includes(searchTerm));
  }


  editBook(book: any) {
    this.router.navigateByUrl('/library/edit/' + book.book.id);
    console.log("Editar livro", book);
  }

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

  loadBooks() {
    this.libraryService.getBooks(this.municipality).subscribe((data: Book[]) => {
      this.books = data;
      this.books = this.books.filter(b => b.status != BookStatus.Unavailable)
    });
  }
  
  OpenFilterWindow() {
    this.filterWindow = !this.filterWindow;
  }

  loadDateOptions() {
    
      this.dateOptions =this.books.map(book => {
        return book.publicationDate.toString().split("-")[0];
      });
    
    console.log(this.dateOptions);
  }

}
