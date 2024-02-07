import { Component } from '@angular/core';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent {


    sortType = 'name'; 
    sortReverse = false;  
  nameSearch: string = '';

    
    municipalities = [
      { id: 1, name: 'Trofa', numberOfUsers: 570, date: new Date('10-10-2021'), status: 'Aprovado' },
      { id: 2, name: 'Setúbal', numberOfUsers: 230, date: new Date('6-5-2021'), status: 'Por Aprovar' },
      { id: 3, name: 'Montijo', numberOfUsers: 675, date: new Date('10-10-2021'), status: 'Aprovado' },
{ id: 4, name: 'Lisboa', numberOfUsers: 100, date: new Date('05-25-2022'), status: 'Por Aprovar' },
      { id: 5, name: 'Porto', numberOfUsers: 150, date: new Date('7-5-2023'), status: 'Aprovado' },
      { id: 6, name: 'Braga', numberOfUsers: 300, date: new Date('6-21-2021'), status: 'Por Aprovar' },
      { id: 7, name: 'Faro', numberOfUsers: 200, date: new Date('2-17-2023'), status: 'Aprovado' },
      { id: 8, name: 'Aveiro', numberOfUsers: 400, date: new Date('8-05-2022'), status: 'Aprovado' },
      { id: 9, name: 'Coimbra', numberOfUsers: 500, date: new Date('9-04-2022'), status: 'Aprovado' },
      { id: 10, name: 'Viana do Castelo', numberOfUsers: 600, date: new Date('10-01-2022'), status: 'Por Aprovar' }
    ];

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
}



