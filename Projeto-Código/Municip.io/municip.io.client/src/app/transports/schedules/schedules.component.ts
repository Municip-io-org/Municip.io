import { Component } from '@angular/core';
import { TransportsService, line, municipalityTransport, route } from '../../services/transports.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.css'
})
export class SchedulesComponent {

  constructor(private service: TransportsService, private authService: UserAuthService, private router: Router,
    private routeParams: ActivatedRoute) { }


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



  async ngOnInit() {

   await this.getLines();



    this.scheduleForm.valueChanges
      .subscribe( async (value) => {


        //this.schedule.line = value.line || "";
        //this.schedule.route = value.route || "";




        this.router.navigate(['/schedules'], {
          queryParams:
          {
            line: value.line,
            route: value.route
          }
        }).then(() => {


          this.readParams();

        })



      });


    await this.readParams();
      



  }


  isRouteFromLine(id: string): boolean{
    if (this.routes.find(route => route.id === id)) {
      return true;
    }
    return false;
  }


  async readParams() {

    const params = this.routeParams.snapshot.queryParams;
    if (params['line'] && this.schedule.line !== params['line']) {


      //checck if the line is in the lines array
      if (!this.lines.find(line => line.id === params['line'])) {
        await this.cleanQueryString();
        return;
      }


      this.schedule.line = params['line'];
      this.scheduleForm.get('line')?.setValue(params['line']);
        await this.getCurrentRoutes(params['line'] || null);

      if (params['route'] && this.schedule.route !== params['route']) {
        let routeParams = params['route'];
          //if is a route from the line, set the route value to the routeParams
        if (this.isRouteFromLine(routeParams)) {
          this.schedule.route = routeParams;
            this.scheduleForm.get('route')?.setValue(routeParams);
          } else {
          //if is not a route from the line, set the route value to the first route in the routes array
          this.schedule.route = this.routes[0].id;
            this.scheduleForm.get('route')?.setValue(this.routes[0].id);
          }

      } else {

        this.schedule.route = this.routes[0].id;
         this.scheduleForm.get('route')?.setValue(this.routes[0].id);

        }

      }
   


    
  }

  //function to clean the form and the query params
  async cleanQueryString() {

    this.router.navigate(['/schedules'], {
      queryParams:
      {
        line: null,
        route: null
      }
    })
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
      const selectedLine = this.lines.find(line => line.id === this.schedule.line);
      if (selectedLine) {
        //for each route in the selected line, get the route and push it to the routes array
      for(let routeId of selectedLine.routes) {
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
