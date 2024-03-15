import { Component } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { DocsService, RequestDocument } from '../../services/documents/docs.service';
@Component({
  selector: 'app-approve-documents',
  templateUrl: './approve-documents.component.html',
  styleUrl: './approve-documents.component.css'
})
export class ApproveDocumentsComponent {

  documents: RequestDocument[] = [];
  municipalityImage: string = '';
  nameSearch: string = '';
  orderOptions: any[] = [{ label: 'Pedidos Antigos', value: true }, { label: 'Pedidos Recentes', value: false }];
  ascendingOrder: boolean = true;

  constructor(private service: DocsService, private authService: UserAuthService) {
    
  }


  ngOnInit(): void {
    this.sortEventsByDate();
    this.authService.getUserData().subscribe((user) => {
      this.authService.getInfoByEmail(user.email).subscribe((account) => {
        this.authService.getInfoMunicipality(account.municipality).subscribe((municipality) => {
          this.municipalityImage = municipality.landscapePhoto;

         

          this.service.getRequestsFromMunicipality(municipality.name).subscribe(
            (res: RequestDocument[]) => {
              this.documents = res;

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
    return this.documents.filter(e => e.Name.toLowerCase().includes(this.nameSearch.toLowerCase()));
  }

  toggleSortOrder() {

    this.sortEventsByDate();
  }

  sortEventsByDate() {
    //sort events by date
    this.documents.sort((a, b) => {
      if (this.ascendingOrder) {
        return new Date(a.Date).getTime() - new Date(b.Date).getTime();
      } else {
        return new Date(b.Date).getTime() - new Date(a.Date).getTime();
      }
    });
  }

}
