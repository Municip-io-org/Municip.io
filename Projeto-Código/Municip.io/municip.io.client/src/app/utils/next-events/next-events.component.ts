import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-next-events',
  templateUrl: './next-events.component.html',
  styleUrls: ['./next-events.component.css']
})
export class NextEventsComponent {
  @Input() events: any[] = [];
  @Input() municipalityName: string = "";

  startIndex: number = 0;

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
