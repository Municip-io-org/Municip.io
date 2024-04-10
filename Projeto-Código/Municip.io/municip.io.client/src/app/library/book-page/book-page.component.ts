import { Component } from '@angular/core';
import { Roles, UserAuthService } from '../../services/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book, BookStatus, BookRequest, LibraryService, BookRequestStatus } from '../../services/library/library.service';
import { Municipality } from '../../services/municipal-admin-auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.css',
  providers: [provideNativeDateAdapter()],
})
export class BookPageComponent {


  book: Book = {
    id: 0,
    isbn: '',
    title: '',
    author: [],
    availableCopies: 0,
    copies: 0,
    coverImage: '',
    edition: '',
    genre: [],
    language: '',
    publicationDate: new Date(),
    publisher: '',
    sinopsis: '',
    status: BookStatus.Available,
    municipality: ''
  }


  user: any;
  isMunAdmin: boolean = false;
  bookRequest?: BookRequest;

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


  isDialogOpen: boolean = false;
  isRemoveBookDialogOpen: boolean = false;
  dialogTitle: string = '';
  dialogMessage: string = '';
  isConfirmDialog: boolean = false;
  isReserveSuccesfull: boolean = false;

  citizenEmail: string = '';




  /// THIS IS FOR THE DETAIL PAGE OF BOOK
  isDialogOpenBorrow = false;

  borrowForm = new FormGroup({
    returnDate: new FormControl(new Date(), Validators.required),
    citizenEmail: new FormControl('', [Validators.required, Validators.email])
  })

  minDate = new Date();

  get citizenEmailControl() {
    return this.borrowForm.get('citizenEmail') as FormControl;
  }

  get returnDateControl() {
    return this.borrowForm.get('returnDate') as FormControl;
  }




  constructor(private userAuthService: UserAuthService, private activatedRoute: ActivatedRoute, private router: Router,
    private libraryService: LibraryService, private dateAdapter: DateAdapter<Date>) {

    this.dateAdapter.setLocale('pt');


  }



  ngOnInit(): void {
    this.book = this.activatedRoute.snapshot.data['book'];

    this.minDate.setDate(this.minDate.getDate() + 1);
    this.borrowForm.get('returnDate')?.setValue(this.minDate);





    this.userAuthService.getUserData().subscribe(
      res => {
        let anyUser: any;
        anyUser = res;
        this.userAuthService.getInfoByEmail(anyUser.email).subscribe(
          (res: any) => {
            this.user = res;

            this.userAuthService.getInfoMunicipality(this.user.municipality).subscribe(
              async (municipalityRes: Municipality) => {
                this.municipality = municipalityRes;


                const userRole = await this.userAuthService.getUserRole().toPromise();
                if (userRole!.role === Roles.Municipal) {
                  this.isMunAdmin = true;
                }



                if (userRole!.role === Roles.Citizen) {
                  this.citizenEmail = this.user.email;


                  this.libraryService.getRequestsByCitizen(this.user.email).subscribe(
                    (bookRequestsRes: BookRequest[]) => {
                      bookRequestsRes.forEach(br => {



                        if (br.book.id == this.book.id && br.status !== BookRequestStatus.Denied
                          && br.status !== BookRequestStatus.Delivered) {
                          this.bookRequest = br;


                          if (this.bookRequest.status === BookRequestStatus.Reserved) {
                            this.isReservationExpired();
                          }
                          else if (this.bookRequest.status === BookRequestStatus.Borrowed) {
                            this.isRequestDelayed();
                          }

                        }
                        return;

                      })
                    }
                  )
                }

              },
              error => {
                console.error(error);
              }
            );


          },
          error => {
            console.error(error);
          }
        );
      },
      error => {
        console.error(error);
      }
    );
  }

