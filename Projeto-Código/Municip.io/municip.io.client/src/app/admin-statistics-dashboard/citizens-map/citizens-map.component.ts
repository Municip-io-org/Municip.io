import { Component } from '@angular/core';
import { Municipality } from '../../services/municipal-admin-auth.service';
import { ChartType } from 'angular-google-charts';
import { AdminStatisticsService } from '../../services/stats/admin-statistics.service';

@Component({
  selector: 'app-citizens-map',
  templateUrl: './citizens-map.component.html',
  styleUrl: './citizens-map.component.css'
})

/**
 * @class CitizensMapComponent
 *
 * Este componente é responsável por exibir um mapa com a distribuição de cidadãos por distrito.
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
 * @returns Um mapa com a distribuição de cidadãos por distrito.
 *
 **/
export class CitizensMapComponent {

  constructor(private adminStatisticsService: AdminStatisticsService) { }

  title = '';

  districtData: { [key: string]: number } = {}; 




  municipalities: any[] = [];
  type = ChartType.GeoChart;
  data = [
    ["sem dados", 0]
  ];


  columnNames = ["Distrito", "Cidadãos Registados"];
  options = {
    showTip: true,

    region: "PT",
    keepAspectRatio: true, // Optional: To keep aspect ratio
    backgroundColor: 'transparent',
    resolution: "provinces",
    datalessRegionColor: 'transparent',



    legend: 'none',

  };
  width = 600;
  height = 400;


  /**
   * Este método é responsável por obter a lista de municípios e gerar os dados dos distritos.
   * 
   * @returns A lista de municípios.
   *
   **/
  ngOnInit() {
    this.adminStatisticsService.getAllMunicipalities().subscribe((municipalities: Municipality[]) => {
      this.municipalities = municipalities;
      this.generateCitizensDistrictsData();
      console.log(this.districtData);


    });

  }

  /**
   * Este método é responsável por gerar os dados dos distritos.
   * 
   * @returns Os dados dos distritos.
   *
   **/
  generateCitizensDistrictsData() {

this.municipalities.forEach(municipality => {
  if (municipality.distrito in this.districtData) {
        this.districtData[municipality.distrito] += municipality.numberOfUsers;
      } else {
    this.districtData[municipality.distrito] = municipality.numberOfUsers;
      }
});


    this.data = Object.entries(this.districtData);
  }



}
