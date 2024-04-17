import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { Book, BookRequest, BookRequestStatus, BookStatus, LibraryService } from '../../../services/library/library.service';
import { Roles, UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-library-card',
  templateUrl: './library-card.component.html',
  styleUrl: './library-card.component.css'
})
export class LibraryCardComponent {
  @Input() book: Book = {
    "title": "",
    "author": [],
    "publisher": "",
    "isbn": "",
    "genre": [""],
    "sinopsis": "",
    "coverImage": "",
    "language": "",
    "edition": "",
    "publicationDate": new Date("2001-06-26"), // Convert string to Date object
    "copies": 10,
    "availableCopies": 10,
    "status": 0,
    "municipality": "London"
  };

  @Input() isMunAdmin: boolean = false;

  @Output() bookClick = new EventEmitter();
  @Output() deleteid = new EventEmitter<number>();
  @Output() editid = new EventEmitter<number>();


  isRemoveBookWarningDialogOpen: boolean = false;
  hasActiveRequest: boolean = false;

  constructor(private bookService: LibraryService, private userAuthService: UserAuthService) { }


  async ngOnInit() {
    const userRole = await this.userAuthService.getUserRole().toPromise();

    if (userRole!.role === Roles.Municipal) {
      this.isMunAdmin = true;

      this.bookService.getRequestsByBookId(this.book.id!).subscribe(requests => {
        requests.forEach((request: BookRequest) => {
          if (request.status !== BookRequestStatus.Denied
            && request.status !== BookRequestStatus.Delivered) {

            this.hasActiveRequest = true;
          }
        });
      }

      )
    }


  }


  getStatusClass(): string {
    if (this.book.status === BookStatus.Available) {
      return 'bg-[#08BC25] text-[#1D8702]';
    } else if (this.book.availableCopies == 0) {
      return 'bg-[#FF0000] text-[#B02121]';
    } else {
      return 'bg-[#F4A42C] text-[#9B4F08]';
    }

  }

  getStatusString(status: BookStatus): string {
    return this.bookService.statusToString(status)
  }

  deleteCurrent(book: any) {

    this.deleteid.emit(book);
    console.log("Apagar livro", book);
  }

  editCurrent(book: any) {
    this.editid.emit(book);
    console.log("Editar livro", book);
  }

  bookClicked() {
    this.bookClick.emit();
  }

  closeRemoveBookWarningDialog() {
    this.isRemoveBookWarningDialogOpen = false;
  }

  openRemoveBookWarningDialog() {
    this.isRemoveBookWarningDialogOpen = true;
  }


  /**
   * Método para verificar se pode remover um livro
   */
  canRemoveBook(book: any) {
    if (!this.hasActiveRequest) {
      this.deleteCurrent(book);
    } else {
      this.openRemoveBookWarningDialog();
    }
  }



}
