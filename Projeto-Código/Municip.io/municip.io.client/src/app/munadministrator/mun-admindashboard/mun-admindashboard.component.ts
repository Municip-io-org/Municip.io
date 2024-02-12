import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitizenStatusService } from '../../services/citizen-status.service';
import { UserinfodialogComponent } from '../../utils/userinfodialog/userinfodialog.component';

@Component({
  selector: 'app-munadmindashboard',
  templateUrl: './mun-admindashboard.component.html',
  styleUrl: './mun-admindashboard.component.css'
})
export class MunAdmindashboardComponent {


  sortType = 'name';
  sortReverse = false;
  nameSearch: string = '';
  citizens: any[] = [];
  municipalName = 'Inicial';
  isDialogOpen: boolean = false;
  selectedUser: any;

  constructor(private citizenStatusService: CitizenStatusService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.municipalName = this.route.snapshot.params['municipalName'];
    this.citizenStatusService.getCitizens(this.municipalName).subscribe((citizens: any) => {
      this.citizens = citizens;
      console.log(this.citizens);

    });
  }

  openDialog(user: any) {
    console.log(user);
    this.selectedUser = user;
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }


  approveCitizen(email: any) {
    this.citizenStatusService.approveCitizen(email).subscribe((citizens: any) => {
      this.citizens = citizens;

    });
  }

  blockCitizen(email: any) {
this.citizenStatusService.blockCitizen(email).subscribe((citizens: any) => {
      this.citizens = citizens;
    })
  }




  deleteCitizen(email: any) {
this.citizenStatusService.deleteCitizen(email).subscribe((citizens: any) => {
      this.citizens = citizens;
    })
  }


  

  sortTable(column: string): void {
    if (this.sortType === column) {

      this.sortReverse = !this.sortReverse;
    } else {

      this.sortType = column;
      this.sortReverse = false;
    }


    this.citizens.sort((a: any, b: any) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === 'string') {
        return this.sortString(valueA, valueB);
      } else {
        return this.sortNumeric(valueA, valueB);
      }
    });
  }

  get filteredCitizens() {
    return this.citizens.filter(m => m.firstName.toLowerCase().includes(this.nameSearch.toLowerCase()));
  }

  private sortString(a: string, b: string): number {
    return a.localeCompare(b) * (this.sortReverse ? -1 : 1);
  }

  private sortNumeric(a: number, b: number): number {
    return (a - b) * (this.sortReverse ? -1 : 1);
  }
}





