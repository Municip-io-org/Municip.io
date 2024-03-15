import { Component } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { DocsService, RequestDocument } from '../../services/documents/docs.service';

@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.component.html',
  styleUrl: './my-documents.component.css'
})
export class MyDocumentsComponent {

  documents: RequestDocument[] = [];
  municipalityImage: string = '';
  nameSearch: string = '';
  orderOptions: any[] = [{ label: 'Mais antigo', value: true }, { label: 'Mais Recente', value: false }];
  ascendingOrder: boolean = true;

  constructor(private service: DocsService, private authService: UserAuthService) {
    
  }



  ngOnInit(): void {
    this.sortEventsByDate();
    this.authService.getUserData().subscribe((user) => {
      this.authService.getInfoByEmail(user.email).subscribe((account) => {
        this.authService.getInfoMunicipality(account.municipality).subscribe((municipality) => {
          this.municipalityImage = municipality.landscapePhoto;

          this.service.getRequestsFromCitizen(user.email).subscribe(
            (docRes: any) => {
              this.documents = docRes as RequestDocument[];

            },
            error => {
              console.error(error);
            }
          );
        });
      });

    });

  }

  get filteredDocuments() {
    return this.documents.filter(e => e.name.toLowerCase().includes(this.nameSearch.toLowerCase()));
  }

  toggleSortOrder() {

    this.sortEventsByDate();
  }

  sortEventsByDate() {
    //sort events by date
    this.documents.sort((a, b) => {
      if (this.ascendingOrder) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  }

}
