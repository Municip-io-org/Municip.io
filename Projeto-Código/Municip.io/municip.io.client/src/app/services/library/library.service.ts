import { Injectable } from '@angular/core';
import { Citizen } from '../citizen-auth.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, switchMap } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
  /**
    * Service for events
    */
export class LibraryService {


  /**
   * @constructor
   * LibraryService 
   * 
   * @param http 
   */
  constructor(private http: HttpClient) { }




  
  /**
   * Criar um livro
   * 
   * @param book O livro a criar
   * @param image A imagem do livro
   * @returns A criação do livro
   */
  createBook(book: Book, image: File | null): Observable<Book> {
    if (image === null) {
      return this.http.post<Book>('api/book/CreateBook', book);
    }

    const headers = new HttpHeaders({ 'authorization': 'Client-ID a9e7323ad868dd2' });
    const imgurl = "https://api.imgur.com/3/image";

    const formData = new FormData();
    formData.append('image', image);

    return this.http.post(imgurl, formData, { headers }).pipe(
      switchMap((response: any) => {
        book.coverImage = response['data']['link'];
        console.log(book);
        return this.http.post<Book>('api/book/CreateBook', book);
      })
    );
  }

  /**
   * Atualiza um livro
   * 
   * @param book O livro a atualizar
   * @param image A imagem do livro
   * @returns O livro atualuzado
   */
  updateBook(book: Book, image: File | null): Observable<HttpResponse<any>> {
    console.log(book);
    if (image === null) {
      return this.http.put<any>('api/Book/UpdateBook', book, { observe: 'response' });
    }

    const headers = new HttpHeaders({ 'authorization': 'Client-ID a9e7323ad868dd2' });
    const imgurl = "https://api.imgur.com/3/image";

    const formData = new FormData();
    formData.append('image', image);
    console.log("URL DE IMAGEM", image);
    return this.http.post(imgurl, formData, { headers }).pipe(
      switchMap((response: any) => {
        book.coverImage = response['data']['link'];
        console.log(book);
        return this.http.put<any>('api/Book/UpdateBook', book, { observe: 'response' });
      })
    );
  }

  /**
   * Obtem a lista de livros
   * 
   * @param municipality O município
   * @returns A lista de livros
   */
  getBooks(municipality: string): Observable<any> {
    const params = { municipality: municipality };
    return this.http.get<any>('api/Book/GetBooks', { params: params });
  }

  /**
   * Paginação da página de livros
   * 
   * @param page A pagina
   * @param itemsPerPage Número de itens por página
   * @param books Os livros da pagina
   * @returns Os livros por página
   */
  getPaginationBooks(page = 1, itemsPerPage = 10, books: Book[]): Book[] {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log(books.slice(startIndex, endIndex));
    return books.slice(startIndex, endIndex);
  }

