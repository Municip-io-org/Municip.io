import { Component, Input, SimpleChanges } from '@angular/core';
import { Citizen } from '../../services/citizen-auth.service';
import { AdminStatisticsService } from '../../services/stats/admin-statistics.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-age-chart',
  templateUrl: './age-chart.component.html',
  styleUrl: './age-chart.component.css'
})

/**
 * @class AgeChartComponent
 *
 * Este componente é responsável por exibir um gráfico de idades dos cidadãos.
 * 
 * @input citizens - A lista de cidadãos.
 *
 * @returns A pie chart with the age distribution of citizens.
 *
 **/
export class AgeChartComponent {
  @Input() citizens: Citizen[] = [];
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
    const xValues = ["0-17", "18-29", "30-49", "50-64", "65+"];
    const yValues = [this.getAgeCount(this.arrangeAges(), "0-17"), this.getAgeCount(this.arrangeAges(), "18-29"), this.getAgeCount(this.arrangeAges(), "30-49"), this.getAgeCount(this.arrangeAges(), "50-64"), this.getAgeCount(this.arrangeAges(), "65+")];
    const barColors = ["#334CFF", "#FF69B4", "#FFA07A", "#FFD700", "#FF6347"];

    const chartElement = document.getElementById('ageChart') as HTMLCanvasElement;
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
          animation: false // Ensure animation is disabled
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
      const yValues = [this.getAgeCount(this.arrangeAges(), "0-17"), this.getAgeCount(this.arrangeAges(), "18-29"), this.getAgeCount(this.arrangeAges(), "30-49"), this.getAgeCount(this.arrangeAges(), "50-64"), this.getAgeCount(this.arrangeAges(), "65+")];
      this.chart.data.datasets[0].data = yValues;
      this.chart.update();
    }
  }

  /**
   * Este método é responsável por organizar as idades dos cidadãos em grupos.
   * 
   * @returns  As idades dos cidadãos organizadas em grupos.
   */
  arrangeAges() {
    let ages = this.citizens.map(citizen => {
      let age = new Date().getFullYear() - new Date(citizen.birthDate).getFullYear();
      if (age <= 17) {
        return "0-17";
      } else if (age <= 29) {
        return "18-29";
      } else if (age <= 49) {
        return "30-49";
      } else if (age <= 64) {
        return "50-64";
      } else {
        return "65+";
      }
    });

    return ages;
  }


  /**
   * Este método é responsável pela contagem das idades dos cidadãos.
   * 
   * @returns a contagem das idades dos cidadãos.
   *
   **/
  getAgeCount(ages: string[], ageGroup: string) {
    return ages.filter(age => age === ageGroup).length;
  }
}
