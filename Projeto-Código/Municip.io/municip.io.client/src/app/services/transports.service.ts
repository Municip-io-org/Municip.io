import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

/**
 * Serviço que fornece métodos para obter informações sobre transportes públicos.
 */
@Injectable({
  providedIn: 'root'
})
export class TransportsService {

  /**
   * Método construtor.
   * @param http serviço httpClient
   */ 
  constructor(private http: HttpClient) { }

  apiLink: string = "https://api.carrismetropolitana.pt/";

  /**
   * Obtém todas as linhas de transporte público.
   * @returns Observable com um array de objetos que representam as linhas de transporte público.
   */
  getLines(): Observable<line[]> {
    return this.http.get<line[]>(this.apiLink + "lines");
  }

  /**
   * Obtém os municipios
   * @returns Observable com um array de objetos que representam os municipios
   */
  getMunicipalities(): Observable<municipalityTransport[]> {
    return this.http.get<municipalityTransport[]>(this.apiLink + "municipalities");
  }

  /**
   * Obtém os ônibus em tempo real para um determinado ponto de parada.
   * @param stopId O ID do ponto de parada.
   * @returns Observable com um array de objetos que representam os ônibus em tempo real.
   */
  getRealtimeBuses(stopId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiLink}stops/${stopId}/realtime`);
  }

  /**
   * Obtém um município pelo nome.
   * @param name O nome do município.
   * @returns Observable com um objeto que representa o município encontrado ou null se não for encontrado.
   */
  getMunicipalityByName(name: string): Observable<municipalityTransport | null> {
    return this.getMunicipalities().pipe(
      map(municipalities => {
        const municipality = municipalities.find(municipality => municipality.name === name);
        if (municipality) {
          return municipality;
        } else {
          return null;
        }
      })
    );
  }

  /**
   * Obtém as linhas de transporte público de um determinado município.
   * @param id O ID do município.
   * @returns Observable com um array de objetos que representam as linhas de transporte público ou null se não houver linhas para o município.
   */
  getLinesByMunicipalityId(id: string): Observable<line[] | null> {
    return this.getLines().pipe(
      map(lines => {
        const linesByMunicipality = lines.filter(line => line.municipalities.includes(id));
        if (linesByMunicipality) {
          return linesByMunicipality;
        } else {
          return null;
        }
      })
    );
  }

  /**
   * Obtém uma rota pelo ID.
   * @param id O ID da rota.
   * @returns Observable com um objeto que representa a rota.
   */
  getRoute(id: string): Observable<route> {
    return this.http.get<route>(this.apiLink + "routes/" + id);
  }

  /**
   * Obtém um padrão pelo ID.
   * @param id O ID do padrão.
   * @returns Observable com um objeto que representa o padrão.
   */
  getPattern(id: string): Observable<pattern> {
    return this.http.get<pattern>(this.apiLink + "patterns/" + id);
  }

  /**
   * Obtém os pontos de parada de um determinado município.
   * @param municipalityName O nome do município.
   * @returns Observable com um array de objetos que representam os pontos de parada.
   */
  getStopsFromMunicipality(municipalityName: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiLink + "stops").pipe(
      map(stops => stops.filter(stop => stop.municipality_name === municipalityName))
    );
  }
}

export interface line {
  "id": string,
  "short_name": string,
  "long_name": string,
  "color": string
  "text_color": string
  "routes": string[],
  "patterns": string[],
  "municipalities": string[],
  "localities": string[],
  "facilities": string[]
}

export interface municipalityTransport {
  id: string,
  name: string,
  prefix: string,
}

export interface route {
  id: string,
  line_id: string,
  short_name: string,
  long_name: string,
  color: string,
  text_color: string,
  patterns: string[],
  municipalities: string[],
  localities: string[],
  facilities: string[]
}

export interface pattern {
  id: string,
  line_id: string,
  route_id: string,
  short_name: string,
  direction: string,
  headsign: string,
  color: string,
  text_color: string,
  valid_on: string[],
  municipalities: string[],
  localities: string[],
  facilities: string[],
  shape_id: string,
  path: stop[],
  trips: trip[]
}

export interface stop {
  stop: stopInfo;
  stop_sequence: number;
  allow_pickup: boolean;
  allow_drop_off: boolean;
  distance_delta: number;
}

export interface stopInfo {
  id: string;
  name: string;
  short_name: string | null;
  tts_name: string;
  lat: string;
  lon: string;
  locality: string;
  parish_id: string | null;
  parish_name: string | null;
  municipality_id: string;
  municipality_name: string;
  district_id: string;
  district_name: string;
  region_id: string;
  region_name: string;
  wheelchair_boarding: boolean | null;
  facilities: string[];
  lines: string[];
  routes: string[];
  patterns: string[];
}

export interface trip {
  id: string,
  calendar_id: string,
  calendar_description: string,
  dates: string[],
  schedule: stopTime[]
}

export interface stopTime {
  stop_id: string,
  stop_sequence: number,
  arrival_time: string,
  arrival_time_operation: string,
  travel_time: number
}
