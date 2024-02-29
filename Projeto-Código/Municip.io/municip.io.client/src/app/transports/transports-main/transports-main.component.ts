import { Component } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-transports-main',
  templateUrl: './transports-main.component.html',
  styleUrl: './transports-main.component.css'
})
export class TransportsMainComponent {


  municipality: string = '';

  constructor(private service: UserAuthService) {
    service.getMunicipality().toPromise().then((municipality) => {
      this.municipality = municipality || '';
    });
  }


  ngOnInit(): void {
  }



}
