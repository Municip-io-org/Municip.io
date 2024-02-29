import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()
export class MunicipalityGuard implements CanActivate {

  constructor(
    private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    var nav = this.router.getCurrentNavigation();
    
    if (nav?.id === 1) {

      this.router.navigate(['']);
      return false;
    } else {
      
      return true;
    }
  }

}
