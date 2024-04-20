import { Component, AfterViewInit, ViewChild, Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { BoundsService } from '../bounds.service';

@Component({
  selector: 'app-eventsmap',
  templateUrl: './eventsmap.component.html',
  styleUrl: './eventsmap.component.css'
})
/**
 * Events Map Component
 *
 * Este componente representa o mapa de eventos
 *
 * @param EventAddress - Endereço do evento
 * @param showMap - Mostrar mapa
 * @param zoom - Zoom
 * @param center - Centro
 * @param options - Opções
 * @param infoWindow - Janela de informações
 * @param markers - Marcadores
 */
export class EventsmapComponent {

  /**
   * @constructor
   * EventsmapComponent
   *
   * @param boundsService - Serviço de limites
   * @param cdr - ChangeDetectorRef
   */
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
    draggable: false,
    restriction: null,
    minZoom: 10,
    fullscreenControl: false,
    scaleControl: false,
    mapTypeControl: false,
    rotateControl: false
  };

  infoWindow = new google.maps.InfoWindow();
  markers: google.maps.Marker[] = []; // Armazenar marcadores em uma matriz




  /**
   *
   * ngOnChanges
   *
   * Este método é chamado quando há alterações
   * @param changes - Alterações
   *
   */ 
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['EventAddress'] && changes['EventAddress'].currentValue) {
      this.setCenterAndMarkerForEventAddress(changes['EventAddress'].currentValue);
      this.showMap = true;
      console.log('EventAddress'+this.EventAddress)
    }

  }

  /**
   * setCenterAndMarkerForEventAddress
   *
   * Este método define o centro e o marcador para o endereço do evento
   * @param eventAddress - Endereço do evento
   *
   */
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
