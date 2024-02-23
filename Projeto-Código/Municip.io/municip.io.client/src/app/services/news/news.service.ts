import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http : HttpClient) { }

  getNews(): Observable<News[]> {
    return this.http.get<News[]>('api/events/GetNews');
  }

  createNews(news: News, image: File): Observable<News> {
    var headers = new HttpHeaders({ 'authorization': 'Client-ID a9e7323ad868dd2' });
    let imgurl = "https://api.imgur.com/3/image";

    //upload to imgur
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(imgurl, formData, { headers })
      .pipe(switchMap((response: any) => {
        console.log(response);
        news.photo = response['data']['link'];
        console.log(news);
        console.log(news.photo);
        console.log("NODNAODNAODNAODAODNAONDADNOADNAONDOADOANDOADNOADOA ",news);
        return this.http.post<News>('/api/news/CreateNews', news);
      }));
  }

  deleteNews(id: string): Observable<any> {
    return this.http.delete('api/news/DeleteNews', { params: { id: id } });
  }
 }

export interface News {
  title: string;
  subtitle: string;
  mainText: string;
  photo?: string;
  date: Date;
  Municipality: string;
}
