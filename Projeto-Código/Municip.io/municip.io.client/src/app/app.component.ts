import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from './route-animation';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {


  constructor(private http: HttpClient, private primeNgConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primeNgConfig.ripple = true;
  }


  title = 'municip.io.client';
}
