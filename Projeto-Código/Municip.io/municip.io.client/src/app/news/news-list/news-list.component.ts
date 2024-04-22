import { Component } from '@angular/core';
import { News, NewsService } from '../../services/news/news.service';
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


  news: News[] = [];
  showNews: News[] = [];
  nameSearch: string = '';

  currentPage = 1;
  itemsPerPage = 6;

  user: any;
  newUser: any;
  role: string = "";
  municipalityuser: string = "Municipio";
  sortedNewsList: any[] = [];
  ascendingOrder: boolean = true;
  orderOptions: any[] = [{ label: 'Notícias mais Recente', value: true }, { label: 'Notícias mais Antigas', value: false }];
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
        this.sortNewsByDate();
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
                this.news = listOfNews.map((news: any) => {
                  
                
                  return news;
                });
                   
                this.sortNewsByDate();
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
   *
   * formatDate
   *
   * Formata a data para que apenas apareca o dia, mês e ano na pagina
   * 
   * @param date
   * @returns a data com dia, mês e ano
   */
   formatDate(date: string) {
    const [datePart] = date.split('T');
    const date2 = new Date(datePart);
    const formattedDate = date2.toLocaleDateString('pt-PT');
    
    //return { ...news, date: formattedDate };
    return formattedDate;

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
   * Este método é responsável por carregar mais notícias.
   */
  onScrollDown() {
    if (this.news.length > this.showNews.length) {
      this.currentPage++;
      this.showNews = [...this.showNews, ...this.newsService.getPaginationNews(this.currentPage, this.itemsPerPage, this.news)];
    }
  }

  /**
   * Este método é responsável por filtrar os eventos.
   */
  get filteredNews() {
    if (this.nameSearch == '') return this.showNews;
    return this.news.filter(e => e.title.toLowerCase().includes(this.nameSearch.toLowerCase()));
  }

  /**
   * sortNewsByDate
   *
   * Ordena as notícias por data
   */
  sortNewsByDate() {
    this.currentPage = 1;
    if (!this.ascendingOrder) {
      this.news.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.showNews = this.newsService.getPaginationNews(this.currentPage, this.itemsPerPage, this.news);

    } else {
      this.news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.showNews = this.newsService.getPaginationNews(this.currentPage, this.itemsPerPage, this.news);
    }
  }


  /**
   * Método para navegar para a página de criação de notícia.
   */
  goToCreateNewsPage() {
    this.router.navigateByUrl(`news/news-create`);
  }

}