  isReservationExpired() {
    if (new Date().getTime() > new Date(this.bookRequest!.reservationLimitDate!).getTime()) {
      this.libraryService.deleteRequest(this.bookRequest!.id).subscribe(
        (data) => {
          console.log(data);
          this.updateRequest();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  isRequestDelayed() {
    //check if the return date is expired
    if (new Date().getTime() > new Date(this.bookRequest!.returnDate!).getTime()) {
      this.libraryService.delayRequest(this.bookRequest!.id).subscribe(
        (data) => {
          console.log(data);
          this.updateRequest();
        },
        (error) => {
          console.error(error);
        }
      );
    }

  }

  updateRequest() {

    this.libraryService.getBookById(this.book.id!).subscribe(
      (book) => {
        this.book = book;
      },
      (error) => {
        console.error(error);
      }
    );

    this.libraryService.getRequestsByCitizen(this.citizenEmail).subscribe(
      (requests) => {
        let requestFound = false;
        requests.forEach((request: BookRequest) => {
          if (request.book.id == this.book.id && request.status !== BookRequestStatus.Denied
            && request.status !== BookRequestStatus.Delivered) {
            this.bookRequest = request;
            requestFound = true;
          }
        });

        if (!requestFound) {
          this.bookRequest = undefined;
        }

      },
      (error) => {
        console.error(error);
      }
    );
  }



  canBeReserved() {
    if (this.isMunAdmin) return false;


    if (this.book.availableCopies <= 0) return false;

    return true;
  }

  reserveBook() {

    let reservedDate = new Date();


    if (this.book.copies > 0) {
      let bookRequest: BookRequest = {
        id: 0,
        book: this.book,
        citizen: this.user,
        status: BookRequestStatus.Reserved,
        municipality: this.municipality.name,
        reservedDate: reservedDate,
      }

      this.libraryService.createRequest(this.user.email, bookRequest).subscribe(
        (data) => {

          console.log(data);
          this.dialogTitle = 'Operação realizada com sucesso';
          this.dialogMessage = 'A sua reserva foi efetuada';
          this.isReserveSuccesfull = true;
          this.isDialogOpen = true;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  cancelBookReserve() {
    this.libraryService.deleteRequest(this.bookRequest!.id).subscribe(
      (data) => {
        console.log(data);
        this.successFullDialog();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  goToEditBookPage() {
    this.router.navigateByUrl(`library/edit/${this.book.id}`);
  }

  openRemoveBookDialog() {
    this.isRemoveBookDialogOpen = true;
    this.dialogTitle = 'Deseja apagar o livro ' + this.book.title + '?';
    this.dialogMessage = 'Confirme a sua ação';
  }

  removeBook() {
    this.closeRemoveBookDialog();

    this.libraryService.removeBook(this.book.id!).subscribe(
      response => {
        if (response && response.body) {
          
        } else {
          console.error('Resposta inválida do servidor após a remoção do livro:', response);

          this.dialogTitle = 'Erro na remoção do livro';
          this.dialogMessage = response?.body?.message || 'Ocorreu um erro ao processar a resposta do servidor.';
          this.isConfirmDialog = false;
          this.isDialogOpen = true;
        }
      },
      error => {
        console.error('Erro ao remover o livro:', error);

        this.dialogTitle = 'Erro na remoção do livro';
        this.dialogMessage = error?.message || 'Ocorreu um erro ao remover o livro.';
        this.isConfirmDialog = false;
        this.isDialogOpen = true;
      }
    );
  }





  closeRemoveBookDialog() {
    this.isRemoveBookDialogOpen = false;
    this.router.navigateByUrl(`/library/librarylist`);
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.updateRequest();
    
  }




  BookRequestStatus() {
    return BookRequestStatus;
  }

  getTimeLeft(date: Date): string {
    //it will receive the date limit, and will return the time left in hours and minutes
    let dateReceived = new Date(date);
    let now = new Date();
    let diff = dateReceived.getTime() - now.getTime();
    let hours = Math.floor(diff / 3600000);
    let minutes = Math.floor((diff % 3600000) / 60000);

    if (hours === 0) {
      return `${minutes}min`;
    } else {
      return `${hours}h ${minutes}min`;
    }
  }



  /**
   * Estilos diferentes para cada estado do documento
   * @returns
   */
  getStatusClass(): string {

    if (this.bookRequest!.status === BookRequestStatus.Delivered) {
      return 'bg-[#08BC25] text-[#1D8702]';
    } else if (this.bookRequest!.status === BookRequestStatus.Reserved) {
      return 'bg-[#F4A42C] text-[#9B4F08]';
    } else if (this.bookRequest!.status === BookRequestStatus.Borrowed) {
      return 'bg-[#1E90FF] text-[#0E4F71]';
    } else {
      return 'bg-[#FF0000] text-[#B02121]';
    }
  }


  getStatusString(status: BookRequestStatus): string {
    return this.libraryService.bookRequestStatusToString(status)
  }


  borrowBook() {
    let bookRequest: BookRequest = {
      id: 0,
      book: this.book,
      citizen: this.user,
      returnDate: new Date(),
      status: BookRequestStatus.Borrowed,
      municipality: this.municipality.name,

    }



    this.libraryService.createRequest(this.citizenEmailControl.value, bookRequest).subscribe(
      (data) => {
        let newBookRequest: BookRequest;
        this.libraryService.getRequestsByCitizen(this.citizenEmailControl.value).subscribe(
          (bookRequestsRes: BookRequest[]) => {
            bookRequestsRes.forEach(br => {
              if (br.status == BookRequestStatus.Borrowed && br.book.id == this.book.id) {
                newBookRequest = br;

                let date = new Date(this.returnDateControl.value);
                date.setHours(23, 59, 59, 999);
                this.libraryService.borrowBook(newBookRequest.id, date).subscribe(
                  (data) => {
                    console.log(data);
                    this.closeDialogBorrow();
                    this.successFullDialog();
                  },
                  (error) => {
                    console.error(error);
                  }
                );
                return;
              }
            })
          },
          (error) => {
            console.log(error)
          }
        )
      },
      (error) => {
        console.error(error);
        this.closeDialogBorrow();
        //show a dialog with the error
        this.dialogTitle = 'Erro ao reservar o livro';
        this.dialogMessage = error.error.message;
        this.isReserveSuccesfull = false;
        this.isDialogOpen = true;



      }
    );
  }

  successFullDialog() {
    this.dialogTitle = 'Operação realizada com sucesso';
    this.dialogMessage = 'Ação bem sucedida';
    this.isReserveSuccesfull = true;
    this.isDialogOpen = true;
  }

  openDialogBorrow() {
    this.isDialogOpenBorrow = true;
  }

  closeDialogBorrow() {
    this.isDialogOpenBorrow = false;
  }

}
