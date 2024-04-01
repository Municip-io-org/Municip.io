import { Component, Input, input } from '@angular/core';
import { Book, BookStatus, LibraryService } from '../../../services/library/library.service';

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


  constructor(private bookService: LibraryService) { }

  getStatusClass(): string {
    if (this.book.status === BookStatus.Available) {
      return 'bg-[#08BC25] text-[#1D8702]';
    } else if (this.book.status === BookStatus.Unavailable) {
      return 'bg-[#FF0000] text-[#B02121]';
    } else {
      return 'bg-[#F4A42C] text-[#9B4F08]';
    }
  }

  getStatusString(status: BookStatus): string {
    return this.bookService.statusToString(status)
  }
}
