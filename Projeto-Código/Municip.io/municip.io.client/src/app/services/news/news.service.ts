import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http : HttpClient) { }

  getNews(): Observable<News[]> {
    return this.http.get<News[]>('api/events/GetNews');
  }

createNews(news: News): Observable<News> {
    return this.http.post<News>('api/news/CreateNews', news);
  }

deleteNews(id: string): Observable<any> {
    return this.http.delete('api/news/DeleteNews', { params: { id: id } });
  }
}

export interface News {
  id: string;
  title: string;
  subtitle: string;
  mainText: string;
  photo: string;
  date: Date;
}
