import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocsService {

  constructor(private http: HttpClient) { }


  createTemplate(template: any): Observable<any> {



    return this.http.post<any>('/api/documents/CreateTemplate', template);



  }
}
