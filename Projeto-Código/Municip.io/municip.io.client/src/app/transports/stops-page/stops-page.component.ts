import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-stops-page',
  templateUrl: './stops-page.component.html',
  styleUrls: ['./stops-page.component.css']
})
export class StopsPageComponent implements OnInit {
  municipality: string = '';
  selectedStop: string = '';

  constructor(private service: UserAuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectedStop = this.route.snapshot.params['selectedStop'];

    console.log("teste:" + this.selectedStop)

    this.service.getMunicipality().toPromise().then((municipality) => {
      this.municipality = municipality || '';
      console.log(municipality)
    });
  }
}
