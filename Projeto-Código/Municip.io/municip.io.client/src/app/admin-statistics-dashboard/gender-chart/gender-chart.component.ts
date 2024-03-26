import { Component } from '@angular/core';
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

  constructor(private adminStatisticsService: AdminStatisticsService) { }

  citizens: Citizen[] = [];
  chart: Chart | undefined;

  getGenderCountMale: number = 0;
  getGenderCountFemale: number = 0;
  getGenderCountOther: number = 0;



  ngAfterViewInit() {
    this.adminStatisticsService.getAllCitizens().subscribe((data: Citizen[]) => {
      this.citizens = data;
      this.getGenderCountMale = this.citizens.filter(citizen => citizen.gender === "m").length;
      this.getGenderCountFemale = this.citizens.filter(citizen => citizen.gender === "f").length;
this.getGenderCountOther = this.citizens.filter(citizen => citizen.gender === "o").length;
      console.log(this.citizens)
      this.createChart();
    });


  }

  createChart() {

    const xValues = ["Masculino", "Feminino", "Outro"];

    console.log (this.getGenderCountMale);

    const yValues = [this.getGenderCountMale, this.getGenderCountFemale, this.getGenderCountOther];
    const barColors = [
      "#334CFF",
      "#FF69B4",
      "#FFA07A"

    ];

    new Chart("genderChart", {
      type: "pie",
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {
        
      }
    });
  }
}
