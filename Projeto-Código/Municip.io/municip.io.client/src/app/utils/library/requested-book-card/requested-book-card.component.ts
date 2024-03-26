import { Component, Input } from '@angular/core';
import { Book, BookRequest, BookRequestStatus, LibraryService } from '../../../services/library/library.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requested-book-card',
  templateUrl: './requested-book-card.component.html',
  styleUrl: './requested-book-card.component.css'
})
export class RequestedBookCardComponent {
  @Input() bookRequest!: BookRequest;
  book!: Book;
  constructor(private router: Router, private bookService: LibraryService) { }


  ngOnInit(): void {
    this.book = this.bookRequest.book;
  }

  /**
   * Estilos diferentes para cada estado do documento
   * @returns
   */
  getStatusClass(): string {

    if (this.bookRequest.status === BookRequestStatus.Delivered) {
      return 'bg-[#08BC25] text-[#1D8702]';
    } else if (this.bookRequest.status === BookRequestStatus.Reserved) {
      return 'bg-[#F4A42C] text-[#9B4F08]';
    } else if (this.bookRequest.status === BookRequestStatus.Borrowed) {
      return 'bg-[#1E90FF] text-[#0E4F71]';
    } else {
      return 'bg-[#FF0000] text-[#B02121]';
    }
  }


  getStatusString(status: BookRequestStatus): string {
    return this.bookService.bookRequestStatusToString(status)
  }

  BookRequestStatus() {
    return BookRequestStatus;
  }


  //generatePDF() {
  //  this.documentService.document = this.document;

  //  this.router.navigate(['/documents/generate-pdf']);

  //}


  /**
   * Abre na mesma janela o pagamento
   */
  //goToPayment() {
  //  window.open(this.document.paymentUrl, '_self');
  //}

}
