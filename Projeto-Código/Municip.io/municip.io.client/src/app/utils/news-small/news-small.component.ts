import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-small',
  templateUrl: './news-small.component.html',
  styleUrl: './news-small.component.css'
})
export class NewsSmallComponent {
  @Input() image: string = "";
  @Input() title: string = "";
  @Input() text: string = "";
  @Input() newsId: string ="";


  constructor(private router: Router) { }

goToNewsPage() {
    this.router.navigateByUrl(`news/${this.newsId}`);
  }
}
