
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EventsService, Event } from '../../../services/events/events.service';
import { UserAuthService } from '../../../services/user-auth.service';
import { NewsService } from '../../../services/news/news.service';
import { DocsService } from '../../../services/documents/docs.service';
import { LibraryService } from '../../../services/library/library.service';


@Injectable({
  providedIn: 'root'
})
export class UserSameMunicipalityGuard implements CanActivate {

  constructor(private userAuthService: UserAuthService, private eventsService: EventsService, private router: Router, private newsService: NewsService,
    private docService: DocsService, private libraryService : LibraryService
  ) { }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    const isSignedIn = await this.userAuthService.isSignedIn().toPromise();

    if (!isSignedIn) {
      this.router.navigateByUrl('/');
      return false;
    }

    const userMunicipality = await this.userAuthService.getMunicipality().toPromise();

    // Obtém os parâmetros 'eventId' e 'newsId' da rota atual
    const eventId = next.params['eventId'];

    const newsId = next.params['newsId'];

    const documentId = next.params['templateId'];

    const bookId = next.params['bookId'];

    if (eventId) {
      const event = await this.eventsService.getEventById(eventId).toPromise();

      if (userMunicipality == event!.municipality) {
        next.data = { event: event! };
        return true;
      } else {
        this.router.navigateByUrl('/accessDenied');
        return false;
      }
    } else if (newsId) {
      const news = await this.newsService.getNewsById(newsId).toPromise();
      if (userMunicipality == news!.municipality) {

        next.data = { news: news! };
        return true;
      } else {
        this.router.navigateByUrl('/accessDenied');
        return false;
      }
    } else if (documentId) {
      const document = await this.docService.getTemplateById(documentId).toPromise();
      if (userMunicipality == document!.municipality) {
        next.data = { document: document! };
        return true;
      } else {
        this.router.navigateByUrl('/accessDenied');
        return false;
      }
    } else if (bookId) {
      const book = await this.libraryService.getBookById(bookId).toPromise();
      if (userMunicipality == book!.municipality) {
        next.data = { book: book! };
        return true;
      } else {
        this.router.navigateByUrl('/accessDenied');
        return false;
      }
    } else {
      this.router.navigateByUrl('/accessDenied');
      return false;
    }
  }
}

