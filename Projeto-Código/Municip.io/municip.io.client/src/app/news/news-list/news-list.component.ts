import { Component } from '@angular/core';
import { NewsService } from '../../services/news/news.service';
import { Router } from '@angular/router';
import { Roles, UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css'
})
export class NewsListComponent {
    

  

  constructor(private newsService: NewsService, private router: Router, private userAuthService: UserAuthService) { }


  newsList: any[] = [];
  user: any;
  newUser: any;
  role: string = "";
  municipalityuser: string = "Municipio";
  sortedNewsList: any[] = [];
  ascendingOrder: boolean = true;
  orderOptions: any[] = [{ label: 'Notícia mais Recente', value: true }, { label: 'Notícia mais Antiga', value: false }];
  
  nameSearch: string = "";
 

  ngOnInit() {
    this.userAuthService.getUserRole().subscribe(
      res => {
       
          this.role = res.role;
 
          this.LoadData();
        
      },
      error => {
        console.error(error);
      }
    );
  
  }
  LoadData() {
  
    this.userAuthService.getUserData().subscribe(
      res => {
        this.user = res;

        var emailToParse = this.user.email;
        var emailParsed = emailToParse.replace('@', '%40');
        this.userAuthService.getInfoByEmail(emailParsed).subscribe(
          res => {
            this.newUser = res;

            this.newsService.getNews(this.newUser.municipality).subscribe(
              (listOfNews: any) => {
                this.newsList = listOfNews.map((news: any) => {
                  const [datePart] = news.date.split('T');
                  const date = new Date(datePart);
                  const formattedDate = date.toLocaleDateString('pt-PT');
                  this.municipalityuser = this.newUser.municipality;
                  return { ...news, date: formattedDate };
                });
                this.sortedNewsList = this.newsList;
                console.log(this.newsList);
              },
              (error) => {
                console.log(error);
              }
            );
            console.log(this.newUser);
          },
          error => {
            console.error(error);
          }
        );
      },
      error => {
        console.error(error);
      }
    );
  }

  get filteredNews() {
    if (this.nameSearch == '') return this.sortedNewsList;
    return this.sortedNewsList.filter(e => e.title.toLowerCase().includes(this.nameSearch.toLowerCase()));
  }

  deleteNews(news: any) {
   
    this.newsService.deleteNews(news).subscribe(
      (res) => {
        console.log("Noticia apagada com sucesso", res);
        this.LoadData();
      },
      (error) => {
        console.error(error);
      }
    );

    
  }

  toggleSortOrder() {
    this.sortNewsByDate();
  }

  sortNewsByDate() {
    const newsListCopy = [...this.newsList];
    newsListCopy.sort((a, b) => {
      if (this.ascendingOrder) {
        return new Date(b.date.split('/').reverse().join('/')).getTime() - new Date(a.date.split('/').reverse().join('/')).getTime();
      } else {
        return new Date(a.date.split('/').reverse().join('/')).getTime() - new Date(b.date.split('/').reverse().join('/')).getTime();
      }
    });
    this.sortedNewsList = newsListCopy;
  }

}
