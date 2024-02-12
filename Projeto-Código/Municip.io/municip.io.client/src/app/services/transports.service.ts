import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransportsService {

  constructor(private http: HttpClient) { }


  apiLink: string = "https://api.carrismetropolitana.pt/";


  getLines(): Observable<line[]>{
    return this.http.get<line[]>(this.apiLink + "lines");
  }



  getMunicipalities(): Observable<municipalityTransport[]>{
    return this.http.get<municipalityTransport[]>(this.apiLink + "municipalities");
  }


  getRealtimeBuses(stopId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiLink}stops/${stopId}/realtime`);
  }


getMunicipalityByName(name: string): Observable < municipalityTransport | null > {
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



  getLinesByMunicipalityId(id: string): Observable<line[] | null>{
    return this.getLines().pipe(
    map(lines => {
        const linesByMunicipality = lines.filter(line => line.municipalities.includes(id));
        if (linesByMunicipality) {
          return linesByMunicipality;
        } else {
          return null;
        }
      })
    )

  }

    
  getRoute(id: string) : Observable<route>{
    return this.http.get<route>(this.apiLink + "routes/" + id);
  }


  getStopsFromMunicipality(municipalityName: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiLink + "stops").pipe(
      map(stops => stops.filter(stop => stop.municipality_name === municipalityName))
    );
  }





}



export interface line {
  "id": string,
  "short_name": string,
  "long_name":string ,
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
  localities: string [],
  facilities: string[]
}
