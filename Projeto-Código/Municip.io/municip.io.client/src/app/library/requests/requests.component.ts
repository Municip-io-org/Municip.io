import { Component } from '@angular/core';
import { BookRequest, BookRequestStatus, LibraryService } from '../../services/library/library.service';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent {

  booksRequested: BookRequest[] = [];
  municipalityImage: string = '';
  nameSearch: string = '';
  orderOptions: any[] = [{ label: 'Mais antigo', value: true }, { label: 'Mais Recente', value: false }];
  ascendingOrder: boolean = true;

  constructor(private service: LibraryService, private authService: UserAuthService) {

  }



  ngOnInit(): void {
    this.authService.getUserData().subscribe((user) => {
      this.authService.getInfoByEmail(user.email).subscribe((account) => {
        this.authService.getInfoMunicipality(account.municipality).subscribe((municipality) => {
          this.municipalityImage = municipality.landscapePhoto;

          //this.service.getRequestsFromCitizen(user.email).subscribe(
          //  (docRes: any) => {
          //    this.documents = docRes as RequestDocument[];

          //  },
          //  error => {
          //    console.error(error);
          //  }
          //);
          this.service.getRequests().subscribe(
            (requests) => {
              this.booksRequested = requests;
              this.sortEventsByDate();
            },
            (error) => {
              console.error(error);
            }
          );
        });
      });

    });

  }

  get filteredBooks() {
    return this.booksRequested.filter(b => b.book.title.toLowerCase().includes(this.nameSearch.toLowerCase()) && b.status !== BookRequestStatus.Delivered && b.status !== BookRequestStatus.Denied
    );
  }

  toggleSortOrder() {

    this.sortEventsByDate();
  }

  sortEventsByDate() {
    //sort events by date

    this.booksRequested.sort((a, b) => {
      if (this.ascendingOrder) {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
  }


}
