import { Component } from '@angular/core';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent {


    sortType = 'name'; 
    sortReverse = false;  
    
    
    municipalities = [
      { id: 1, name: 'Trofa', numberOfUsers: 570, date: new Date(10 - 10 - 2021), status: 'Aprovado' },
      { id: 2, name: 'Setúbal', numberOfUsers: 230, date: new Date(6 - 5 - 2021), status: 'Por Aprovar' },
      { id: 3, name: 'Montijo', numberOfUsers: 675, date: new Date(10 - 10 - 2021), status: 'Aprovado' },
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

  private sortString(a: string, b: string): number {
    return a.localeCompare(b) * (this.sortReverse ? -1 : 1);
  }

  private sortNumeric(a: number, b: number): number {
    return (a - b) * (this.sortReverse ? -1 : 1);
  }
}



