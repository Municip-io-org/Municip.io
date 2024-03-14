import { Component, AfterViewInit, ViewChild, Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { BoundsService } from '../bounds.service';

@Component({
  selector: 'app-eventsmap',
  templateUrl: './eventsmap.component.html',
  styleUrl: './eventsmap.component.css'
})
export class EventsmapComponent {


  constructor(private boundsService: BoundsService, private cdr: ChangeDetectorRef) { }

  @ViewChild(GoogleMap, { static: false }) googleMap: GoogleMap | undefined;

  @Input() EventAddress: string = '';

  showMap: boolean = true;
  zoom = 15;
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
    if (changes['EventAddress'] && changes['EventAddress'].currentValue) {
      this.setCenterAndMarkerForEventAddress(changes['EventAddress'].currentValue);
      this.showMap = true;
      console.log('EventAddress'+this.EventAddress)
    }

  }

  setCenterAndMarkerForEventAddress(eventAddress: string) {
    console.log('EventAddressnometodo'+eventAddress)
    this.boundsService.getBoundsFromAddress(eventAddress).subscribe(bounds => {
      if (bounds && this.googleMap) {
        this.center = { lat: bounds.lat, lng: bounds.lng };
        const marker = new google.maps.Marker({
          position: this.center,
          map: this.googleMap.googleMap,
          title: 'Localização do evento'
        });
        console.log('bounds' + bounds.lat)
        console.log('bounds' + bounds.lng)
        this.cdr.detectChanges();
      }
    });
  }



}
