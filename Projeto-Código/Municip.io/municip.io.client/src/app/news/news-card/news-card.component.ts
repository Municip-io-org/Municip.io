import { Component, EventEmitter, Input, Output } from '@angular/core';
import { News, NewsService } from '../../services/news/news.service';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.css'
})
export class NewsCardComponent {
  @Input() title: string= "TITULO da noticia";
  @Input() subtitle: string = "subsubsubsubsubsusbubsubsubsusb";
  @Input() image: string = "";
  @Input() date: string = "27/3/2012";
  @Input() id: string ="";
  @Output() deleteid = new EventEmitter<string>();;

  constructor(private newsService: NewsService) { }

  deleteCurrent(news: any) {
    this.deleteid.emit(news.id);
    
  }
}
