import { Component, Input } from '@angular/core';
import { ChartType, GoogleChartsModule } from 'angular-google-charts';
import { Municipality } from '../../services/municipal-admin-auth.service';
import { AdminStatisticsService } from '../../services/stats/admin-statistics.service';

@Component({
  selector: 'app-districts-map',
  templateUrl: './districts-map.component.html',
  styleUrl: './districts-map.component.css'
})
export class DistrictsMapComponent {

  constructor(private adminStatisticsService: AdminStatisticsService) { }

  title = '';

  districtData: [string, number][] = [];




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



    legend: 'none',

  };
  width = 600;
  height = 400;



  ngOnInit() {
    this.adminStatisticsService.getAllMunicipalities().subscribe((municipalities: Municipality[]) => {
      this.municipalities = municipalities;
      this.generateDistrictsData();
      console.log(this.districtData);


    });

  }

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


  }
}
