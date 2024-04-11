import { Component } from '@angular/core';
import { TransportsService, line, municipalityTransport, pattern, route, stop, stopTime, trip } from '../../services/transports.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { BindQueryParamsFactory } from '@ngneat/bind-query-params';

/**
 * Componente para a página de horários.
 */
@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.css'
})
export class SchedulesComponent {
   

  /**
   * Método construtor para instanciar o componente.
   * @param service serviço TransportsService
   * @param authService UserAuthService
   * @param router Router
   * @param routeParams ActivatedRoute
   * @param factory BindQueryParamsFactory
   */
  constructor(private service: TransportsService, private authService: UserAuthService, private router: Router,
    private routeParams: ActivatedRoute, private factory: BindQueryParamsFactory) { }


  municipality: municipalityTransport | null = null;
  lines: line[] = [];
  routes: route[] = [];
  patterns: pattern[] = [];
  trips: trip[] = [];
  path: stop[] | null = [];
  schedule: stopTime[] | null = [];
  lineSelected : line | null = null;
  selectedStopId: string = '';

  scheduleForm = new FormGroup({
    line: new FormControl(""),
    route: new FormControl(""),
    pattern: new FormControl(""),
    trip: new FormControl("" ),
    date: new FormControl("")
  });

  tableArrivalTimes: any[] | undefined;

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



    /**
     * Método on destroy
     */
  ngOnDestroy() {
    this.bindQueryParamsManager.destroy();
  }
  /**
   * método on init
   * @returns
   */
  async ngOnInit() {

   
    this.scheduleForm.get('line')?.valueChanges.subscribe(async (value) => {

      await this.getCurrentRoutesAndPatternsAndTrips();
      await this.handleLineChange(value || "");
    });

    this.scheduleForm.get("route")?.valueChanges.subscribe(async (value) => {


      await this.getCurrentRoutesAndPatternsAndTrips();

     await this.handleRouteChange(value || "")

    });


    this.scheduleForm.get("pattern")?.valueChanges.subscribe(async (value) => {


      await this.getCurrentRoutesAndPatternsAndTrips();


      await this.handlePatternChange(value || "");


      this.getCurrentPath(value);




    });


    this.scheduleForm.get("date")?.valueChanges.subscribe(async (value) => {
      await this.getCurrentRoutesAndPatternsAndTrips();

      await this.handleDateChange(value || "");

      
    });

    this.scheduleForm.get("trip")?.valueChanges.subscribe( async (value) => {
      this.getCurrentSchedule(value || "");

    });




    this.handleDateChange(this.scheduleForm.get('date')?.value || "");

    
    await this.getLines();


    if (!this.lines.find(line => line.id === this.scheduleForm.get('line')?.value)) {
      this.scheduleForm.get('line')?.setValue("");
      this.scheduleForm.get('route')?.setValue("");
      this.scheduleForm.get('pattern')?.setValue("");
      this.scheduleForm.get('trip')?.setValue("");
      return;
    } 


    await this.getCurrentRoutesAndPatternsAndTrips();


    this.handleLineChange(this.scheduleForm.get('line')?.value || "");
    

    this.handleRouteChange(this.scheduleForm.get('route')?.value || "");
    

    this.handlePatternChange(this.scheduleForm.get('pattern')?.value || "");

    
    console.log(this.tableArrivalTimes);

  }

  /**
   * Método que junta as horas e os munutos 
   * @param trips viagens
   * @returns o resultado
   */
  groupByHourAndMinute(trips: any[]): any[] {

    const arrivalTimes = trips
      .map(trip => trip.schedule.find((schedule: { stop_id: string; }) => schedule.stop_id === this.selectedStopId)?.arrival_time)
      .filter(time => time !== undefined); // Remove undefined values

    const groupedTimes: any[] = [];
    const hourMinuteMap: { [hour: string]: { [minute: string]: string[] } } = {};

    // Group arrival times by hour and minute
    arrivalTimes.forEach(time => {
      const [hour, minute] = time.split(':');
      if (!hourMinuteMap[hour]) {
        hourMinuteMap[hour] = {};
      }
      if (!hourMinuteMap[hour][minute]) {
        hourMinuteMap[hour][minute] = [];
      }
      hourMinuteMap[hour][minute].push(time);
    });

    // Format grouped times
    Object.keys(hourMinuteMap).forEach(hour => {
      const minuteGroups = hourMinuteMap[hour];
      const formattedMinuteGroups = Object.keys(minuteGroups)
        .sort((a, b) => parseInt(a) - parseInt(b)) // Sort minutes numerically
        .map(minute => ({
          minute: parseInt(minute),
          times: minuteGroups[minute]
        }));
      groupedTimes.push({
        hour: parseInt(hour),
        minuteGroups: formattedMinuteGroups
      });
    });

    // Sort grouped times by hour
    groupedTimes.sort((a, b) => a.hour - b.hour);

    

    return groupedTimes;
  }



  /**
   * Método do clique numa stop
   * @param stopId stop id
   */
  handleStopClicked(stopId: string) {
    console.log("Stop ID clicked:", stopId);
    this.selectedStopId = stopId;
    this.tableArrivalTimes = this.groupByHourAndMinute(this.trips);
  }




  /**
   * Método do clique numa linha
   * @param value valor 
   */
  async handleLineChange(value: string) {
    this.lineSelected = this.lines.find(line => line.id === value) || null;

    if (value === "") {
      //caso o valor seja vazio, então tudo terá que ser resetado
      this.scheduleForm.get("route")?.setValue("");
      this.scheduleForm.get("pattern")?.setValue("");
      this.scheduleForm.get("trip")?.setValue("");
    } else if (!this.isRouteFromLine(this.scheduleForm.get('route')?.value || "")) {
      this.scheduleForm.get('route')?.setValue(this.routes[0].id);
    }
  }

