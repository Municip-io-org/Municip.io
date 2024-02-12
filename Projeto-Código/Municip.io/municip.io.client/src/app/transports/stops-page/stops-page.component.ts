import { Component } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-stops-page',
  templateUrl: './stops-page.component.html',
  styleUrl: './stops-page.component.css'
})
export class StopsPageComponent {
  municipality: string = '';



  constructor(private service: UserAuthService) {
    service.getMunicipality().toPromise().then((municipality) => {
      this.municipality = municipality || '';
     
    });
  }

}
