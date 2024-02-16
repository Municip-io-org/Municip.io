import { Component } from '@angular/core';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css'
})
export class NewsListComponent {

newsList = [
    {
      title: "TITULO da noticia",
      subtitle: "subsubsubsubsubsusbubsubsubsusb",
      image: "/assets/images/admin/banner.jpg",
      date: "27/3/2012"
    },
    {
      title: "TITULO da noticia2",
      subtitle: "subsubsubsubsubsusbubsubsubsusb2",
      image: "/assets/images/admin/banner.jpg",
      date: "28/3/2012"
    },];
}
