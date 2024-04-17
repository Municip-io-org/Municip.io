import { Component } from '@angular/core';
import { NewsService } from '../../services/news/news.service';
import { Router } from '@angular/router';
import { Roles, UserAuthService } from '../../services/user-auth.service';
import { Municipality } from '../../services/municipal-admin-auth.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css'
})
/**
 * News List Component
 *
 * Este componente representa a lista de notícias
 *
 * @param newsList - Lista de notícias
 * @param user - Utilizador
 * @param newUser - Novo utilizador
 * @param role - A role do utilizador
 * @param municipalityuser - O município do utilizador
 * @param sortedNewsList - Lista de notícias ordenadas
 * @param ascendingOrder - Ordem ascendente
 * @param orderOptions - Opções de ordem
 * @param municipality - Município
 * @param nameSearch - Nome da pesquisa
 */
export class NewsListComponent {
    

  /**
 * @constructor
 * LoginComponent
 *
 * @param newsService - Serviço de notícias
 * @param router - O Router
 * @param userAuthService - Serviço de autenticação do cidadão
 */
  constructor(private newsService: NewsService, private router: Router, private userAuthService: UserAuthService) { }


  newsList: any[] = [];
  user: any;
  newUser: any;
  role: string = "";
  municipalityuser: string = "Municipio";
  sortedNewsList: any[] = [];
  ascendingOrder: boolean = true;
  orderOptions: any[] = [{ label: 'Notícia mais Recente', value: true }, { label: 'Notícia mais Antiga', value: false }];
   municipality: Municipality = {
    name: '',
    president: '',
    contact: '',
    description: '',
    areaha: '',
    codigo: '',
    codigopostal: '',
    codigoine: '',
    descpstal: '',
    distrito: '',
    eleitores: '',
    email: '',
    fax: '',
    localidade: '',
    nif: '',
    populacao: '',
    rua: '',
    sitio: '',
    telefone: '',
    emblemPhoto: '',
    landscapePhoto: '',
  };
  nameSearch: string = "";
 

  /**
   * ngOnInit
   *
   * Inicializa o componente
   */
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

  /**
   * loadData
   *
   * Carrega os a lista de notícias
   */
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
                  this.sortNewsByDate();
                  const [datePart] = news.date.split('T');
                  const date = new Date(datePart);
                  const formattedDate = date.toLocaleDateString('pt-PT');
                  this.municipalityuser = this.newUser.municipality;
                  return { ...news, date: formattedDate };
                });
                this.sortedNewsList = this.newsList;
                console.log(this.newsList);
                this.userAuthService.getInfoMunicipality(this.newUser.municipality).subscribe(
                  (municipalityRes: Municipality) => {
                    this.municipality = municipalityRes;

                  },
                  error => {
                    console.error(error);
                  }
                );
                console.log(this.municipality);
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

  /**
   * get filteredNews
   *
   * Retorna as notícias filtradas
   */
  get filteredNews() {
    if (this.nameSearch == '') return this.sortedNewsList;
    return this.sortedNewsList.filter(e => e.title.toLowerCase().includes(this.nameSearch.toLowerCase()));
  }

  /**
   * deleteNews
   *
   * Apaga uma nova notícia
   */
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


  /**
   * toggleSortOrder
   *
   * Alterna a ordem de ordenação
   */
  toggleSortOrder() {
    this.sortNewsByDate();
  }

  /**
   * sortNewsByDate
   *
   * Ordena as notícias por data
   */
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
