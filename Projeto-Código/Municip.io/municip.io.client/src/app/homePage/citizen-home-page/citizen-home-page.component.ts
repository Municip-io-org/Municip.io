import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-citizen-home-page',
  templateUrl: './citizen-home-page.component.html',
  styleUrl: './citizen-home-page.component.css',
})
export class CitizenHomePageComponent {
  public date1 = new Date(2000, 0, 10);

  public events = [
    { image: '/assets/images/carnaval.jpg', title: 'Event 1', date: new Date(2000, 0, 11) },
    { image: '/assets/images/carnaval.jpg', title: 'Event 2', date: new Date(2000, 0, 12) },
    { image: '/assets/images/carnaval.jpg', title: 'Event 3', date: new Date(2000, 0, 13) },
    { image: '/assets/images/carnaval.jpg', title: 'Event 4', date: new Date(2000, 0, 14) },
    { image: '/assets/images/carnaval.jpg', title: 'Event 5', date: new Date(2000, 0, 15) }, 
  ];

  public startIndex = 0;

  moveLeft() {
    if (this.startIndex > 0) {
      this.startIndex--;
    }
  }

  moveRight() {
    if (this.startIndex < this.events.length - 4) {
      this.startIndex++;
    }
  }
}

