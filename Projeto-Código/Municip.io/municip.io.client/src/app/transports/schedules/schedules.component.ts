import { Component } from '@angular/core';
import { TransportsService, line, municipalityTransport, pattern, route } from '../../services/transports.service';
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
  patterns: pattern[] = [];


  schedule: formSchedule = {
    line: "",
    route: "",
    pattern: ""
  }

  scheduleForm = new FormGroup({
    line: new FormControl("", [Validators.required]),
    route: new FormControl("", [Validators.required]),
    pattern: new FormControl("", [Validators.required])
  });


  get line() {
    return this.scheduleForm.get('line');
  }

get route() {
    return this.scheduleForm.get('route');
  }

  get pattern() {
return this.scheduleForm.get('pattern');
  }


  bindQueryParamsManager = this.factory
    .create<formSchedule>([
      { queryKey: 'line' },
      { queryKey: 'route' },
      { queryKey: 'pattern' }
    ]).connect(this.scheduleForm);



  ngOnDestroy() {
    this.bindQueryParamsManager.destroy();
  }

  async ngOnInit() {

   await this.getLines();

    this.scheduleForm.get('line')?.valueChanges.subscribe(async (value) => {
      await this.getCurrentRoutesAndPatterns();


      if (value === "") {
        this.scheduleForm.get("route")?.setValue("");
      } else if (!this.isRouteFromLine(this.scheduleForm.get('route')?.value || "")) {
        this.scheduleForm.get('route')?.setValue(this.routes[0].id);
      }

    });

    this.scheduleForm.get("route")?.valueChanges.subscribe(async (value) => {
      await this.getCurrentPatterns(this.scheduleForm.get('route')?.value || null);

      if (value === "") {
        this.scheduleForm.get("pattern")?.setValue(this.patterns[0].id);
      } else if (!this.patterns.find(pattern => pattern.id === this.scheduleForm.get('pattern')?.value)) {
        this.scheduleForm.get('pattern')?.setValue(this.patterns[0].id);
      }


    });



    if (!this.lines.find(line => line.id === this.scheduleForm.get('line')?.value)) {
      this.scheduleForm.get('line')?.setValue("");
      this.scheduleForm.get('route')?.setValue("");
      this.scheduleForm.get('pattern')?.setValue("");
      return;
    } 


    await this.getCurrentRoutesAndPatterns();

    if (!this.scheduleForm.get('route')?.value) {
      this.scheduleForm.get('route')?.setValue(this.routes[0].id);
    } else {
      if (!this.isRouteFromLine(this.scheduleForm.get('route')?.value || "")) {
        this.scheduleForm.get('route')?.setValue(this.routes[0].id);
      }
    }



if (!this.scheduleForm.get('pattern')?.value) {
      this.scheduleForm.get('pattern')?.setValue(this.patterns[0].id);
    } else {
      if (!this.patterns.find(pattern => pattern.id === this.scheduleForm.get('pattern')?.value)) {
        this.scheduleForm.get('pattern')?.setValue(this.patterns[0].id);
      }
    }


  }


  isRouteFromLine(id: string): boolean{
    if (this.routes.find(route => route.id === id)) {
      return true;
    }
    return false;
  }


  //function to get current routes and patterns
  async getCurrentRoutesAndPatterns() {
    await this.getCurrentRoutes(this.scheduleForm.get('line')?.value || null);
    await this.getCurrentPatterns(this.scheduleForm.get('route')?.value || null);
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


  async getCurrentPatterns(route: string | null) {
this.patterns = [];
    if (route) {
      const selectedRoute = this.routes.find(route => route.id === this.scheduleForm.get('route')?.value);
      if (selectedRoute) {
        for (let patternId of selectedRoute.patterns) {
          let pattern = await this.service.getPattern(patternId).toPromise();
          if (pattern) {
            this.patterns.push(pattern);
          }
        }
      }
    }
  }


}

interface formSchedule {
  line: string;
  route: string;
  pattern: string;
}
