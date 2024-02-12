import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { BoundsService } from '../../maps/bounds.service';
import { GoogleMap, MapMarker } from '@angular/google-maps';
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

  @Input() municipalityName: string = '';
  @Input() selectedStop: string = '';
  selectedStopName: String = '';


  showMap: boolean = true;
  showNextBuses: boolean = false;
  nextBuses: any[] = [];
  lines: any[] = [];
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


  ngOnInit(): void {
console.log("é esta:"+this.selectedStop)
    };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['municipalityName'] && changes['municipalityName'].currentValue) {
      this.setBoundsAndCenterForMunicipality(changes['municipalityName'].currentValue);
    }
    if (changes['selectedStop'] && changes['selectedStop'].currentValue) {
      this.highlightSelectedStop();
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
            if (stop.id === this.selectedStop) {
              this.selectedStopName = stop.name;
            }
            
            const marker = new google.maps.Marker({
              position: { lat: parseFloat(stop.lat), lng: parseFloat(stop.lon) },
              map: this.googleMap?.googleMap,
              title: stop.name
            });

            
            this.markers.push(marker); // Adicionar o marcador à matriz

            marker.addListener('click', () => {
              this.showInfoWindow(stop, marker);
            });

            if (this.selectedStopName === stop.name) {
              this.showInfoWindow(stop, marker);
            }


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

    this.selectedStop = stop.name;
    this.getLines();
    this.getNextBuses(stop.id);
  }

  getLines() {
    this.transportsService.getLines().subscribe(
      lines => {
        const lineData = lines.map(line => {
          return {
            id: line.id,
            textColor: line.text_color,
            color: line.color
          };
        });
        this.lines = lineData;
      },
      error => {
        console.error('Erro ao buscar as linhas:', error);
      }
    );
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

        this.nextBuses.forEach(bus => {
          const line = this.lines.find(line => line.id === bus.line_id);
          bus.color = line?.color || '#000000';
          bus.textColor = line?.textColor || '#FFFFFF';
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

  isBusPassed(bus: any): boolean {
    const now = new Date();
    const scheduledArrivalTime = new Date();
    const scheduledArrivalParts = bus.scheduled_arrival.split(":");
    scheduledArrivalTime.setHours(parseInt(scheduledArrivalParts[0]));
    scheduledArrivalTime.setMinutes(parseInt(scheduledArrivalParts[1]));
    scheduledArrivalTime.setSeconds(parseInt(scheduledArrivalParts[2]));

    return scheduledArrivalTime < now;
  }

  highlightSelectedStop() {
    this.markers.forEach(marker => {
      if (marker.getTitle() === this.selectedStopName) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        const position = marker.getPosition();
        if (position) {
          this.googleMap?.googleMap?.panTo(position);
        }
      }
    });
  }

}
