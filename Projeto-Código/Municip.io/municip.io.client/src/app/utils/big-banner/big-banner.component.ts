import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-big-banner',
  templateUrl: './big-banner.component.html',
  styleUrl: './big-banner.component.css'
})
export class BigBannerComponent {
  @Input() image: string = "";
  @Input() title: string = "";
  @Input() text: string = "";

}
