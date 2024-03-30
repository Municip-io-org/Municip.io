import { Component } from '@angular/core';
import { Roles, UserAuthService } from '../../services/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book, BookStatus, BookRequest, LibraryService, BookRequestStatus } from '../../services/library/library.service';
import { Municipality } from '../../services/municipal-admin-auth.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.css'
})
export class BookPageComponent {


  book: Book = {
    id:0,
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
  isBookReserved: boolean = false;

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


  constructor(private userAuthService: UserAuthService, private activatedRoute: ActivatedRoute, private router: Router, private libraryService: LibraryService) { }



  ngOnInit(): void {
    this.book = this.activatedRoute.snapshot.data['book'];

    this.userAuthService.getUserData().subscribe(
      res => {
        let anyUser: any;
        anyUser = res;
        this.userAuthService.getInfoByEmail(anyUser.email).subscribe(
          async (res: any) => {
            this.user = res;


            const userRole = await this.userAuthService.getUserRole().toPromise();
            if (userRole!.role === Roles.Municipal) {
              this.isMunAdmin = true;
            }

            this.userAuthService.getInfoMunicipality(this.user.municipality).subscribe(
              (municipalityRes: Municipality) => {
                this.municipality = municipalityRes;



                this.libraryService.getRequestsByCitizen(this.user.email).subscribe(
                  (bookRequestsRes: BookRequest[]) => {
                    bookRequestsRes.forEach(br => {

                      //se o livro da página estiver reservado ativa a flag
                      if (br.status == BookRequestStatus.Reserved && br.book.id == this.book.id) {
                        this.isBookReserved = true;
                      }

                    })
                  }
                )


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

  reserveBook() {
    //TODO
  }

  cancelBookReserve() {
    //TODO
  }

  goToEditBookPage() {
    this.router.navigateByUrl("library/create");
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
          this.router.navigateByUrl(`/library/create`);
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
  }

  closeDialog() {
    this.isDialogOpen = false;
    window.location.reload();
  }
}
