import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from './route-animation';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {


  constructor(private http: HttpClient) {}

  ngOnInit() {

  }


  title = 'municip.io.client';
}
