import { Component } from '@angular/core';
import { TransportsService, line, municipalityTransport, route } from '../../services/transports.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { BindQueryParamsFactory } from '@ngneat/bind-query-params';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.css'
})
export class SchedulesComponent {

  constructor(private service: TransportsService, private authService: UserAuthService, private router: Router,
    private routeParams: ActivatedRoute, private factory: BindQueryParamsFactory) { }


  //a variavle called lines to store the lines in json format array
  municipality: municipalityTransport | null = null;
  lines: line[] = [];
  routes: route[] = [];


  schedule: formSchedule = {
    line: "",
    route: ""
  }

  scheduleForm = new FormGroup({
    line: new FormControl("", [Validators.required]),
    route : new FormControl("", [Validators.required])
  });


  get line() {
    return this.scheduleForm.get('line');
  }

get route() {
    return this.scheduleForm.get('route');
  }


  bindQueryParamsManager = this.factory
    .create<formSchedule>([
      { queryKey: 'line' },
      { queryKey: 'route' }
    ]).connect(this.scheduleForm);



  ngOnDestroy() {
    this.bindQueryParamsManager.destroy();
  }

  async ngOnInit() {

   await this.getLines();

    this.scheduleForm.get('line')?.valueChanges.subscribe(async (value) => {
      await this.getCurrentRoutes(value || null);


      if (value === "") {
        this.scheduleForm.get("route")?.setValue("");
      } else if (!this.isRouteFromLine(this.scheduleForm.get('route')?.value || "")) {
        this.scheduleForm.get('route')?.setValue(this.routes[0].id);
      }

    });

    if (!this.lines.find(line => line.id === this.scheduleForm.get('line')?.value)) {
      this.scheduleForm.get('line')?.setValue("");
      this.scheduleForm.get('route')?.setValue("");
      return;
    } 


    await this.getCurrentRoutes(this.scheduleForm.get('line')?.value || null);


    if (!this.scheduleForm.get('route')?.value) {
      this.scheduleForm.get('route')?.setValue(this.routes[0].id);
    } else {
      if (!this.isRouteFromLine(this.scheduleForm.get('route')?.value || "")) {
        this.scheduleForm.get('route')?.setValue(this.routes[0].id);
      }
    }



    

  }


  isRouteFromLine(id: string): boolean{
    if (this.routes.find(route => route.id === id)) {
      return true;
    }
    return false;
  }

  
  async getLines() {

    const municipality = await this.authService.getMunicipality().toPromise();
    if (municipality) {
      const municip = await this.service.getMunicipalityByName(municipality).toPromise();
          if (municip) {
            this.municipality = municip;
            const newLines = await this.service.getLinesByMunicipalityId(municip.id).toPromise();
            if (newLines) {
                this.lines = newLines;         
              }
            }
          }
        }
      
    


  async getCurrentRoutes(line: string | null) {
    this.routes = [];
    if (line) {
      const selectedLine = this.lines.find(line => line.id === this.scheduleForm.get('line')?.value);
      if (selectedLine) {
        //for each route in the selected line, get the route and push it to the routes array
        for (let routeId of selectedLine.routes) {
        let route = await this.service.getRoute(routeId).toPromise();
        if (route && !this.routes.find(r => r.id === route!.id)) {
          this.routes.push(route);

              }
          }
      }
    }
  }


}

interface formSchedule {
  line: string;
  route : string;
}
