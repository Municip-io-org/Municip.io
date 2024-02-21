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
      if (i < this.testEvents.length) {
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
      title: 'Event 2',
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
      title: 'Event 3',
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
      title: 'Event 4',
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
      title: 'Event 5',
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
      title: 'Event 6',
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
      title: 'Event 7',
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
      title: 'Event 8',
      capacity: 100,
      startDate: new Date(2000, 0, 11),
      endDate: new Date(2000, 0, 12),
      startRegistration: new Date(2000, 0, 1),
      endRegistration: new Date(2000, 0, 10),
      local: 'Local 9',
      image: '/assets/images/carnaval.jpg',
      description: 'Description of Event 1'
    }, {
      id: '1',
      title: 'Event 9',
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
      title: 'Event 10',
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
      title: 'Event 11',
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
      title: 'Event 12',
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
      title: 'Event 13',
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
      title: 'Event 14',
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
      title: 'Event 15',
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
      title: 'Event 16',
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
      title: 'Event 17',
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
      title: 'Event 18',
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
      title: 'Event 19',
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
      title: 'Event 20',
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
      title: 'Event 21',
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
