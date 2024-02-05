import { Component } from '@angular/core';
import { TransportsService, line, municipalityTransport } from '../../services/transports.service';
import { ActivatedRoute } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.css'
})
export class SchedulesComponent {

  constructor(private service: TransportsService, private authService: UserAuthService, private route: ActivatedRoute  ) { }


  //a variavle called lines to store the lines in json format array
  municipality: municipalityTransport | null = null;
  lines : line[] = [];

  ngOnInit(): void {

    
    this.authService.getMunicipality().subscribe((municipality) => {
      if (municipality) {
        this.service.getMunicipalityByName(municipality).subscribe((municip) => {
          console.log(municipality);
          if (municip) {
            this.municipality = municip;
              this.service.getLinesByMunicipalityId(municip.id).subscribe((lines) => {
              if (lines) {
                this.lines = lines;
              }
            });
          }      
        });
      }
    });

    

  }

}
