import { Injectable } from '@angular/core';
import { Citizen } from '../citizen-auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient) { }




  //create mock data
  Books: Book[] = [
    {
      id: 1,
      title: 'O Hobbit',
      author: ['J.R.R. Tolkien', 'J.K. Rowling', 'J.K. Rowling', 'J.K. Rowling', 'J.K. Rowling', 'J.K. Rowling', 'J.K. Rowling', 'J.K. Rowling', 'J.K. Rowling', 'J.K. Rowling', 'J.K. Rowling', 'J.K. Rowling', 'J.K. Rowling', 'J.K. Rowling', 'J.K. Rowling', 'J.K. Rowling', 'J.K. Rowling', 'J.K. Rowling', 'J.K. Rowling', 'J.K. Rowling', 'J.K. Rowling', 'J.K. Rowling', 'J.K. Rowling', 'J.K. Rowling'],
      availableCopies: 5,
      copies: 5,
      coverImage: 'https://img.freepik.com/fotos-gratis/retrato-abstrato-do-olho-da-elegancia-das-mulheres-jovens-gerada-pela-ia_188544-9712.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1711324800&semt=sph',
      edition: '1',
      genre: ['Fantasia'],
      language: 'Português',
      publicationDate: new Date('1937-09-21'),
      publisher: 'HarperCollins',
      sinopsis: 'Bilbo Bolseiro é um hobbit que leva uma vida confortável e sem ambições. Mas seu contentamento é perturbado quando Gandalf, o mago, e uma companhia de anões batem à sua porta e levam-no para uma expedição. Eles têm um plano para roubar o tesouro guardado por Smaug, o Magnífico, um grande e perigoso dragão. Bilbo reluta muito em participar da aventura, mas acaba surpreendendo até a si mesmo com sua esperteza e sua habilidade como ladrão!',
      status: BookStatus.Available,
      municipality: 'Londres',
    }, {
      id: 2,
      title: 'O Hobbit',
      author: ['J.R.R. Tolkien'],
      availableCopies: 5,
      copies: 5,
      coverImage: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1563042852i/49628.jpg',
      edition: '1',
      genre: ['Fantasia'],
      language: 'Português',
      publicationDate: new Date('1937-09-21'),
      publisher: 'HarperCollins',
      sinopsis: 'Bilbo Bolseiro é um hobbit que leva uma vida confortável e sem ambições. Mas seu contentamento é perturbado quando Gandalf, o mago, e uma companhia de anões batem à sua porta e levam-no para uma expedição. Eles têm um plano para roubar o tesouro guardado por Smaug, o Magnífico, um grande e perigoso dragão. Bilbo reluta muito em participar da aventura, mas acaba surpreendendo até a si mesmo com sua esperteza e sua habilidade como ladrão!',
      status: BookStatus.Available,
      municipality: 'Londres',
    },];


  BooksRequested: BookRequest[] = [
    {
      id: 1,
      citizen: {
        address: 'Rua dos Alfeneiros, nº 4',
        birthDate: new Date('1990-01-01'),
        email: '',
        firstName: 'Harry',
        gender: 'M',
        municipality: 'Londres',
        nif: '123456789',
        password: '',
        postalCode1: '1234',
        postalCode2: '123',
        surname: 'Potter',
        browsers: [],
        events: [],
        photo: 'https://img.freepik.com/fotos-gratis/retrato-abstrato-do-olho-da-elegancia-das-mulheres-jovens-gerada-pela-ia_188544-9712.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1711324800&semt=sph'
      },
      book: this.Books[0],
      reservedDate: new Date(2024, 2, 26, 14, 7),
      returnDate: new Date('2021-10-21'),
      deliveredDate: new Date('2021-09-21'),
      municipality: 'Londres',
      status: BookRequestStatus.Reserved
    }, {
      id: 2,
      citizen: {
        address: 'Rua dos Alfeneiros, nº 4',
        birthDate: new Date('1990-01-01'),
        email: '',
        firstName: 'Harry',
        gender: 'M',
        municipality: 'Londres',
        nif: '123456789',
        password: '',
        postalCode1: '1234',
        postalCode2: '123',
        surname: 'Potter',
        browsers: [],
        events: [],
        photo: 'https://img.freepik.com/fotos-gratis/retrato-abstrato-do-olho-da-elegancia-das-mulheres-jovens-gerada-pela-ia_188544-9712.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1711324800&semt=sph'
      },
      book: this.Books[1],
      reservedDate: new Date('2021-09-21'),
      returnDate: new Date('2021-10-21'),
      deliveredDate: new Date('2021-09-21'),
      municipality: 'Londres',
      status: BookRequestStatus.Delayed
    }, {
      id: 3,
      citizen: {
        address: 'Rua dos Alfeneiros, nº 4',
        birthDate: new Date('1990-01-01'),
        email: '',
        firstName: 'Harry',
        gender: 'M',
        municipality: 'Londres',
        nif: '123456789',
        password: '',
        postalCode1: '1234',
        postalCode2: '123',
        surname: 'Potter',
        browsers: [],
        events: [],
        photo: 'https://img.freepik.com/fotos-gratis/retrato-abstrato-do-olho-da-elegancia-das-mulheres-jovens-gerada-pela-ia_188544-9712.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1711324800&semt=sph'
      },
      book: this.Books[1],
      reservedDate: new Date('2021-09-21'),
      returnDate: new Date('2021-10-21'),
      deliveredDate: new Date('2021-09-21'),
      municipality: 'Londres',
      status: BookRequestStatus.Borrowed
    },
  ];

  createBook(book: Book, image: File) {
    var headers = new HttpHeaders({ 'authorization': 'Client-ID a9e7323ad868dd2' });
    let imgurl = "https://api.imgur.com/3/image";

    //upload to imgur
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(imgurl, formData, { headers })
      .pipe(switchMap((response: any) => {
        book.coverImage = response['data']['link'];
        return this.http.post<Book>('api/book/CreateBook', book);
      }));

  }

  getBooks(): Book[] {
    return this.Books;
  }

  getRequestedBooks() {
    return this.BooksRequested;
  }



  getRequests(): Observable<BookRequest[]> {
    return this.http.get<BookRequest[]>('api/Book/GetRequests');
  }

  getRequestsByMunicipality(municipality: string): Observable<BookRequest[]> {
    return this.http.get<BookRequest[]>(`api/Book/GetRequestsByMunicipality?municipality=${municipality}`);
  }

  getRequestsByCitizen(email: string) {
    return this.http.get<BookRequest[]>(`api/Book/GetRequestsByCitizen?email=${email}`);
  }

  getDistinctCategoriesByMunicipality(municipality: string) {
    return this.http.get<string[]>(`api/Book/GetDistinctCategoriesByMunicipality?municipality=${municipality}`);
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

  statusToString(status: BookStatus): string {
    switch (status) {
      case BookStatus.Available:
        return "Disponível";
      case BookStatus.Unavailable:
        return "Indisponível";
    }
    
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
