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

  ngOnInit() {
    this.userAuthService.getUserRole().subscribe(
      res => {
        if (res.role == Roles.Citizen) {
          this.role = res.role;
 
          this.LoadData();
        }
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
//  }
//newsList = [
//    {
//      title: "TITULO da noticia",
//      subtitle: "subsubsubsubsubsusbubsubsubsusb",
//      image: "/assets/images/admin/banner.jpg",
//      date: "27/3/2012"
//    },
//    {
//      title: "TITULO da noticia2",
//      subtitle: "subsubsubsubsubsusbubsubsubsusb2",
//      image: "/assets/images/admin/banner.jpg",
//      date: "28/3/2012"
  //    },];

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
}
