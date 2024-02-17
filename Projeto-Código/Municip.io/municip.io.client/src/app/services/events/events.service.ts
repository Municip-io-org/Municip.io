import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

}

export interface Event {
  id: string;
  title: string;
  capacity: number;
  startDate: Date;
  endDate: Date;
  startRegistration: Date;
  endRegistration: Date;
  local: string;
  image: string;
  description: string;
}
