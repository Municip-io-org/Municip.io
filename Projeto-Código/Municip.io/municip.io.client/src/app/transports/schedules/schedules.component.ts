import { Component } from '@angular/core';
import { TransportsService, line, municipalityTransport, pattern, route, stop, stopTime, trip } from '../../services/transports.service';
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
  trips: trip[] = [];
  path: stop[] | null = [];
  schedule: stopTime[] | null = [];


  scheduleForm = new FormGroup({
    line: new FormControl("", [Validators.required]),
    route: new FormControl("", [Validators.required]),
    pattern: new FormControl("", [Validators.required]),
    trip: new FormControl("", [Validators.required]),
    date: new FormControl("", [Validators.required])
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

  get trip () {
    return this.scheduleForm.get('trip');
  }

  get date() {
return this.scheduleForm.get('date');
  }


  bindQueryParamsManager = this.factory
    .create<formSchedule>([
      { queryKey: 'line' },
      { queryKey: 'route' },
      { queryKey: 'pattern' },
      { queryKey: 'trip' },
      { queryKey: 'date' }
    ]).connect(this.scheduleForm);



  ngOnDestroy() {
    this.bindQueryParamsManager.destroy();
  }

  async ngOnInit() {

    if (!this.scheduleForm.get('date')?.value) {
      const currentDate = new Date().toISOString().substring(0, 10);
      this.scheduleForm.get('date')?.setValue(currentDate);
    }


   await this.getLines();

    this.scheduleForm.get('line')?.valueChanges.subscribe(async (value) => {
      await this.getCurrentRoutesAndPatternsAndTrips();


      if (value === "") {
        this.scheduleForm.get("route")?.setValue("");
      } else if (!this.isRouteFromLine(this.scheduleForm.get('route')?.value || "")) {
        this.scheduleForm.get('route')?.setValue(this.routes[0].id);
      }

    });

    this.scheduleForm.get("route")?.valueChanges.subscribe(async (value) => {
      await this.getCurrentPatterns(this.scheduleForm.get('route')?.value || null);

      if (value === "") {
        this.scheduleForm.get("pattern")?.setValue(this.patterns[0].id || "");
      } else if (!this.patterns.find(pattern => pattern.id === this.scheduleForm.get('pattern')?.value)) {
        this.scheduleForm.get('pattern')?.setValue(this.patterns[0].id || "");
      }


    });


    this.scheduleForm.get("pattern")?.valueChanges.subscribe(async (value) => {
      this.getCurrentTrips(this.scheduleForm.get('pattern')?.value || null);

      if (value === "") {
        this.scheduleForm.get("trip")?.setValue(this.trips[0].id || "");
      } else if (!this.trips.find(trip => trip.id === this.scheduleForm.get('trip')?.value)) {
        this.scheduleForm.get('trip')?.setValue(this.trips[0].id|| "");
      }

      let patternSelected = this.patterns.find(pattern => pattern.id === this.scheduleForm.get('pattern')?.value);
      this.path = patternSelected ? patternSelected.path : null;




    });


    this.scheduleForm.get("date")?.valueChanges.subscribe(async (value) => {
        await this.getCurrentRoutesAndPatternsAndTrips();
    });

    this.scheduleForm.get("trip")?.valueChanges.subscribe( (value) => {
      let tripSelected = this.trips.find(trip => trip.id === value);
      this.schedule = tripSelected ? tripSelected.schedule : null;

    });





    if (!this.lines.find(line => line.id === this.scheduleForm.get('line')?.value)) {
      this.scheduleForm.get('line')?.setValue("");
      this.scheduleForm.get('route')?.setValue("");
      this.scheduleForm.get('pattern')?.setValue("");
      this.scheduleForm.get('trip')?.setValue("");
      return;
    } 


    await this.getCurrentRoutesAndPatternsAndTrips();

    if (!this.scheduleForm.get('route')?.value) {
      this.scheduleForm.get('route')?.setValue(this.routes[0].id || "");
    } else {
      if (!this.isRouteFromLine(this.scheduleForm.get('route')?.value || "")) {
        this.scheduleForm.get('route')?.setValue(this.routes[0].id || "");
      }
    }



if (!this.scheduleForm.get('pattern')?.value) {
      this.scheduleForm.get('pattern')?.setValue(this.patterns[0].id || "");
    } else {
      if (!this.patterns.find(pattern => pattern.id === this.scheduleForm.get('pattern')?.value)) {
        this.scheduleForm.get('pattern')?.setValue(this.patterns[0].id || "");
      }
    }


    if (!this.scheduleForm.get('trip')?.value) {
      this.scheduleForm.get('trip')?.setValue(this.trips[0].id || "");
    } else {
      if(!this.trips.find(trip => trip.id === this.scheduleForm.get('trip')?.value)) {
        this.scheduleForm.get('trip')?.setValue(this.trips[0].id || "");
      }
    }


    let patternSelected = this.patterns.find(pattern => pattern.id === this.scheduleForm.get('pattern')?.value);
    this.path = patternSelected ? patternSelected.path : null;
    let tripSelected = this.trips.find(trip => trip.id === this.scheduleForm.get('trip')?.value);
    this.schedule = tripSelected ? tripSelected.schedule : null;



  }


  isRouteFromLine(id: string): boolean{
    if (this.routes.find(route => route.id === id)) {
      return true;
    }
    return false;
  }


  //function to get current routes and patterns
  async getCurrentRoutesAndPatternsAndTrips() {
    await this.getCurrentRoutes(this.scheduleForm.get('line')?.value || null);
    await this.getCurrentPatterns(this.scheduleForm.get('route')?.value || null);
    this.getCurrentTrips(this.scheduleForm.get('pattern')?.value || null);
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


  getCurrentTrips(pattern: string | null) {
    this.trips = [];
    if (pattern) {
      const selectedPattern = this.patterns.find(pattern => pattern.id === this.scheduleForm.get('pattern')?.value);
      if (selectedPattern) {
        for (let trip of selectedPattern.trips) {
          if (trip && trip.dates.includes(this.scheduleForm.get('date')?.value?.replace(/-/g, '') || "")) {
            this.trips.push(trip);
          }
        }
      }
    }
  }


  formatTime(time: string): string {
    return time.substring(0, 5);
  }


  getNameStopById(id: string): string {
    if (this.path) {
      let stop = this.path.find(stop => stop.stop.id === id);
      
      return stop ? stop.stop.name : "";
    }
    return "";

  }

}

interface formSchedule {
  line: string;
  route: string;
  pattern: string;
  trip: string;
  date: string;
}
