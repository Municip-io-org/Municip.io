import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book, BookRequest, BookRequestStatus, LibraryService } from '../../../services/library/library.service';
import { Data, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter, DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-requested-book-card',
  templateUrl: './requested-book-card.component.html',
  styleUrl: './requested-book-card.component.css',
  providers: [provideNativeDateAdapter()],
})
export class RequestedBookCardComponent {
  @Input() bookRequest!: BookRequest;
  book!: Book;

  isDialogOpen = false;


  @Output() update = new EventEmitter();

  //set min date to tomorrow
  minDate = new Date();


  borrowForm: FormGroup = new FormGroup({
    returnDate: new FormControl(new Date(), Validators.required)
  });

  get returnDate() {
    return this.borrowForm.get('returnDate') as FormControl;
  }


  constructor(private router: Router, private bookService: LibraryService, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('pt');
  }


  ngOnInit(): void {
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.borrowForm.get('returnDate')?.setValue(this.minDate);


    this.book = this.bookRequest.book;

    if (this.bookRequest.status === BookRequestStatus.Reserved) {
      //if it pass the 2h limit, the request is denied
      this.isReservationExpired();
    }
    else if (this.bookRequest.status === BookRequestStatus.Borrowed) {
      this.isRequestDelayed();
    }


  }

  isReservationExpired() {
    var hoursLimit = 2 * 60 * 60 * 1000;
    if (new Date().getTime() - new Date(this.bookRequest.reservedDate!).getTime() > hoursLimit) {
      this.bookService.deleteRequest(this.bookRequest.id).subscribe(
        (data) => {
          console.log(data);
          this.update.emit();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  isRequestDelayed() {
    //check if the return date is expired
    if (new Date().getTime() > new Date(this.bookRequest.returnDate!).getTime()) {
      this.bookService.delayRequest(this.bookRequest.id).subscribe(
        (data) => {
          console.log(data);
          this.update.emit();
        },
        (error) => {
          console.error(error);
        }
      );
    }

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


  borrowBook() {
    let date = new Date(this.borrowForm.get('returnDate')?.value);
    this.bookService.borrowBook(this.bookRequest.id, date).subscribe(
      (data) => {
        console.log(data);
        this.update.emit();
      },
      (error) => {
        console.error(error);
      }
    )
  }


  deliverBook() {
    this.bookService.deliverBook(this.bookRequest.id).subscribe(
      (data) => {
        console.log(data);
        this.update.emit();
      },
      (error) => {
        console.error(error);
      }
    )
  }

  denyRequest() {
    this.bookService.denyRequest(this.bookRequest.id).subscribe(

      (data) => {
        console.log(data);
        this.update.emit();
      },
      (error) => {
        console.error(error);
      }

    )
  }


  closeDialog() {
    this.isDialogOpen = false;
  }

  openDialog() {
    this.isDialogOpen = true;
  }




  getTimeLeft(date: Date): string {
    let newDate = new Date(date);
    newDate.setHours(newDate.getHours() + 2);
    let diff = newDate.getTime() - new Date().getTime();
    let hours = Math.floor(diff / 1000 / 60 / 60);
    let minutes = Math.floor(diff / 1000 / 60) - (hours * 60);

    if (hours === 0) {
      return `${minutes}min`;
    } else {
      return `${hours}h ${minutes}min`;
    }
  }
}
