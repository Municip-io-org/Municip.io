import { Component, EventEmitter, Input, Output } from '@angular/core';
import { News, NewsService } from '../../services/news/news.service';
import { Roles, UserAuthService } from '../../services/user-auth.service';

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

  constructor(private newsService: NewsService, private userAuthService: UserAuthService) { }

  role : string = "";

  ngOnInit() {
    this.userAuthService.getUserRole().subscribe(
      res => {
       
          this.role = res.role;

        
      },
      error => {
        console.error(error);
      }
    );

  }

  deleteCurrent(news: any) {
    this.deleteid.emit(news.id);
    
  }
}
