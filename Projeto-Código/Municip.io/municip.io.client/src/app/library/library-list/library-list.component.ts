import { Component } from '@angular/core';
import { Book, LibraryService } from '../../services/library/library.service';

import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrl: './library-list.component.css'
})
export class LibraryListComponent {

  books: Book[] = [];
    //{
    //  "title": "Harry Potter and the Philosopher's Stone",
    //  "author": ["J.K. Rowling"],
    //  "publisher": "Bloomsbury",
    //  "isbn": "9780747532699",
    //  "genre": ["Fantasy"],
    //  "sinopsis": "The story of a young wizard, Harry Potter, and his adventures at Hogwarts School of Witchcraft and Wizardry.",
    //  "coverImage": "https://example.com/harry_potter_cover.jpg",
    //  "language": "English",
    //  "edition": "1st",
    //  "publicationDate": new Date("2001-06-26"), // Convert string to Date object
    //  "copies": 10,
    //  "availableCopies": 10,
    //  "status": 0,
    //  "municipality": "London"
    //},
    //{
    //  "title": "Harry Potter and the Philosopher's Stone",
    //  "author": ["J.K. Rowling"],
    //  "publisher": "Bloomsbury",
    //  "isbn": "9780747532699",
    //  "genre": ["Romance"],
    //  "sinopsis": "The story of a young wizard, Harry Potter, and his adventures at Hogwarts School of Witchcraft and Wizardry.",
    //  "coverImage": "https://example.com/harry_potter_cover.jpg",
    //  "language": "English",
    //  "edition": "1st",
    //  "publicationDate": new Date("2001-06-26"), // Convert string to Date object
    //  "copies": 10,
    //  "availableCopies": 10,
    //  "status": 0,
    //  "municipality": "London"
    //},
    //{
    //  "title": "Harry Potter and the Philosopher's Stone",
    //  "author": ["J.K. Rowling","JKROLLING22222"],
    //  "publisher": "Bloomsbury",
    //  "isbn": "9780747532699",
    //  "genre": ["Terror"],
    //  "sinopsis": "The story of a young wizard, Harry Potter, and his adventures at Hogwarts School of Witchcraft and Wizardry.",
    //  "coverImage": "https://example.com/harry_potter_cover.jpg",
    //  "language": "English",
    //  "edition": "1st",
    //  "publicationDate": new Date("2001-06-26"), // Convert string to Date object
    //  "copies": 10,
    //  "availableCopies": 10,
    //  "status": 1,
    //  "municipality": "London"
    //}
  
  nameSearch: string = '';
    user: any;
    municipality: any;
  

  constructor(private userAuthService:UserAuthService, private libraryService: LibraryService) { }

  ngOnInit() {

    this.userAuthService.getUserData().subscribe(
      res => {
        let anyUser: any;
        anyUser = res;
        this.userAuthService.getInfoByEmail(anyUser.email).subscribe(
          async (res: any) => {
            this.user = res;
            this.municipality = this.user.municipality;

            this.libraryService.getBooks(this.municipality).subscribe((data: Book[]) => {
              this.books = data;
              console.log(this.books);
            });
            this.libraryService.getBooks("Almada").subscribe((data: Book[]) => {
              this.books = data;

            });
          }
        )
      });
  }

  get filteredBooks() {
    if (this.nameSearch == '') return this.books;
    return this.books.filter(e => e.title.toLowerCase().includes(this.nameSearch.toLowerCase()));
  }

  
}
