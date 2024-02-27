import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { Municipality } from '../municipal-admin-auth.service';
import { Citizen } from '../citizen-auth.service';

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

  createEvent(event: Event, image: File) {
    var headers = new HttpHeaders({ 'authorization': 'Client-ID a9e7323ad868dd2' });
    let imgurl = "https://api.imgur.com/3/image";

    //upload to imgur
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(imgurl, formData, { headers })
      .pipe(switchMap((response: any) => {
        event.image = response['data']['link'];
        return this.http.post<Event>('api/events/CreateEvent', event);
      }));

  }
  updateEvent(event: Event, image: File) {

    if (!image) return this.http.put<Event>('api/events/UpdateEvent', event);


    var headers = new HttpHeaders({ 'authorization': 'Client-ID a9e7323ad868dd2' });
    let imgurl = "https://api.imgur.com/3/image";



    //upload to imgur
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(imgurl, formData, { headers })
      .pipe(switchMap((response: any) => {
        event.image = response['data']['link'];
        return this.http.put<Event>('api/events/UpdateEvent', event);
      }));
  }


  dropOutEvent(eventId: string, email: string) {
email=email.replace('@', '%40');
    return this.http.post<any>(`api/events/DropOutCitizen?eventId=${eventId}&email=${email}`, {});
  }

  enrollEvent(eventId: string, email: string) {
    email=email.replace('@', '%40');
    return this.http.post<any>(`api/events/EnrollCitizen?eventId=${eventId}&email=${email}`, {});
  }

  getPaginationEvent(page = 1, itemsPerPage = 10, events: Event[]) :Event[] {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return events.slice(startIndex, endIndex);
  }

  getPaginationEventByCitizen(page = 1, itemsPerPage = 10, email: string): Observable<Event[]> {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return this.http.get<Event[]>(`api/events/GetEventsByCitizen?email=${email}`).pipe(
      map(municipalityEvents => {
        return municipalityEvents.slice(startIndex, endIndex);
      })
    );
  }

  getEventByCitizen(email: string) {
    return this.http.get<Event[]>(`api/events/GetEventsByCitizen?email=${email}`)
  }

  getEventByMunicipality(municipalityName: string) {
    return this.http.get<Event>(`api/events/GetEventsByMunicipality?municipalityName=${municipalityName}`);
  }

  getEventById(eventId: string) {
    return this.http.get<Event>(`api/events/GetEventById?eventId=${eventId}`);
  }

  removeEvent(eventId: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`api/events/RemoveEvent?eventId=${eventId}`, { observe: 'response' });
  }
}

export interface Event {
  id?: string;
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
  citizens?: Citizen[];
  municipality: string;
}
