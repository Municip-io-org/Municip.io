import { Component } from '@angular/core';
import { Roles, UserAuthService } from '../../services/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book, BookStatus, LibraryService } from '../../services/library/library.service';
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


    isRemoveBookDialogOpen: boolean = false;
    dialogTitle: string = '';
    dialogMessage: string = '';


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



  goToEditBookPage() {
    this.router.navigateByUrl("library/create");
  }

  openRemoveBookDialog() {
    this.isRemoveBookDialogOpen = true;
    this.dialogTitle = 'Deseja apagar o evento ' + this.book.title + '?';
    this.dialogMessage = 'Confirme a sua ação';
  }

  closeRemoveEventDialog() {
    this.isRemoveBookDialogOpen = false;
  }
}
