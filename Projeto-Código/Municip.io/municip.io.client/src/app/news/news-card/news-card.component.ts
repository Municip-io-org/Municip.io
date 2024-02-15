import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.css'
})
export class NewsCardComponent {
  @Input() title: string= "TITULO da noticia";
  @Input() subtitle: string = "subsubsubsubsubsusbubsubsubsusb";
  @Input() image: string = "/assets/images/admin/banner.jpg";
  @Input() date: string = "27/3/2012";

}
