import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { BoundsService } from '../bounds.service';
import { TransportsService } from '../../services/transports.service';

@Component({
  selector: 'app-municipalitymap',
  templateUrl: './municipalitymap.component.html',
  styleUrls: ['./municipalitymap.component.css']
})
export class MunicipalitymapComponent implements AfterViewInit {

  constructor(private boundsService: BoundsService, private transportsService: TransportsService) { }

  @ViewChild(GoogleMap, { static: false }) googleMap: GoogleMap | undefined;

  municipalityName: string = '';
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

  infoWindow = new google.maps.InfoWindow();
  showMap: boolean = true;

  ngAfterViewInit() {
    this.municipalityName = 'Montijo';
    if (this.googleMap) {
      this.setBoundsAndCenterForMunicipality(this.municipalityName);
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

        // Adicionar marcadores
        this.transportsService.getStopsFromMunicipality(this.municipalityName).subscribe(stops => {
          stops.forEach(stop => {
            const marker = new google.maps.Marker({
              position: { lat: parseFloat(stop.lat), lng: parseFloat(stop.lon) },
              map: this.googleMap?.googleMap,
              title: stop.name
            });

            marker.addListener('click', () => {
              this.showInfoWindow(stop, marker);
            });
          });
        });
      } else {
        this.showMap = false;
        console.error('DEU ERRO:', municipalityName);
      }
    }, error => {
      this.showMap = false;
      console.error('Erro ao obter os limites do município:', error);
    });
  }

  showInfoWindow(stop: any, marker: google.maps.Marker) {
    const content = `<div><b>${stop.name}</b><br/>Linhas: ${stop.lines.join(', ')}</div>`;
    this.infoWindow.setContent(content);
    this.infoWindow.open({
      anchor: marker,
      map: this.googleMap?.googleMap,
      shouldFocus: false
    });
  }
}
