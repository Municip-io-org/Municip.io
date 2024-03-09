import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Roles, UserAuthService } from '../../services/user-auth.service';

@Injectable({
  providedIn: 'root'
})

export class CitizenOrMunicipalAdminGuard implements CanActivate {

  constructor(private userAuthService: UserAuthService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    const isSignedIn = await this.userAuthService.isSignedIn().toPromise();

    if (!isSignedIn) {
      this.router.navigateByUrl('/login');
      return false;
    }

    const userRole = await this.userAuthService.getUserRole().toPromise();
    if (userRole!.role === Roles.Citizen || userRole!.role === Roles.Municipal) {
      return true;
    } else {
      this.router.navigateByUrl('/accessDenied');
      return false;
    }
  }
}

