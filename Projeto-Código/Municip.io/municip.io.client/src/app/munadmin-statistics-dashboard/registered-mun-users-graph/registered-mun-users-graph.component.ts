import { Component } from '@angular/core';
import { AdminStatisticsService } from '../../services/stats/admin-statistics.service';
import { MunicipalAdministrator } from '../../services/municipal-admin-auth.service';
import { Citizen } from '../../services/citizen-auth.service';
import { RequestDocument } from '../../services/documents/docs.service';
import Chart from 'chart.js/auto';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-registered-mun-users-graph',
  templateUrl: './registered-mun-users-graph.component.html',
  styleUrl: './registered-mun-users-graph.component.css'
})
export class RegisteredMunUsersGraphComponent {

  constructor(private adminStatisticsService: AdminStatisticsService, private userAuthService : UserAuthService) { }

  chart: Chart | undefined;
  countsByMonthCitizens: Map<string, number> = new Map();
  countsByMonthMunicipalAdmins: Map<string, number> = new Map();
  municipality: string = '';
  user: any;
  municipalityCitizens: Citizen[] = [];
municipalityAdmins: MunicipalAdministrator[] = [];

  ngAfterViewInit() {

    this.userAuthService.getUserData().subscribe(
      res => {
        let anyUser: any;
        anyUser = res;
        this.userAuthService.getInfoByEmail(anyUser.email).subscribe(
          async (res: any) => {
            this.user = res;
            this.municipality = this.user.municipality;



            this.adminStatisticsService.getAllCitizens().subscribe((data: Citizen[]) => {

              this.municipalityCitizens = data.filter(citizen => citizen.municipality === this.municipality);


              this.countsByMonthCitizens = this.getRegisteredByMonth(this.municipalityCitizens);


              this.adminStatisticsService.getAllMunicipalAdmins().subscribe((datamunadmin: Citizen[]) => {

                this.municipalityAdmins = data.filter(admin => admin.municipality === this.municipality);

                this.countsByMonthMunicipalAdmins = this.getRegisteredByMonth(this.municipalityAdmins);


                this.createChart();
              });
            }
            );
          }
        );
      }
    );
  }



  createChart() {
    const maxDataValue = Math.max(...Array.from(this.countsByMonthCitizens.values()));
    const maxYAxisValue = Math.ceil(maxDataValue) + 5;

    this.chart = new Chart("myChart", {
      type: "line",
      data: {
        labels: Array.from(this.countsByMonthCitizens.keys()),

        datasets: [{
          label: 'Cidadãos registados por mês em ' + this.municipality,
          data: Array.from(this.countsByMonthCitizens.values()),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          order: 2
        },
        {
          label: 'Administradores municipais registados por mês em '+this.municipality,
          data: Array.from(this.countsByMonthMunicipalAdmins.values()),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          order: 1
        }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: maxYAxisValue,
            ticks: {
              stepSize: 1,
              precision: 0
            }
          }
        }
      }
    });
  }

  getRegisteredByMonth(data: any[]): Map<string, number> {
    const monthOrder: { [key: string]: number } = {
      'janeiro': 1,
      'fevereiro': 2,
      'março': 3,
      'abril': 4,
      'maio': 5,
      'junho': 6,
      'julho': 7,
      'agosto': 8,
      'setembro': 9,
      'outubro': 10,
      'novembro': 11,
      'dezembro': 12
    };

    const counts = new Map<string, number>();
    data.forEach(entry => {
      const date = new Date(entry.date);
      const month = date.toLocaleString('pt-pt', { month: 'long' }).toLowerCase();
      const year = date.getFullYear();
      const key = year * 100 + monthOrder[month];
      const count = counts.get(key.toString()) || 0;
      counts.set(key.toString(), count + 1);
    });

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 6; i++) {
      const month = new Date(currentYear, currentMonth - i, 1).toLocaleString('pt-pt', { month: 'long' }).toLowerCase();
      const year = new Date(currentYear, currentMonth - i, 1).getFullYear();
      const key = year * 100 + monthOrder[month];
      if (!counts.has(key.toString())) {
        counts.set(key.toString(), 0);
      }
    }


    const sortedCounts = new Map([...counts.entries()].sort((a, b) => {
      return parseInt(a[0]) - parseInt(b[0]);
    }));

    const sortedCountsPortuguese = new Map<string, number>();
    sortedCounts.forEach((value, key) => {
      const year = parseInt(key) / 100;
      const monthNumber = parseInt(key) % 100;
      const monthNames = Object.keys(monthOrder);
      const monthName = monthNames.find(name => monthOrder[name] === monthNumber);
      if (monthName) {
        const newKey = `${monthName}`;
        sortedCountsPortuguese.set(newKey, value);
      }
    });

    return sortedCountsPortuguese;
  }


}
