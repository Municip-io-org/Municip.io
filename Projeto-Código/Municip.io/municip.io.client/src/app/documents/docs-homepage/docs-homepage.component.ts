import { Component } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-docs-homepage',
  templateUrl: './docs-homepage.component.html',
  styleUrl: './docs-homepage.component.css'
})
export class DocsHomepageComponent {

  municipality: string = '';

  constructor(private service: UserAuthService) {
    service.getMunicipality().toPromise().then((municipality) => {
      this.municipality = municipality || '';
    });
  }

}
