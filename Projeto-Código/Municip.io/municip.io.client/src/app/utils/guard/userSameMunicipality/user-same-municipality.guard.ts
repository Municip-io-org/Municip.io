
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EventsService, Event } from '../../../services/events/events.service';
import { UserAuthService } from '../../../services/user-auth.service';
import { Municipality } from '../../../services/municipal-admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserSameMunicipalityGuard implements CanActivate {

  constructor(private userAuthService: UserAuthService, private eventsService: EventsService, private router: Router) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    const isSignedIn = await this.userAuthService.isSignedIn().toPromise();

    if (!isSignedIn) {
      this.router.navigateByUrl('/');
      return false;
    }

    const userMunicipality: Municipality = await this.userAuthService.getMunicipality().toPromise();

    // Obtém os parâmetros 'eventId' e 'newsId' da rota atual
    const eventId = next.params['eventId'];
    const newsId = next.params['newsId'];

    if (eventId) {

      this.eventsService.getEventById(eventId).subscribe(
        (eventRes: Event) => {
         /* if (userMunicipality.name == eventRes.mun)*/
        },
        error => {
          console.error(error);
        }
      );

      
      
      this.router.navigateByUrl(`/events/${eventId}`);
      return true;
    } else if (newsId) {
      this.router.navigateByUrl(`/news/${newsId}`);
      return false;
    } else {
      this.router.navigateByUrl('/accessDenied');
      return false;
    }
  }
}
