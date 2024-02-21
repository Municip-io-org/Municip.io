import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

constructor(private titleService: Title) {
    this.titleService.setTitle("Municip.io Landing");
  }

}
