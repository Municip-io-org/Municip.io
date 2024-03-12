import { Component } from '@angular/core';
import { MunicipalityStatusService } from '../../services/municipality-status.service';
import { Municipality } from '../../services/municipal-admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent {


  sortType = 'name';
  sortReverse = false;
  nameSearch: string = '';
  municipalities: any[] = [];


  constructor(private municipalityStatusService: MunicipalityStatusService, private router: Router,
  ) { }

  ngOnInit() {
    this.municipalityStatusService.getMunicipalities().subscribe((municipalities: any) => {
      this.municipalities = municipalities;
    });
  }

  approveMunicipality(name: any) {
    this.municipalityStatusService.approveMunicipality(name).subscribe((municipalities: any) => {
      this.municipalities = municipalities;
    });
  }

  deleteMunicipality(name: any) {
    this.municipalityStatusService.deleteMunicipality(name).subscribe((municipalities: any) => {
      this.municipalities = municipalities;
    })
  }


  sortTable(column: string): void {
    if (this.sortType === column) {

      this.sortReverse = !this.sortReverse;
    } else {

      this.sortType = column;
      this.sortReverse = false;
    }


    this.municipalities.sort((a: any, b: any) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === 'string') {
        return this.sortString(valueA, valueB);
      } else {
        return this.sortNumeric(valueA, valueB);
      }
    });
  }

  get filteredMunicipalities() {
    return this.municipalities.filter(m => m.name.toLowerCase().includes(this.nameSearch.toLowerCase()));
  }

  private sortString(a: string, b: string): number {
    return a.localeCompare(b) * (this.sortReverse ? -1 : 1);
  }

  private sortNumeric(a: number, b: number): number {
    return (a - b) * (this.sortReverse ? -1 : 1);
  }


  sendToPage(municipality: Municipality) {
    this.router.navigate(['/admindashboard/', municipality.name]);
  }
}



