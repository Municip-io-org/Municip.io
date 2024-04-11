import { Component, Input, SimpleChanges, input } from '@angular/core';
import { AdminStatisticsDashboardComponent } from '../admin-statistics-dashboard.component';
import { AdminStatisticsService } from '../../services/stats/admin-statistics.service';
import { Citizen } from '../../services/citizen-auth.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-gender-chart',
  templateUrl: './gender-chart.component.html',
  styleUrl: './gender-chart.component.css'
})
/**
 * @class GenderChartComponent
 *
 * Este componente é responsável por exibir um gráfico de géneros dos cidadãos.
 *
 * @input citizens - A lista de cidadãos.
 *
 * @returns Um piechart com a distribuição de géneros dos cidadãos.
 *
 */
export class GenderChartComponent {
  @Input() citizens: Citizen[] = [];
  chart: Chart<"pie", number[], string> | undefined; // Adjusted chart type to explicitly specify Chart type

  constructor(private adminStatisticsService: AdminStatisticsService) { }

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
    if (changes['citizens'] && !changes['citizens'].firstChange) {
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
    const xValues = ["Masculino", "Feminino", "Outro"];
    const genderCounts = this.getGenderCounts();
    const barColors = ["#334CFF", "#FF69B4", "#FFA07A"];

    const chartElement = document.getElementById('genderChart') as HTMLCanvasElement;
    if (chartElement) {
      this.chart = new Chart(chartElement, {
        type: 'pie',
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: genderCounts
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
      const genderCounts = this.getGenderCounts();
      this.chart.data.datasets[0].data = genderCounts;
      this.chart.update();
    }
  }

  /**
   * Este método é responsável por contar o número de géneros.
   * 
   * @returns O número de géneros.
   *
   **/
  getGenderCounts(): number[] {
    const countMale = this.citizens.filter(citizen => citizen.gender === "m").length;
    const countFemale = this.citizens.filter(citizen => citizen.gender === "f").length;
    const countOther = this.citizens.filter(citizen => citizen.gender === "o").length;
    return [countMale, countFemale, countOther];
  }
}