  /**
   * Método do clique numa rota
   * @param value valor
   */
  async handleRouteChange(value: string) {

    if (value === "") {
    this.scheduleForm.get("pattern")?.setValue(this.patterns[0].id || "");
    } else if (!this.patterns.find(pattern => pattern.id === this.scheduleForm.get('pattern')?.value)) {
      this.scheduleForm.get('pattern')?.setValue(this.patterns[0].id || "");
    }



  }
  /**
   * Método do clique numa pattern
   * @param value valor
   */
  async handlePatternChange(value: string) {


    if (value === "") {
      this.scheduleForm.get("trip")?.setValue(this.trips[0].id || "");
    } else if (!this.trips.find(trip => trip.id === this.scheduleForm.get('trip')?.value)) {
      this.scheduleForm.get('trip')?.setValue(this.trips[0].id || "");
    }



  }
  /**
   * Método do clique de uma data
   * @param value valor
   */
  async handleDateChange(value: string) {
   

    if (!value || value.length !== 10 || value[4] !== "-" || value[7] !== "-") {
       const currentDate = new Date().toISOString().substring(0, 10);
      this.scheduleForm.get('date')?.setValue(currentDate);
    }


    this.scheduleForm.get('trip')?.setValue(this.trips[0].id || "");
  }






  /**
   * retorna se a rota é da linha
   * @param id id da rota
   * @returns o resultado
   */
  isRouteFromLine(id: string): boolean{
    if (this.routes.find(route => route.id === id)) {
      return true;
    }
    return false;
  }

  /**
   * Método para obter as rotas e patterns e trips
   */
  async getCurrentRoutesAndPatternsAndTrips() {
    await this.getCurrentRoutes(this.scheduleForm.get('line')?.value || null);
    await this.getCurrentPatterns(this.scheduleForm.get('route')?.value || null);
    this.getCurrentTrips(this.scheduleForm.get('pattern')?.value || null);
    this.getCurrentPath(this.scheduleForm.get('pattern')?.value || null);
    this.getCurrentSchedule(this.scheduleForm.get('trip')?.value || null);
  }



  /**
   * Retorna as linhas do municipio
   */
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
      
    

/**
 * Retorna as rota da linha
 * @param line linha
 */
  async getCurrentRoutes(line: string | null) {
    this.routes = [];
    if (line) {
      const selectedLine = this.lines.find(line => line.id === this.scheduleForm.get('line')?.value);
      if (selectedLine) {
        for (let routeId of selectedLine.routes) {
        let route = await this.service.getRoute(routeId).toPromise();
        if (route && !this.routes.find(r => r.id === route!.id)) {
          this.routes.push(route);

              }
          }
      }
    }
  }

  /**
   * Retorna as patterns da rota
   * @param route rota
   */
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

  /**
   * Retorna as trips da pattern
   * @param pattern
   */
  getCurrentTrips(pattern: string | null) {
    this.trips = [];
    if (pattern) {
      const selectedPattern = this.patterns.find(pattern => pattern.id === this.scheduleForm.get('pattern')?.value);
      if (selectedPattern) {
        for (let trip of selectedPattern.trips) {
          if (trip && trip.dates.includes(this.scheduleForm.get('date')?.value?.replace(/-/g, '') || "") && trip.schedule.length > 0) {
            this.trips.push(trip);
          }
        }
        this.trips.sort((a, b) => {
          const arrivalTimeA = a.schedule[0].arrival_time;
          const arrivalTimeB = b.schedule[0].arrival_time;
          return arrivalTimeA.localeCompare(arrivalTimeB);
        });
      }
    }
    console.log(this.trips);
  }

  /**
   * Retorna o path da pattern 
   * @param pattern pattern
   */
  getCurrentPath(pattern: string | null) {
    let patternSelected = this.patterns.find(p => p.id === pattern);
    this.path = patternSelected ? patternSelected.path : null;
    console.log(this.path);
  }

  /**
   * Retorna o schedule da trip
   * @param trip tripe
   */
  getCurrentSchedule(trip : string | null) {
    let tripSelected = this.trips.find(t=> t.id ===  trip);
    this.schedule = tripSelected ? tripSelected.schedule : null;

    if (this.schedule) this.selectedStopId = this.schedule![0].stop_id;
    this.tableArrivalTimes = this.groupByHourAndMinute(this.trips);
    console.log(this.schedule);
  }

  /**
   * Formata o tempo
   * @param time tempo
   * @returns a formatação
   */
  formatTime(time: string): string {
    return time.substring(0, 5);
  }

  /**
   * Retorna o nome do stop pela id
   * @param id id da stop
   * @returns nome da stop
   */
  getNameStopById(id: string): string {
    if (this.path) {
      let stop = this.path.find(stop => stop.stop.id === id);
      return stop ? stop.stop.name : "";
    }
    return "";

  }

  /**
   * Nome da localidade pela stop id
   * @param id stop id
   * @returns o resultado
   */
  getLocalityStopById(id : string): string {
    if (this.path) {
      let stop = this.path.find(stop => stop.stop.id === id);
      return stop ? stop.stop.municipality_name : "";
    }
    return "";
  }


  /**
   * Verifica se existem trips
   * @returns o resultado
   */
  iswithoutTrips(): boolean {
    if (this.trips.length === 0 && this.scheduleForm.get('pattern')?.value !== "") {
      return true;
    }
    return false;

  }

}

interface formSchedule {
  line: string;
  route: string;
  pattern: string;
  trip: string;
  date: string;
}
