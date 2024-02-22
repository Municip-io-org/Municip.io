import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>('api/events/GetEvents');
  }

  getUserEvents(email: string): Observable<Event[]> {
    const params = { email: email }; 
    return this.http.get<Event[]>('api/events/GetEventsByCitizen', { params: params });
  }

  getEventByPagination(page = 1, itemsPerPage = 10, municipalityName: string): Observable<Event[]> {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return this.http.get<Event[]>(`api/events/GetEventsByMunicipality?municipalityName=${municipalityName}`).pipe(
      map(municipalityEvents => {
        return municipalityEvents.slice(startIndex, endIndex);
      })
    );
  }
}

export interface Event {
  id: string;
  title: string;
  capacity: number;
  nRegistrations: number;
  startDate: Date;
  endDate: Date;
  startRegistration: Date;
  endRegistration: Date;
  local: string;
  image: string;
  description: string;
}
