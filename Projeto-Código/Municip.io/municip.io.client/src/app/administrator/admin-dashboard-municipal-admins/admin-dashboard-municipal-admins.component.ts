import { Component } from '@angular/core';
import { MunicipalityStatusService } from '../../services/municipality-status.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard-municipal-admins',
  templateUrl: './admin-dashboard-municipal-admins.component.html',
  styleUrl: './admin-dashboard-municipal-admins.component.css'
})
export class AdminDashboardMunicipalAdminsComponent {


  sortType = 'firstName';
  sortReverse = false;
  nameSearch: string = '';
  admins: any[] = [];
  municipalName = 'Inicial';
  isDialogOpen: boolean = false;
  selectedUser: any;

  constructor(private municipalityStatusService: MunicipalityStatusService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.municipalName = this.route.snapshot.params['municipalName'];
    this.municipalityStatusService.getMunicipalAdmins(this.municipalName).subscribe((admins: any) => {
      this.admins = admins;
    });

  }

  openDialog(user: any) {
    this.selectedUser = user;
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }


  approveAdmin(email: any) {
    this.municipalityStatusService.approveMunicipalAdmin(email).subscribe((admins: any) => {
      this.admins = admins;

    });
  }

  blockAdmin(email: any) {
    this.municipalityStatusService.blockMunicipalAdmin(email).subscribe((admins: any) => {
      this.admins = admins;
    })
  }




  deleteAdmin(email: any) {
    this.municipalityStatusService.deleteMunicipalAdmin(email).subscribe((admins: any) => {
      this.admins = admins;
    })
  }




  sortTable(column: string): void {
    if (this.sortType === column) {

      this.sortReverse = !this.sortReverse;
    } else {

      this.sortType = column;
      this.sortReverse = false;
    }


    this.admins.sort((a: any, b: any) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === 'string') {
        return this.sortString(valueA, valueB);
      } else {
        return this.sortNumeric(valueA, valueB);
      }
    });
  }

  get filteredAdmins() {
    return this.admins.filter(m => m.firstName.toLowerCase().includes(this.nameSearch.toLowerCase()));
  }

  private sortString(a: string, b: string): number {
    return a.localeCompare(b) * (this.sortReverse ? -1 : 1);
  }

  private sortNumeric(a: number, b: number): number {
    return (a - b) * (this.sortReverse ? -1 : 1);
  }


  goBack() {
    this.router.navigate(['/admindashboard']);
  }
}
