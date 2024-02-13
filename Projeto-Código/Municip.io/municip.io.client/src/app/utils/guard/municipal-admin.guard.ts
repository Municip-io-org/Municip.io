import { CanActivate, Router } from '@angular/router';
import { Roles, UserAuthService } from '../../services/user-auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MunicipalAdminGuard implements CanActivate {

  constructor(private userAuthService: UserAuthService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    const isSignedIn = await this.userAuthService.isSignedIn().toPromise();

    if (!isSignedIn) {
      this.router.navigateByUrl('/');
      return false;
    }

    const userRole = await this.userAuthService.getUserRole().toPromise();
    if (userRole!.role === Roles.Municipal) {
      return true;
    } else {
      this.router.navigateByUrl('/accessDenied');
      return false;
    }
  }
}
