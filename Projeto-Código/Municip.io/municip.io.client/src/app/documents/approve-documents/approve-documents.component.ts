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
  municipalityName: string = '';

  constructor(private docsService: DocsService, private authService: UserAuthService) {

  }


  ngOnInit(): void {
    this.sortEventsByDate();
    this.authService.getUserData().subscribe((user) => {
      this.authService.getInfoByEmail(user.email).subscribe((account) => {
        this.authService.getInfoMunicipality(account.municipality).subscribe((municipality) => {
          this.municipalityImage = municipality.landscapePhoto;
          this.municipalityName = municipality.name;
          this.docsService.getRequestsFromMunicipality(municipality.name).subscribe(
            (res: RequestDocument[]) => {
              this.documents = res;
              console.log("bidsbca cia s", this.documents);
            },
            error => {
              console.error(error);
            }
          );

        });
      });

    });




    //this.sortEventsByDate();
    //this.authService.getUserData().subscribe((user) => {
    //  this.authService.getInfoByEmail(user.email).subscribe((account) => {
    //    this.authService.getInfoMunicipality(account.municipality).subscribe((municipality) => {
    //      this.municipalityImage = municipality.landscapePhoto;



    //      this.service.getRequestsFromMunicipality(municipality.name).subscribe(
    //        (res: RequestDocument[]) => {
    //          this.documents = res;

    //        },
    //        error => {
    //          console.error(error);
    //        }
    //      );
    //    });
    //  });

    //});

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

  waitPayment(doc: any) {
    
    this.docsService.waitingForPayment(doc.document.id).subscribe(
      (res) => {
       this.ngOnInit(); 
      },
      error => {
        console.error(error);
      }
    );
  }

  rejectDocument(doc: any) {
    this.docsService.rejectDocument(doc.document.id).subscribe(
      (res) => {
        this.ngOnInit();
      },
      error => {
        console.error(error);
      }
    );
  }
}
