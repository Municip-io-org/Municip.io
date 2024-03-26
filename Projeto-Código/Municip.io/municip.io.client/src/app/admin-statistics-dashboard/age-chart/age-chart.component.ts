import { Component } from '@angular/core';
import { Citizen } from '../../services/citizen-auth.service';
import { AdminStatisticsService } from '../../services/stats/admin-statistics.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-age-chart',
  templateUrl: './age-chart.component.html',
  styleUrl: './age-chart.component.css'
})
export class AgeChartComponent {

  constructor(private adminStatisticsService: AdminStatisticsService) { }

  citizens: Citizen[] = [];
  chart: Chart | undefined;




  ngAfterViewInit() {
    this.adminStatisticsService.getAllCitizens().subscribe((data: Citizen[]) => {
      this.citizens = data;


      console.log(this.citizens)
      this.createChart();
    });


  }

  createChart() {

    const xValues = ["0-17", "18-29", "30-49", "50-64","65+"];



    const yValues = [this.getAgeCount(this.arrangeAges(), "0-17"), this.getAgeCount(this.arrangeAges(), "18-29"), this.getAgeCount(this.arrangeAges(), "30-49"), this.getAgeCount(this.arrangeAges(), "50-64"), this.getAgeCount(this.arrangeAges(), "65+")];
    const barColors = [
      "#334CFF",
      "#FF69B4",
      "#FFA07A",
      "#FFD700",
      "#FF6347"


    ];

    new Chart("ageChart", {
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

  //use arrangeAges () to get the ages of the citizens and then count the number of citizens in each age group
getAgeCount(ages: string[], ageGroup: string) {
    return ages.filter(age => age === ageGroup).length;
  }


}


