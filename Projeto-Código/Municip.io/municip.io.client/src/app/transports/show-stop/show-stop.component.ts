import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-show-stop',
  templateUrl: './show-stop.component.html',
  styleUrl: './show-stop.component.css'
})
export class ShowStopComponent {
  @Input() stopName: string = "";
  @Input() stopTime: string = "";
  @Input() stopId : string = "";



  constructor(private router: Router) { }


  calculateTimeRemaining(stopTime: string): string {
    const currentTime = new Date();
    const [hours, minutes] = stopTime.split(':');
    const stopTimeDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), Number(hours), Number(minutes));
    const timeDifference = stopTimeDate.getTime() - currentTime.getTime();
    const minutesRemaining = Math.floor(timeDifference / (1000 * 60));
    const hoursRemaining = Math.floor(minutesRemaining / 60);
    const minutesLeft = minutesRemaining % 60;

    let timeRemaining = "";
    if (hoursRemaining > 0) {
      timeRemaining += `em ${hoursRemaining.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')} horas`;
    } else if (minutesLeft > 0) {
      timeRemaining += `em ${minutesLeft.toString().padStart(2, '0')} minutos`;
    }

    if (timeRemaining === "") {
      timeRemaining = "Já passou";
    }
    return timeRemaining;
  }


  redirectToStop() {
    this.router.navigateByUrl(`/transports/stops/${this.stopId}`);

  }

}
