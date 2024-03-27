import { Injectable } from '@angular/core';
import { Citizen } from '../citizen-auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient) { }







  getRequests(): Observable<BookRequest[]> {
    return this.http.get<BookRequest[]>('api/Book/GetRequests');
  }

  getRequestsByMunicipality(municipality: string): Observable<BookRequest[]> {
    return this.http.get<BookRequest[]>(`api/Book/GetRequestsByMunicipality?municipality=${municipality}`);
  }

  deleteRequest(requestId: number): Observable<any> {
    return this.http.delete(`api/Book/DeleteRequest?requestId=${requestId}`);
  }

  denyRequest(requestId: number): Observable<any> {
    return this.http.post(`api/Book/DenyRequest?requestId=${requestId}`, null);
  }

  borrowBook(requestId: number, returnDate: Date): Observable<any> {
    return this.http.post(`api/Book/BorrowBook?requestId=${requestId}`, returnDate);

  }

  createRequest(email: string, request: BookRequest): Observable<any> {
    return this.http.post(`api/Book/CreateRequest/${email}`, request);
  }

  delayRequest(requestId: number): Observable<any> {
    return this.http.post(`api/Book/DelayRequest?requestId=${requestId}`, null);
  }

  deliverBook(requestId: number): Observable<any> {
    return this.http.post(`api/Book/DeliverBook?requestId=${requestId}`, null);
  }


  sendDelayedEmail(email: string, name: string, bookImage: string, bookName: string, bookAuthor: string, returnDate: string) {
    return this.http.post(`api/Book/SendDelayedEmail?email=${email}&name=${name}&bookImage=${bookImage}&bookName=${bookName}&bookAuthor=${bookAuthor}&returnDate=${returnDate}`, null);

  }




  bookRequestStatusToString(status: BookRequestStatus): string {
    switch (status) {
      case BookRequestStatus.Reserved:
        return 'Reservado';
      case BookRequestStatus.Borrowed:
        return 'Emprestado';
      case BookRequestStatus.Delivered:
        return 'Entregue';
      case BookRequestStatus.Denied:
        return 'Negado';
      case BookRequestStatus.Delayed:
        return 'Atrasado';
      default:
        return 'Desconhecido';
    }

  }


}


export interface Book {
  id: number;
  title: string;
  author: string[];
  publisher: string;
  iSBN?: string;
  genre: string[];
  sinopsis: string;
  coverImage: string;
  language: string;
  edition: string;
  publicationDate: Date;
  copies: number;
  availableCopies: number;
  status: BookStatus;
}


export enum BookStatus {
  Available,
  Unavailable
}



export interface BookRequest {
  id: number;
  citizen: Citizen;
  book: Book;
  reservedDate?: Date;
  returnDate?: Date;
  deliveredDate?: Date;
  municipality: string;
  status: BookRequestStatus;
}

export enum BookRequestStatus {
  Reserved,
  Borrowed,
  Delivered,
  Denied,
  Delayed
}
