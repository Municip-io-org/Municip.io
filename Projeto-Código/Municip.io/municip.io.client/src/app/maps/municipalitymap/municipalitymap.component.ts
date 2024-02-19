import { Component, AfterViewInit, ViewChild, Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { BoundsService } from '../bounds.service';

@Component({
  selector: 'app-municipalitymap',
  templateUrl: './municipalitymap.component.html',
  styleUrls: ['./municipalitymap.component.css']
})
export class MunicipalitymapComponent {


  constructor(private boundsService: BoundsService, private cdr: ChangeDetectorRef) { }

  @ViewChild(GoogleMap, { static: false }) googleMap: GoogleMap | undefined;

  @Input() municipalityName: string = '';

  showMap: boolean = true;
  zoom = 10;
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: false,
    draggable: true,
    restriction: null,
    minZoom: 10,
    fullscreenControl: false,
    scaleControl: false,
    mapTypeControl: false,
    rotateControl: false
  };

  infoWindow = new google.maps.InfoWindow();
  markers: google.maps.Marker[] = []; // Armazenar marcadores em uma matriz


  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['municipalityName'] && changes['municipalityName'].currentValue) {
      this.setBoundsAndCenterForMunicipality(changes['municipalityName'].currentValue);
      this.showMap = true;
    }

  }

  setBoundsAndCenterForMunicipality(municipalityName: string) {

    this.boundsService.getMunicipalityBounds(municipalityName).subscribe(bounds => {
      if (bounds && this.googleMap) {
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

        this.googleMap.options = this.options;
        this.googleMap.center = this.center;





      } else {
        this.showMap = false;
        console.error('DEU ERRO:', this.municipalityName);
      }
    }, error => {
      this.showMap = false;
      console.error('Erro ao obter os limites do município:', error);
    });
  }

}
