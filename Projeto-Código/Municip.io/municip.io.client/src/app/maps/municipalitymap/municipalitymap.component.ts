import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { BoundsService } from '../bounds.service';

@Component({
  selector: 'app-municipalitymap',
  templateUrl: './municipalitymap.component.html',
  styleUrls: ['./municipalitymap.component.css']
})
export class MunicipalitymapComponent implements AfterViewInit {

  constructor(private boundsService: BoundsService) { }

  @ViewChild(GoogleMap, { static: false }) googleMap: GoogleMap | undefined;

  zoom = 10;
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    draggable: true,
    restriction: null,
    minZoom: 10,
    fullscreenControl: false,
    scaleControl: false,
    mapTypeControl: false,
    rotateControl: false
  };

  showMap: boolean = true;

  ngAfterViewInit() {
    if (this.googleMap) {
      console.log("ENTROU");
      this.setBoundsAndCenterForMunicipality('Montijo');
    }
  }

  setBoundsAndCenterForMunicipality(municipalityName: string) {
    this.boundsService.getMunicipalityBounds(municipalityName).subscribe(bounds => {
      if (bounds) {
        console.log("Entra no if do setBoundsAndCenterForMunicipality");
        const newRestriction: google.maps.MapRestriction = {
          latLngBounds: {
            north: bounds.north,
            south: bounds.south,
            east: bounds.east,
            west: bounds.west
          },
          strictBounds: true
        };

        this.options = { ...this.options, restriction: newRestriction };

        const centerLat = (bounds.north + bounds.south) / 2;
        const centerLng = (bounds.east + bounds.west) / 2;
        this.center = { lat: centerLat, lng: centerLng };

        if (this.googleMap) {
          this.googleMap.options = this.options;
          this.googleMap.center = this.center;
        }
      } else {
        this.showMap = false;
        console.error('DEU ERRO:', municipalityName);
      }
    }, error => {
      this.showMap = false;
      console.error('Erro ao obter os limites do município:', error);
    });
  }
}
