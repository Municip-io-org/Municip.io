import { Component, Input, SimpleChanges } from '@angular/core';
import { Book, BookRequest, BookRequestStatus } from '../../services/library/library.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-borrowed-books-chart',
  templateUrl: './borrowed-books-chart.component.html',
  styleUrl: './borrowed-books-chart.component.css'
})
/**
 * @class BorrowedBooksChartComponent
 *
 * Este componente é responsável por exibir um gráfico de livros requisitados.
 *
 * @input borrowedbooks - A lista de livros requisitados.
 * @input books - A lista de livros.
 *
 * @returns Um piechart com a distribuição de livros requisitados.
 *
 */
export class BorrowedBooksChartComponent {
  @Input() borrowedbooks: BookRequest[] = [];
  @Input() books: Book[] = [];
  chart: Chart<'pie', number[], string> | undefined;


  constructor() { }

  /**
   * Este método é responsável por criar o gráfico.
   * 
   * @returns O gráfico.
   *
   **/
  ngOnInit() {
    this.createChart();
  }

  /**
   * Este método é responsável por atualizar o gráfico.
   *
   * @returns O gráfico atualizado.
   *
   **/
  ngOnChanges(changes: SimpleChanges) {
    if (changes['borrowedbooks'] && !changes['borrowedbooks'].firstChange) {
      this.updateChart();
    }
  }

  /**
   * Este método é responsável por criar o gráfico.
   * 
   * @returns O gráfico.
   *
   **/
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

  /**
   * Este método é responsável por atualizar o gráfico.
   *
   * @returns O gráfico atualizado.
   *
   **/
  updateChart() {
    if (this.chart) {
      const yValues = this.getBorrowedCount();
      this.chart.data.datasets[0].data = yValues;
      this.chart.update();
    }
  }


  /**
   * Este método é responsável por contar livros requisitados.
   * 
   * @returns A contagem de livros requisitados.
   *
   **/
  getBorrowedCount(): number[] {
    const countBorrowed = this.borrowedbooks.filter(borrowed => borrowed.status === BookRequestStatus.Borrowed).length;
    const countTotal = this.books.filter(book => book.availableCopies > 0).length;
    return [countTotal, countBorrowed];
  }
}