  /**
   * Obtem um livro
   * @param bookId O ID do livro
   * @returns O Livro
   */
  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`api/Book/GetBookById?bookId=${bookId}`);
  }

  /**
   * Obtem a informação de um livro pelo seu ISBN pela API
   * @param isbn O ISBN do livro
   * @returns A informação de um livro
   */
  getBookInfoAPI(isbn: string) {
    return this.http.get<any>(`api/Book/GetBookInfoAPI?isbn=${isbn}`).pipe(
      map(response => {
        if (response && response.totalItems && response.totalItems > 0) {
          return response.items.map((item: any) => {
            const isbn13 = item.volumeInfo.industryIdentifiers.find((identifier: any) => identifier.type === 'ISBN_13')?.identifier || '';
            const isbn10 = item.volumeInfo.industryIdentifiers.find((identifier: any) => identifier.type === 'ISBN_10')?.identifier || '';


            const book: Book = {
              title: item.volumeInfo.title || '',
              author: item.volumeInfo.authors || [],
              publisher: item.volumeInfo.publisher || '',
              isbn: isbn13 || isbn10 || '',
              genre: item.volumeInfo.categories || [],
              sinopsis: item.volumeInfo.description || '',
              coverImage: item.volumeInfo.imageLinks?.thumbnail || '',
              language: item.volumeInfo.language || '',
              edition: '',
              publicationDate: item.volumeInfo.publishedDate || Date.now(),
              copies: 0,
              availableCopies: 0,
              status: BookStatus.Available,
              municipality: ''
            };
            return book;
          });
        } else {

          return null;
        }
      })
    );
  }

  /**
   * Remover um Livro
   * @param bookId O ID de um livro
   * @returns A remoção de um livro
   */
  removeBook(bookId: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`api/Book/DeleteBookById?bookId=${bookId}`, { observe: 'response' });
  }

  /**
   * Obtem a lista dos requests
   * @returns A lista de Requests
   */
  getRequests(): Observable<BookRequest[]> {
    return this.http.get<BookRequest[]>('api/Book/GetRequests');
  }

  /**
   * Obtem os requests de um município
   * @param municipalityo município
   * @returns a lista de requests de um município
   */
  getRequestsByMunicipality(municipality: string): Observable<BookRequest[]> {
    return this.http.get<BookRequest[]>(`api/Book/GetRequestsByMunicipality?municipality=${municipality}`);
  }
  /**
   * Obtem os requests de um cidadão
   * @param email o email de um cidadão
   * @returns A lista de um cidadão
   */
  getRequestsByCitizen(email: string) {
    return this.http.get<BookRequest[]>(`api/Book/GetRequestsByCitizen?email=${email}`);
  }

  /**
   * Obtem as diferentes categorias por município
   * @param municipality O município
   * @returns As diferentes categorias de um município
   */
  getDistinctCategoriesByMunicipality(municipality: string) {
    return this.http.get<string[]>(`api/Book/GetDistinctCategoriesByMunicipality?municipality=${municipality}`);
  }

  /**
   * Apaga o Pedido de livro
   * @param requestId o ID do request
   * @returns Apaga o Pedido
   */
  deleteRequest(requestId: number): Observable<any> {
    return this.http.delete(`api/Book/DeleteRequest?requestId=${requestId}`);
  }

  /**
  * Recusa o Pedido de livro
  * @param requestId o ID do request
  * @returns Recusa o Pedido
  */
  denyRequest(requestId: number): Observable<any> {
    return this.http.post(`api/Book/DenyRequest?requestId=${requestId}`, null);
  }

  /**
  * Emprestico de um livro
  * @param requestId o ID do request
  * @param returnDate A data de retorno
  * 
  * @returns Emprestimo do Pedido
  */
  borrowBook(requestId: number, returnDate: Date): Observable<any> {
    return this.http.post(`api/Book/BorrowBook?requestId=${requestId}`, returnDate);

  }
  /**
  * criação de um pedido do livro
  * @param email o ID do request
  * @returns Emprestimo do Pedido
  */
  createRequest(email: string, request: BookRequest): Observable<any> {
    return this.http.post(`api/Book/CreateRequest?email=${email}`, request);
  }

  /**
  * Atraso de um livro
  * @param requestId o ID do request
  * @returns Atraso de um Livro
  */
  delayRequest(requestId: number): Observable<any> {
    return this.http.post(`api/Book/DelayRequest?requestId=${requestId}`, null);
  }

  /**
  * Entrega de um livro
  * @param requestId o ID do request
  * @returns Entrega do Pedido
  */
  deliverBook(requestId: number): Observable<any> {
    return this.http.post(`api/Book/DeliverBook?requestId=${requestId}`, null);
  }

  /**
   * Retorna os request de um livro
   * @param bookId id do livro
   * @returns os requests do livro
   */
  getRequestsByBookId(bookId: number): Observable<any> {
    return this.http.get(`api/Book/GetRequestsByBookId?bookId=${bookId}`)
  }


  /**
  * Envio de atrado de entrega de um livro
  * @param requestId o ID do request
  * @returns Emprestimo do Pedido
  */
  sendDelayedEmail(email: string, name: string, bookImage: string, bookName: string, bookAuthor: string, returnDate: string) {
    return this.http.post(`api/Book/SendDelayedEmail?email=${email}&name=${name}&bookImage=${bookImage}&bookName=${bookName}&bookAuthor=${bookAuthor}&returnDate=${returnDate}`, null);

  }

  /**
   * Email de convite para registo na plataforma
   * @param email - Email para envio de convite 
   * @returns Email de convite
    */
  sendInviteEmail(email: string) {

    return this.http.post(`api/Book/SendInviteEmail?email=${email}`, null);
  }

  /**
   * Tradução de estados
   * 
   * @param status O status 
   * @returns O status em Portugues
   */
  statusToString(status: BookStatus): string {
    switch (status) {
      case BookStatus.Available:
        return "Disponível";
      case BookStatus.Unavailable:
        return "Indisponível";
    }
    
  }


  /**
   * Transforma os status de classe em strings
   * 
   * @param status Status
   * @returns Os status em String
   */
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
  id?: number;
  title: string;
  author: string[];
  publisher: string;
  isbn?: string;
  genre: string[];
  sinopsis: string;
  coverImage: string;
  language: string;
  edition: string;
  publicationDate: Date;
  copies: number;
  availableCopies: number;
  status: BookStatus;
  municipality: string;
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
  reservationLimitDate?: Date;
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
