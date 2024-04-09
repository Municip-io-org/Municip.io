import { Component } from '@angular/core';
import { AdminStatisticsService } from '../services/stats/admin-statistics.service';
import { Citizen } from '../services/citizen-auth.service';
import { MunicipalAdministrator } from '../services/municipal-admin-auth.service';
import { RequestDocument } from '../services/documents/docs.service';
import { UserAuthService } from '../services/user-auth.service';
import { Book, BookRequest, LibraryService } from '../services/library/library.service';

@Component({
  selector: 'app-munadmin-statistics-dashboard',
  templateUrl: './munadmin-statistics-dashboard.component.html',
  styleUrl: './munadmin-statistics-dashboard.component.css'
})
export class MunadminStatisticsDashboardComponent {
  selectedButton: number = 1;
  orderOptions: any[] = [{ label: '1', value: true }, { label: '2', value: false }];

  citizens: any[] = [];
  municipalAdmins: MunicipalAdministrator[] = [];
  municipalities: any[] = [];
  documentRequests: RequestDocument[] = [];
  numberOfCitizens: number = 0;
  activeCitizens: number = 0;
  numberOfMunicipalAdmins: number = 0;
  blockedCitizens: number = 0;
  blockedCitizensPercentage: number = 0;

  news: any[] = [];
  events: any[] = [];

  newsPublished: number = 0;
  newsPublishedToday: number = 0;

  eventsRegistered: number = 0;
  eventsToday: number = 0;

  documentsRequested: number = 0;
  documentsApproved: number = 0;
  totalEarnings: number = 0;

  numberOfBooks: number = 0;
  Authors: number = 0;
  mostPopularGenre: string ="";
  user: any;
  municipality: string = '';
  bookrequests: BookRequest[] = [];
  books: Book[] = [];
  //bookrequests1: BookRequest[] = [
  //  {
  //    "id": 1,
  //    "citizen": {
  //      "firstName": "John",
  //      "surname": "Doe",
  //      "email": "john.doe@example.com",
  //      "password": "password123",
  //      "nif": "123456789",
  //      "gender": "Male",
  //      "municipality": "New York",
  //      "address": "123 Main Street",
  //      "postalCode1": "12345",
  //      "postalCode2": "6789",
  //      "birthDate": new Date(),
  //      "photo": "profile.jpg",
        
        
  //      "events": [],
  //      "browsers": []
  //    },
  //    "book": {
  //      "id": 1,
  //      "title": "The Great Gatsby",
  //      "author": [
  //        "F. Scott Fitzgerald"
  //      ],
  //      "publisher": "Scribner",
  //      "isbn": "9780743273565",
  //      "genre": [
  //        "Fiction",
  //        "Classics"
  //      ],
  //      "sinopsis": "The story primarily concerns the young and mysterious millionaire Jay Gatsby and his quixotic passion and obsession with the beautiful former debutante Daisy Buchanan.",
  //      "coverImage": "great_gatsby.jpg",
  //      "language": "English",
  //      "edition": "First Edition",
  //      "publicationDate": new Date(),
  //      "copies": 5,
  //      "availableCopies": 3,
  //      "status": 1,
  //      "municipality": "New York"
  //    },
  //    "reservedDate": new Date(),
  //    "returnDate": new Date(),
  //    "deliveredDate": new Date(),
  //    "municipality": "New York",
  //    "status": 1
  //  }

  //  , {
  //    "id": 2,
  //    "citizen": {
  //      "firstName": "John",
  //      "surname": "Doe",
  //      "email": "john.doe@example.com",
  //      "password": "password123",
  //      "nif": "123456789",
  //      "gender": "Male",
  //      "municipality": "New York",
  //      "address": "123 Main Street",
  //      "postalCode1": "12345",
  //      "postalCode2": "6789",
  //      "birthDate": new Date(),
  //      "photo": "profile.jpg",


  //      "events": [],
  //      "browsers": []
  //    },
  //    "book": {
  //      "id": 1,
  //      "title": "The Great Gatsby",
  //      "author": [
  //        "F. Scott Fitzgerald"
  //      ],
  //      "publisher": "Scribner",
  //      "isbn": "9780743273565",
  //      "genre": [
  //        "Fiction",
  //        "Classics"
  //      ],
  //      "sinopsis": "The story primarily concerns the young and mysterious millionaire Jay Gatsby and his quixotic passion and obsession with the beautiful former debutante Daisy Buchanan.",
  //      "coverImage": "great_gatsby.jpg",
  //      "language": "English",
  //      "edition": "First Edition",
  //      "publicationDate": new Date(),
  //      "copies": 5,
  //      "availableCopies": 3,
  //      "status": 1,
  //      "municipality": "New York"
  //    },
  //    "reservedDate": new Date(),
  //    "returnDate": new Date(),
  //    "deliveredDate": new Date(),
  //    "municipality": "New York",
  //    "status": 0
  //  }



  //];



