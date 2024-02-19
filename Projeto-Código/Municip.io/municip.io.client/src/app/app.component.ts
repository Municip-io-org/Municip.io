import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from './route-animation';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';


registerLocaleData(localePt, 'pt-PT');


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
