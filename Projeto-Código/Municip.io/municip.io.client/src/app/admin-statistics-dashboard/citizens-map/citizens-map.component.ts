import { Component } from '@angular/core';
import { Municipality } from '../../services/municipal-admin-auth.service';
import { ChartType } from 'angular-google-charts';
import { AdminStatisticsService } from '../../services/stats/admin-statistics.service';

@Component({
  selector: 'app-citizens-map',
  templateUrl: './citizens-map.component.html',
  styleUrl: './citizens-map.component.css'
})
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



  ngOnInit() {
    this.adminStatisticsService.getAllMunicipalities().subscribe((municipalities: Municipality[]) => {
      this.municipalities = municipalities;
      this.generateCitizensDistrictsData();
      console.log(this.districtData);


    });

  }

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
