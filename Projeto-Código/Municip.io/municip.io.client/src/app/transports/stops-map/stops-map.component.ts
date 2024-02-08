import { Component, ViewChild } from '@angular/core';
import { BoundsService } from '../../maps/bounds.service';
import { GoogleMap } from '@angular/google-maps';
import { TransportsService } from '../../services/transports.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-stops-map',
  templateUrl: './stops-map.component.html',
  styleUrls: ['./stops-map.component.css']
})
export class StopsMapComponent {

  constructor(private boundsService: BoundsService, private transportsService: TransportsService, private cdr: ChangeDetectorRef) { }

  @ViewChild(GoogleMap, { static: false }) googleMap: GoogleMap | undefined;

  showNextBuses: boolean = false;
  nextBuses: any[] = [];
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
    this.municipalityName = 'Almada';
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
    const content = `<b>${stop.name}</b><br/><br/> <p style="font-weight: 500"> <b>Linhas:</b>  ${stop.lines.join(', ')} </p></div>`;
    this.infoWindow.setContent(content);
    const infoWindowOptions: google.maps.InfoWindowOptions = {
      content: content,
     
      maxWidth: 200
    };
    this.infoWindow.setOptions(infoWindowOptions);
    this.infoWindow.open({
      anchor: marker,
      map: this.googleMap?.googleMap,
      shouldFocus: false
    });

    this.getNextBuses(stop.id);
  }
  getNextBuses(stopId: string) {
    this.transportsService.getRealtimeBuses(stopId).subscribe(
      buses => {
        const now = new Date();
        const tenMinutesBeforeNow = new Date(now.getTime() - 10 * 60000); 

        this.nextBuses = buses.filter(bus => {
          const scheduledArrivalTime = new Date();
          const scheduledArrivalParts = bus.scheduled_arrival.split(":");
          scheduledArrivalTime.setHours(parseInt(scheduledArrivalParts[0]));
          scheduledArrivalTime.setMinutes(parseInt(scheduledArrivalParts[1]));
          scheduledArrivalTime.setSeconds(parseInt(scheduledArrivalParts[2]));

          return scheduledArrivalTime > tenMinutesBeforeNow;
        });

        this.showNextBuses = true;
        this.cdr.detectChanges();
        console.log('Próximos autocarros:', this.nextBuses);
      },
      error => {
        console.error('Erro ao buscar os próximos autocarros:', error);
      }
    );
  }

}
