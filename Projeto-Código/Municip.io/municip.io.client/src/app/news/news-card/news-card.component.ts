import { Component, EventEmitter, Input, Output } from '@angular/core';
import { News, NewsService } from '../../services/news/news.service';
import { Roles, UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.css'
})
/**
 * News Card Component
 *
 * Este componente representa o cartão de notícias
 *
 * @input title - Título da notícia
 * @input subtitle - Subtítulo da notícia
 * @input image - Imagem da notícia
 * @input date - Data da notícia
 * @input id - ID da notícia
 * @output deleteid - ID da notícia a ser eliminada
 *
 * @param role - A role do utilizador
 */
export class NewsCardComponent {
  @Input() title: string= "Titulo da noticia";
  @Input() subtitle: string = "Subtítulo da noticia";
  @Input() image: string = "";
  @Input() date: Date = new Date();
  @Input() id: string ="";
  @Output() deleteid = new EventEmitter<string>();

  /**
   * @constructor
   * NewsCardComponent
   *
   * @param newsService - Serviço de notícias
   * @param userAuthService - Serviço de autenticação do cidadão
  
   */
  constructor(private newsService: NewsService, private userAuthService: UserAuthService) { }

  role : string = "";

  /**
   * ngOnInit
   *
   * Inicializa o componente
   */
  ngOnInit() {
    this.userAuthService.getUserRole().subscribe(
      res => {
       
          this.role = res.role;

        
      },
      error => {
        console.error(error);
      }
    );

  }

  /**
   * deleteCurrent
   *
   * Elimina a notícia atual
   *
   * @param news - Notícia
   */
  deleteCurrent(news: any) {
    this.deleteid.emit(news.id);
    
  }
}
