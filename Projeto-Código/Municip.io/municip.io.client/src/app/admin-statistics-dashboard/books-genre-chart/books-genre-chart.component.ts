import { Component, Input, SimpleChanges } from '@angular/core';
import { Book } from '../../services/library/library.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-books-genre-chart',
  templateUrl: './books-genre-chart.component.html',
  styleUrl: './books-genre-chart.component.css'
})
  /**
   * @class BooksGenreChartComponent
   *
   * Este componente é responsável por exibir um gráfico de géneros de livros.
   *
   * @input books - A lista de livros.
   *
   * @returns Um piechart com a distribuição de géneros de livros.
   *
   */
export class BooksGenreChartComponent {
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
    if (changes['books'] && !changes['books'].firstChange) {
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
    const allGenres = this.getAllGenres(); // Get all genres from books
    const xValues = Array.from(new Set(allGenres)); // Get unique genres
    const yValues = xValues.map(genre => this.getGenreCount(genre)); // Count occurrences for each genre
    const barColors = ["#334CFF", "#FF69B4", "#FFA07A", "#FFD700", "#FF6347"];

    const chartElement = document.getElementById('booksgenre') as HTMLCanvasElement;

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
        options: {
          animation: false 
        }
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
      const allGenres = this.getAllGenres();
      const xValues = Array.from(new Set(allGenres));
      const yValues = xValues.map(genre => this.getGenreCount(genre));
      this.chart.data.datasets[0].data = yValues;
      this.chart.update();
    }
  }

   /**
    * Este método é responsável por obter todos os géneros de livros.
    * 
    * @returns A lista de géneros de livros.
    *
    **/
  getAllGenres(): string[] {
    return this.books.reduce((acc, book) => [...acc, ...book.genre], [] as string[]);
  }

  /**
   * Este método é responsável por obter o número de ocorrências de um género.
   * 
   * @param genre - O género.
   * 
   * @returns O número de ocorrências do género.
   *
   **/
  getGenreCount(genre: string): number {
    return this.getAllGenres().filter(g => g === genre).length;
  }
}
