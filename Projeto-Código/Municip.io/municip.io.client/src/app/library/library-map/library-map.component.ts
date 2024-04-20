import { ChangeDetectorRef, Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { BoundsService } from '../../maps/bounds.service';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-library-map',
  templateUrl: './library-map.component.html',
  styleUrl: './library-map.component.css'
})
/**
 * Library Map Component
 *
 * Este componente representa o mapa da biblioteca
 *
 * @param Address - Endereço
 * @param showMap - Mostrar mapa
 * @param zoom - Zoom
 * @param center - Centro
 * @param options - Opções
 * @param infoWindow - Janela de informações
 * @param markers - Marcadores
 *
 * @input Address - Endereço
 */
export class LibraryMapComponent {

  /**
   * @constructor
   * LibraryMapComponent
   *
   * @param boundsService - Serviço de limites
   * @param cdr - ChangeDetectorRef
   */
  constructor(private boundsService: BoundsService, private cdr: ChangeDetectorRef) { }

  @ViewChild(GoogleMap, { static: false }) googleMap: GoogleMap | undefined;

  @Input() Address: string = '';

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
   * ngOnChanges
   *
   * @param changes - Mudanças
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['Address'] && changes['Address'].currentValue) {
      this.setCenterAndMarkerForEventAddress(changes['Address'].currentValue);
      this.showMap = true;
      console.log('Address' + this.Address)
    }

  }

  /**
   * setCenterAndMarkerForEventAddress
   *
   * @param eventAddress - Endereço do evento
   */
  setCenterAndMarkerForEventAddress(eventAddress: string) {
    console.log('EventAddressnometodo' + eventAddress)
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
