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
export class GenderChartComponent {
  @Input() citizens: Citizen[] = [];
  chart: Chart<"pie", number[], string> | undefined; // Adjusted chart type to explicitly specify Chart type

  constructor(private adminStatisticsService: AdminStatisticsService) { }

  ngOnInit() {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['citizens'] && !changes['citizens'].firstChange) {
      this.updateChart();
    }
  }


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

  updateChart() {
    if (this.chart) {
      const genderCounts = this.getGenderCounts();
      this.chart.data.datasets[0].data = genderCounts;
      this.chart.update();
    }
  }

  getGenderCounts(): number[] {
    const countMale = this.citizens.filter(citizen => citizen.gender === "m").length;
    const countFemale = this.citizens.filter(citizen => citizen.gender === "f").length;
    const countOther = this.citizens.filter(citizen => citizen.gender === "o").length;
    return [countMale, countFemale, countOther];
  }
}
