import { Component } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-library-homepage',
  templateUrl: './library-homepage.component.html',
  styleUrl: './library-homepage.component.css'
})
export class LibraryHomepageComponent {

  municipality: string = '';

  constructor(private service: UserAuthService) {
    service.getMunicipality().toPromise().then((municipality) => {
      this.municipality = municipality || '';
    });
  }

}


