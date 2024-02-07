import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoundsService {

  constructor(private http: HttpClient) { }

  getMunicipalityBounds(municipalityName: string): Observable<any> {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${municipalityName}&key=AIzaSyDNwbIjZzCxVDfVZBvwpJ8WyX-DUb--44s`;

    return this.http.get(apiUrl).pipe(
      map((data: any) => {
        if (data.results && data.results.length > 0) {
          const geometry = data.results[0].geometry;
          if (geometry && geometry.bounds) {
            const bounds = geometry.bounds;
            return {
              north: bounds.northeast.lat,
              south: bounds.southwest.lat,
              east: bounds.northeast.lng,
              west: bounds.southwest.lng
            };
          }
        }
        throw new Error('ERro - não se obteve as bounds.');
      })
    );
  }
}
