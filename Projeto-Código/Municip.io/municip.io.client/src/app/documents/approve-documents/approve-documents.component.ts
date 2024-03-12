import { Component } from '@angular/core';
import { DocumentsService, Document } from '../../services/documents.service';
import { UserAuthService } from '../../services/user-auth.service';
@Component({
  selector: 'app-approve-documents',
  templateUrl: './approve-documents.component.html',
  styleUrl: './approve-documents.component.css'
})
export class ApproveDocumentsComponent {

  documents: Document[] = [];
  municipalityImage: string = '';
  nameSearch: string = '';
  orderOptions: any[] = [{ label: 'Pedidos Antigos', value: true }, { label: 'Pedidos Recentes', value: false }];
  ascendingOrder: boolean = true;

  constructor(private service: DocumentsService, private authService: UserAuthService) {
    this.documents = this.service.documents;
  }


  ngOnInit(): void {
    this.sortEventsByDate();
    this.authService.getUserData().subscribe((user) => {
      this.authService.getInfoByEmail(user.email).subscribe((account) => {
        this.authService.getInfoMunicipality(account.municipality).subscribe((municipality) => {
          this.municipalityImage = municipality.landscapePhoto;
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
