import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { AdminStatisticsService } from '../../services/stats/admin-statistics.service';
import { Citizen } from '../../services/citizen-auth.service';

@Component({
  selector: 'app-registered-users-graph',
  templateUrl: './registered-users-graph.component.html',
  styleUrls: ['./registered-users-graph.component.css']
})
/**
 * @class RegisteredUsersGraphComponent
 *
 * Este componente é responsável por exibir um gráfico de cidadãos registados.
 *
 * @returns Um gráfico de linhas com o número de cidadãos registados por mês.
 *
 **/
export class RegisteredUsersGraphComponent implements AfterViewInit {

  /**
  * @constructor
  *
  * Este construtor é responsável por injetar o serviço estatístico do administrador.
  *
  * @param adminStatisticsService - O serviço de estatísticas do administrador.
  *
  **/
  constructor(private adminStatisticsService: AdminStatisticsService) { }

  chart: Chart | undefined;
  countsByMonthCitizens: Map<string, number> = new Map();
  countsByMonthMunicipalAdmins: Map<string, number> = new Map();

  /**
   * Este método é responsável por criar o gráfico.
   * 
   * @returns O gráfico.
   *
   **/
  ngAfterViewInit() {

    this.adminStatisticsService.getAllCitizens().subscribe((data: Citizen[]) => {
   
      this.countsByMonthCitizens = this.getRegisteredByMonth(data);

      this.adminStatisticsService.getAllMunicipalAdmins().subscribe((datamunadmin: Citizen[]) => {
        this.countsByMonthMunicipalAdmins = this.getRegisteredByMonth(datamunadmin);


     
        console.log(Array.from(this.countsByMonthMunicipalAdmins.values()))
        this.createChart();
      }
      );
    }
    );
  }

  /**
   * Este método é responsável por criar o gráfico.
   * 
   * @returns O gráfico.
   *
   **/
  createChart() {
    const maxDataValue = Math.max(...Array.from(this.countsByMonthCitizens.values()));
    const maxYAxisValue = Math.ceil(maxDataValue)+ 5; 

    this.chart = new Chart("myChart", {
      type: "line",
      data: {
        labels: Array.from(this.countsByMonthCitizens.keys()),

        datasets: [{
          label: 'Cidadãos registados por mês',
          data: Array.from(this.countsByMonthCitizens.values()),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          order:2
        },
          {
            label: 'Administradores municipais registados por mês',
            data: Array.from(this.countsByMonthMunicipalAdmins.values()),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            order:1
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

  /**
   * Este método é responsável por obter o número de cidadãos registados por mês.
   * 
   * @param data - Dados dos cidadãos.
   * @returns O número de cidadãos registados por mês.
   *
   **/
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