  //books: Book[] = [
  //  {
  //    "title": "Harry Potter and the Philosopher's Stone",
  //    "author": ["J.K. Rowling"],
  //    "publisher": "Bloomsbury",
  //    "isbn": "9780747532699",
  //    "genre": ["Fantasy"],
  //    "sinopsis": "The story of a young wizard, Harry Potter, and his adventures at Hogwarts School of Witchcraft and Wizardry.",
  //    "coverImage": "https://example.com/harry_potter_cover.jpg",
  //    "language": "English",
  //    "edition": "1st",
  //    "publicationDate": new Date("2001-06-26"), // Convert string to Date object
  //    "copies": 10,
  //    "availableCopies": 10,
  //    "status": 0,
  //    "municipality": "London"
  //  },
  //  {
  //    "title": "Harry Potter and the Philosopher's Stone",
  //    "author": ["J.K. Rowling"],
  //    "publisher": "Bloomsbury",
  //    "isbn": "9780747532699",
  //    "genre": ["Romance"],
  //    "sinopsis": "The story of a young wizard, Harry Potter, and his adventures at Hogwarts School of Witchcraft and Wizardry.",
  //    "coverImage": "https://example.com/harry_potter_cover.jpg",
  //    "language": "English",
  //    "edition": "1st",
  //    "publicationDate": new Date("2001-06-26"), // Convert string to Date object
  //    "copies": 10,
  //    "availableCopies": 10,
  //    "status": 0,
  //    "municipality": "London"
  //  },
  //  {
  //    "title": "Harry Potter and the Philosopher's Stone",
  //    "author": ["J.K. Rowling"],
  //    "publisher": "Bloomsbury",
  //    "isbn": "9780747532699",
  //    "genre": ["Terror"],
  //    "sinopsis": "The story of a young wizard, Harry Potter, and his adventures at Hogwarts School of Witchcraft and Wizardry.",
  //    "coverImage": "https://example.com/harry_potter_cover.jpg",
  //    "language": "English",
  //    "edition": "1st",
  //    "publicationDate": new Date("2001-06-26"), // Convert string to Date object
  //    "copies": 10,
  //    "availableCopies": 10,
  //    "status": 1,
  //    "municipality": "London"
  //  }
  //];

  constructor(private adminStatisticsService: AdminStatisticsService, private userAuthService : UserAuthService,private libraryService : LibraryService) { }

  ngOnInit() {

    this.userAuthService.getUserData().subscribe(
      res => {
        let anyUser: any;
        anyUser = res;
        this.userAuthService.getInfoByEmail(anyUser.email).subscribe(
          async (res: any) => {
            this.user = res;
            this.municipality = this.user.municipality;

            this.adminStatisticsService.getRequestsByMunicipality(this.municipality).subscribe((data: BookRequest[]) => {
                this.bookrequests = data;
            });

            this.libraryService.getBooks(this.municipality).subscribe((data: Book[]) => {
              this.books = data;
              console.log(this.books);
            });

    this.adminStatisticsService.getAllCitizens().subscribe((data: Citizen[]) => {
      this.citizens = data.filter(citizen => citizen.municipality === this.municipality);
      this.adminStatisticsService.getAllMunicipalAdmins().subscribe((datamunadmin: MunicipalAdministrator[]) => {
        this.municipalAdmins = datamunadmin.filter(admin => admin.municipality === this.municipality);

        

          this.adminStatisticsService.getAllNews().subscribe((datanews: any) => {
            this.news = datanews.filter((news: { municipality: string; }) => news.municipality === this.municipality);

            this.adminStatisticsService.getAllEvents().subscribe((dataevents: any) => {
              this.events = dataevents.filter((event: { municipality: string; }) => event.municipality === this.municipality);
              this.adminStatisticsService.getAllDocumentRequests().subscribe((datadoc: any) => {


                this.documentRequests = datadoc.filter((doc: { municipality: string; }) => doc.municipality === this.municipality);
                this.generateStatistics();
              });

           
          }
          );
        }
        );
      }
      );
    }
            );
            

            
          }
        );
      }
    );
  }












  generateStatistics() {
    this.numberOfCitizens = this.citizens.length;
    this.numberOfMunicipalAdmins = this.municipalAdmins.length;

    this.activeCitizens = this.citizens.filter(citizen => citizen.status === 'Approved').length;

    this.blockedCitizens = this.citizens.filter(citizen => citizen.status === 'Blocked').length;

    this.blockedCitizensPercentage = (this.blockedCitizens / this.numberOfCitizens) * 100;


    this.newsPublished = this.news.length;

    this.newsPublishedToday = this.news.filter(news => new Date(news.date).toDateString() === new Date().toDateString()).length;

    this.eventsRegistered = this.events.length;



    this.eventsToday = this.events.filter(event => new Date(event.startDate) <= new Date() && new Date(event.endDate) >= new Date()).length;

    this.documentsRequested = this.documentRequests.length;
    this.documentsApproved = this.documentRequests.filter(doc => doc.status === 'Approved').length;

    this.documentRequests.forEach(doc => {
      this.totalEarnings += doc.documentTemplate.price;
    });

    this.numberOfBooks = this.books.length;
    this.Authors = this.books.map(book => book.author).length;
    const genreCounts: { [genre: string]: number } = {};

    this.books.forEach(book => {
      book.genre.forEach(genre => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
        console.log(genreCounts);
      });
    });

    this.mostPopularGenre = Object.entries(genreCounts).reduce((prev, curr) => curr[1] > prev[1] ? curr : prev)[0];
  }



  selectButton(buttonNumber: number): void {
    this.selectedButton = buttonNumber;
  }
}
