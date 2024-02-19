import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-next-news',
  templateUrl: './next-news.component.html',
  styleUrl: './next-news.component.css'
})
export class NextNewsComponent {
  @Input() newsList: any[] = [];
  @Input() municipalityName: string = "";
}
