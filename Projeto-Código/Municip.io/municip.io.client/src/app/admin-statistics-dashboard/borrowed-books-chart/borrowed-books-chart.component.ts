import { Component, Input, SimpleChanges } from '@angular/core';
import { Book, BookRequest, BookRequestStatus } from '../../services/library/library.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-borrowed-books-chart',
  templateUrl: './borrowed-books-chart.component.html',
  styleUrl: './borrowed-books-chart.component.css'
})
export class BorrowedBooksChartComponent {
  @Input() borrowedbooks: BookRequest[] = [];
  @Input() books: Book[] = [];
  chart: Chart<'pie', number[], string> | undefined;


  constructor() { }

  ngOnInit() {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['borrowedbooks'] && !changes['borrowedbooks'].firstChange) {
      this.updateChart();
    }
  }

  createChart() {
    const xValues = ["Disponíveis", "Requisitados"];
    const yValues = this.getBorrowedCount(); // Count occurrences for each genre
    const barColors = ["#334CFF", "#FF69B4", "#FFA07A", "#FFD700", "#FF6347"];

    const chartElement = document.getElementById('borrowedbooks') as HTMLCanvasElement;

    if (chartElement) {
      this.chart = new Chart(chartElement, {
        type: 'pie',
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {}
      });
    }
  }

  updateChart() {
    if (this.chart) {
      const yValues = this.getBorrowedCount();
      this.chart.data.datasets[0].data = yValues;
      this.chart.update();
    }
  }


  getBorrowedCount(): number[] {
    const countBorrowed = this.borrowedbooks.filter(borrowed => borrowed.status === BookRequestStatus.Borrowed).length;
    const countTotal = this.books.filter(book => book.availableCopies > 0).length;
    return [countTotal, countBorrowed];
  }


}
