import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Service for news
 */
export class NewsService {

  /**
   * @constructor
   * NewsService
   * 
   * @param http 
   */
  constructor(private http : HttpClient) { }

  /**
   * Obtem a lista de noticias
   * 
   * @param municipality 
   * @returns A lista de noticias
   */
  getNews(municipality: string): Observable<News[]> {
    return this.http.get<News[]>(`api/news/GetNews?municipality=${municipality}`);
  }

  /**
   * Cria uma noticia
   * 
   * @param news A noticia a criar
   * @param image A imagem da noticia
   * @returns
   */
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

  /**
   * Apaga uma noticia
   * 
   * @param id O ID da noticia a apagar
   * @returns
   */
  deleteNews(id: string): Observable<any> {
    return this.http.delete('api/news/DeleteNews', { params: { id: id } });
  }

  /**
   * Atualiza uma noticia
   * 
   * @param news A noticia a atualizar
   * @param image A imagem da noticia
   * @returns
   */
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

  /**
   * Obtem uma noticia pelo ID
   * 
   * @param newsId O ID da noticia
   * @returns A noticia
   */
  getNewsById(newsId: string) {
    console.log("ID: ", newsId);
    return this.http.get<News>(`api/news/GetNewsById?newsId=${newsId}`);
  }

  /**
   * Paginação da página das notícias
   * 
   * @param page A pagina
   * @param itemsPerPage Número de itens por página
   * @param news Os notícias da pagina
   * @returns Os notícias da pagina
   */
  getPaginationNews(page = 1, itemsPerPage = 10, news: News[]): News[] {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log(news.slice(startIndex, endIndex));
    return news.slice(startIndex, endIndex);
  }
 }

export interface News {
  id: string;
  title: string;
  subtitle: string;
  mainText: string;
  photo?: string;
  date: Date;
  municipality: string;
}
