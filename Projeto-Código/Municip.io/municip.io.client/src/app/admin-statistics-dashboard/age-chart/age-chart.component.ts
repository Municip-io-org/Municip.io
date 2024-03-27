import { Component, Input, SimpleChanges } from '@angular/core';
import { Citizen } from '../../services/citizen-auth.service';
import { AdminStatisticsService } from '../../services/stats/admin-statistics.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-age-chart',
  templateUrl: './age-chart.component.html',
  styleUrl: './age-chart.component.css'
})
export class AgeChartComponent {
  @Input() citizens: Citizen[] = [];
  chart: Chart<'pie', number[], string> | undefined;

  constructor() { }

  ngOnInit() {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['citizens'] && !changes['citizens'].firstChange) {
      this.updateChart();
    }
  }

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

  updateChart() {
    if (this.chart) {
      const yValues = [this.getAgeCount(this.arrangeAges(), "0-17"), this.getAgeCount(this.arrangeAges(), "18-29"), this.getAgeCount(this.arrangeAges(), "30-49"), this.getAgeCount(this.arrangeAges(), "50-64"), this.getAgeCount(this.arrangeAges(), "65+")];
      this.chart.data.datasets[0].data = yValues;
      this.chart.update();
    }
  }

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

  getAgeCount(ages: string[], ageGroup: string) {
    return ages.filter(age => age === ageGroup).length;
  }
}
