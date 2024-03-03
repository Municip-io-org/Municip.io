import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http : HttpClient) { }

  getNews(municipality: string): Observable<News[]> {
    return this.http.get<News[]>(`api/news/GetNews?municipality=${municipality}`);
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
        
        return this.http.post<News>('/api/news/CreateNews', news);
      }));
  }

  deleteNews(id: string): Observable<any> {
    return this.http.delete('api/news/DeleteNews', { params: { id: id } });
  }

  updateNews(news: News, image: File): Observable<News> {
    const headers = new HttpHeaders({ 'authorization': 'Client-ID a9e7323ad868dd2' });
    const imgurl = "https://api.imgur.com/3/image";
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(imgurl, formData, { headers }).pipe(
      switchMap((response: any) => {
        news.photo = response['data']['link'];
        console.log(news);
        return this.http.put<News>('/api/news/UpdateNews', news);
      }));
  }

  getNewsById(newsId: string) {
    console.log("ID: ", newsId);
    return this.http.get<News>(`api/news/GetNewsById?newsId=${newsId}`);
  }
 }

export interface News {
  title: string;
  subtitle: string;
  mainText: string;
  photo?: string;
  date: Date;
  municipality: string;
}
