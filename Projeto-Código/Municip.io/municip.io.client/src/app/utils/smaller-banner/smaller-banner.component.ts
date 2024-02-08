import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-smaller-banner',
  templateUrl: './smaller-banner.component.html',
  styleUrl: './smaller-banner.component.css'
})
export class SmallerBannerComponent {
  @Input() title: string = "";
  @Input() text: string = "";
  @Input() image: string = "";
}
