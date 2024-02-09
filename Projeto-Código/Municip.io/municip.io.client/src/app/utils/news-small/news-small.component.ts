import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-news-small',
  templateUrl: './news-small.component.html',
  styleUrl: './news-small.component.css'
})
export class NewsSmallComponent {
  @Input() image: string = "";
  @Input() title: string = "";
  @Input() text: string = "";
}
