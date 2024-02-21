import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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

  getItems(page = 1, itemsPerPage = 10): Observable<Event[]> {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const items = [];
    for (let i = startIndex; i < endIndex; i++) {
      if (i < 100) {
        items.push(this.testEvents[i]);
      }
    }
    return of(items);
  }
  public testEvents = [
    {
      id: '1',
      title: 'Event 1',
      capacity: 100,
      startDate: new Date(2000, 0, 11),
      endDate: new Date(2000, 0, 12),
      startRegistration: new Date(2000, 0, 1),
      endRegistration: new Date(2000, 0, 10),
      local: 'Local 1',
      image: '/assets/images/carnaval.jpg',
      description: 'Description of Event 1'
    }, {
      id: '1',
      title: 'Event 1',
      capacity: 100,
      startDate: new Date(2000, 0, 11),
      endDate: new Date(2000, 0, 12),
      startRegistration: new Date(2000, 0, 1),
      endRegistration: new Date(2000, 0, 10),
      local: 'Local 1',
      image: '/assets/images/carnaval.jpg',
      description: 'Description of Event 1'
    }, {
      id: '1',
      title: 'Event 1',
      capacity: 100,
      startDate: new Date(2000, 0, 11),
      endDate: new Date(2000, 0, 12),
      startRegistration: new Date(2000, 0, 1),
      endRegistration: new Date(2000, 0, 10),
      local: 'Local 1',
      image: '/assets/images/carnaval.jpg',
      description: 'Description of Event 1'
    }, {
      id: '1',
      title: 'Event 1',
      capacity: 100,
      startDate: new Date(2000, 0, 11),
      endDate: new Date(2000, 0, 12),
      startRegistration: new Date(2000, 0, 1),
      endRegistration: new Date(2000, 0, 10),
      local: 'Local 1',
      image: '/assets/images/carnaval.jpg',
      description: 'Description of Event 1'
    }, {
      id: '1',
      title: 'Event 1',
      capacity: 100,
      startDate: new Date(2000, 0, 11),
      endDate: new Date(2000, 0, 12),
      startRegistration: new Date(2000, 0, 1),
      endRegistration: new Date(2000, 0, 10),
      local: 'Local 1',
      image: '/assets/images/carnaval.jpg',
      description: 'Description of Event 1'
    }, {
      id: '1',
      title: 'Event 1',
      capacity: 100,
      startDate: new Date(2000, 0, 11),
      endDate: new Date(2000, 0, 12),
      startRegistration: new Date(2000, 0, 1),
      endRegistration: new Date(2000, 0, 10),
      local: 'Local 1',
      image: '/assets/images/carnaval.jpg',
      description: 'Description of Event 1'
    }, {
      id: '1',
      title: 'Event 1',
      capacity: 100,
      startDate: new Date(2000, 0, 11),
      endDate: new Date(2000, 0, 12),
      startRegistration: new Date(2000, 0, 1),
      endRegistration: new Date(2000, 0, 10),
      local: 'Local 1',
      image: '/assets/images/carnaval.jpg',
      description: 'Description of Event 1'
    }, {
      id: '1',
      title: 'Event 1',
      capacity: 100,
      startDate: new Date(2000, 0, 11),
      endDate: new Date(2000, 0, 12),
      startRegistration: new Date(2000, 0, 1),
      endRegistration: new Date(2000, 0, 10),
      local: 'Local 1',
      image: '/assets/images/carnaval.jpg',
      description: 'Description of Event 1'
    }, {
      id: '1',
      title: 'Event 1',
      capacity: 100,
      startDate: new Date(2000, 0, 11),
      endDate: new Date(2000, 0, 12),
      startRegistration: new Date(2000, 0, 1),
      endRegistration: new Date(2000, 0, 10),
      local: 'Local 1',
      image: '/assets/images/carnaval.jpg',
      description: 'Description of Event 1'
    }, {
      id: '1',
      title: 'Event 1',
      capacity: 100,
      startDate: new Date(2000, 0, 11),
      endDate: new Date(2000, 0, 12),
      startRegistration: new Date(2000, 0, 1),
      endRegistration: new Date(2000, 0, 10),
      local: 'Local 1',
      image: '/assets/images/carnaval.jpg',
      description: 'Description of Event 1'
    }, {
      id: '1',
      title: 'Event 1',
      capacity: 100,
      startDate: new Date(2000, 0, 11),
      endDate: new Date(2000, 0, 12),
      startRegistration: new Date(2000, 0, 1),
      endRegistration: new Date(2000, 0, 10),
      local: 'Local 1',
      image: '/assets/images/carnaval.jpg',
      description: 'Description of Event 1'
    }, {
      id: '1',
      title: 'Event 1',
      capacity: 100,
      startDate: new Date(2000, 0, 11),
      endDate: new Date(2000, 0, 12),
      startRegistration: new Date(2000, 0, 1),
      endRegistration: new Date(2000, 0, 10),
      local: 'Local 1',
      image: '/assets/images/carnaval.jpg',
      description: 'Description of Event 1'
    }, {
      id: '1',
      title: 'Event 1',
      capacity: 100,
      startDate: new Date(2000, 0, 11),
      endDate: new Date(2000, 0, 12),
      startRegistration: new Date(2000, 0, 1),
      endRegistration: new Date(2000, 0, 10),
      local: 'Local 1',
      image: '/assets/images/carnaval.jpg',
      description: 'Description of Event 1'
    }, {
      id: '1',
      title: 'Event 1',
      capacity: 100,
      startDate: new Date(2000, 0, 11),
      endDate: new Date(2000, 0, 12),
      startRegistration: new Date(2000, 0, 1),
      endRegistration: new Date(2000, 0, 10),
      local: 'Local 1',
      image: '/assets/images/carnaval.jpg',
      description: 'Description of Event 1'
    }, {
      id: '1',
      title: 'Event 1',
      capacity: 100,
      startDate: new Date(2000, 0, 11),
      endDate: new Date(2000, 0, 12),
      startRegistration: new Date(2000, 0, 1),
      endRegistration: new Date(2000, 0, 10),
      local: 'Local 1',
      image: '/assets/images/carnaval.jpg',
      description: 'Description of Event 1'
    }, {
      id: '1',
      title: 'Event 1',
      capacity: 100,
      startDate: new Date(2000, 0, 11),
      endDate: new Date(2000, 0, 12),
      startRegistration: new Date(2000, 0, 1),
      endRegistration: new Date(2000, 0, 10),
      local: 'Local 1',
      image: '/assets/images/carnaval.jpg',
      description: 'Description of Event 1'
    }, {
      id: '1',
      title: 'Event 1',
      capacity: 100,
      startDate: new Date(2000, 0, 11),
      endDate: new Date(2000, 0, 12),
      startRegistration: new Date(2000, 0, 1),
      endRegistration: new Date(2000, 0, 10),
      local: 'Local 1',
      image: '/assets/images/carnaval.jpg',
      description: 'Description of Event 1'
    }, {
      id: '1',
      title: 'Event 1',
      capacity: 100,
      startDate: new Date(2000, 0, 11),
      endDate: new Date(2000, 0, 12),
      startRegistration: new Date(2000, 0, 1),
      endRegistration: new Date(2000, 0, 10),
      local: 'Local 1',
      image: '/assets/images/carnaval.jpg',
      description: 'Description of Event 1'
    }, {
      id: '1',
      title: 'Event 1',
      capacity: 100,
      startDate: new Date(2000, 0, 11),
      endDate: new Date(2000, 0, 12),
      startRegistration: new Date(2000, 0, 1),
      endRegistration: new Date(2000, 0, 10),
      local: 'Local 1',
      image: '/assets/images/carnaval.jpg',
      description: 'Description of Event 1'
    }, {
      id: '1',
      title: 'Event 1',
      capacity: 100,
      startDate: new Date(2000, 0, 11),
      endDate: new Date(2000, 0, 12),
      startRegistration: new Date(2000, 0, 1),
      endRegistration: new Date(2000, 0, 10),
      local: 'Local 1',
      image: '/assets/images/carnaval.jpg',
      description: 'Description of Event 1'
    }, {
      id: '1',
      title: 'Event 1',
      capacity: 100,
      startDate: new Date(2000, 0, 11),
      endDate: new Date(2000, 0, 12),
      startRegistration: new Date(2000, 0, 1),
      endRegistration: new Date(2000, 0, 10),
      local: 'Local 1',
      image: '/assets/images/carnaval.jpg',
      description: 'Description of Event 1'
    },

  ];
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
