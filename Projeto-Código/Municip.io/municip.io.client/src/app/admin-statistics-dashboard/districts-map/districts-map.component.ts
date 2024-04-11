import { Component, Input } from '@angular/core';
import { ChartType, GoogleChartsModule } from 'angular-google-charts';
import { Municipality } from '../../services/municipal-admin-auth.service';
import { AdminStatisticsService } from '../../services/stats/admin-statistics.service';

@Component({
  selector: 'app-districts-map',
  templateUrl: './districts-map.component.html',
  styleUrl: './districts-map.component.css'
})

/**
 * @class DistrictsMapComponent
 *
 * Este componente é responsável por exibir um mapa com a distribuição de distritos.
 * 
 * @param title - O título do mapa.
 * @param districtData - Os dados dos distritos.
 * @param municipalities - A lista de municípios.
 * @param type - O tipo de gráfico.
 * @param data - Os dados a serem exibidos no gráfico.
 * @param columnNames - Os nomes das colunas do gráfico.
 * @param options - As opções do gráfico.
 * @param width - A largura do gráfico.
 * @param height - A altura do gráfico.
 *
 * @returns Um mapa com a distribuição de distritos.
 *
 **/
export class DistrictsMapComponent {

  constructor(private adminStatisticsService: AdminStatisticsService) { }

  title = '';

  districtData: [string, number][] = [];

  min = 0;
max = 0;


  municipalities: Municipality[] = [];
  type = ChartType.GeoChart;
  data = [
["sem dados", 0]
  ];


  columnNames = ["Distrito", "Population"];
  options = {
    showTip: true,

    region: "PT",
    keepAspectRatio: true, // Optional: To keep aspect ratio
    backgroundColor: 'transparent',
    resolution: "provinces",
    datalessRegionColor: 'transparent',
    colorAxis: { colors: ['#0cab46', '#f59e0b', '#ef4444'] },



    legend: 'none',

  };
  width = 600;
  height = 400;



  /**
   * Este método é responsável por inicializar o componente.
   * 
   * @returns Os dados dos distritos.
   *
   **/
  ngOnInit() {
    this.adminStatisticsService.getAllMunicipalities().subscribe((municipalities: Municipality[]) => {
      this.municipalities = municipalities;
      this.generateDistrictsData();
      console.log(this.districtData);


    });

  }

  /**
   * Este método é responsável por gerar os dados dos distritos.
   * 
   * @returns Os dados dos distritos.
   *
   **/
  generateDistrictsData() {
    const districtMap = new Map<string, number>();
    this.municipalities.forEach(municipality => {
      const district = municipality.distrito;
      if (districtMap.has(district)) {
        districtMap.set(district, districtMap.get(district)! + 1);
      } else {
        districtMap.set(district, 1);
      }
    });


    this.districtData = Array.from(districtMap.entries()).map(([key, value]) => [key, value]);

    this.data = this.districtData;
    this.max = Math.max(...this.districtData.map(d => d[1]));
this.min = Math.min(...this.districtData.map(d => d[1]));


  }
}
