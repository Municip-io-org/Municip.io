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
  filterWindow: boolean = true;
  isbnSearch: string = '';
  authorSearch: string = '';
  dateSearch: string = '';
  genreSearch: string = '';

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
              this.books = this.books.filter(b => b.status != BookStatus.Unavailable)
            });
            
          }
        )
      });
  }

  get filteredBooks() {
    if (this.nameSearch == '') return this.books;
    return this.books.filter(e => e.title.toLowerCase().includes(this.nameSearch.toLowerCase()));
  }

  editBook(book: any) {
    this.router.navigateByUrl('/library/edit/' + book.book.id);
    console.log("Editar livro", book);
  }

  deleteBook(book: any) {    
    this.libraryService.removeBook(book.book.id).subscribe(
      (res) => {
        console.log("Livro apagado com sucesso", res);
        this.books = this.books.filter(e => e.isbn !== book.isbn);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  OpenFilterWindow() {
    this.filterWindow = !this.filterWindow;
  }
}
