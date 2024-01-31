import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
 
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: UserAuthService, public router: Router) { }
  async canActivate(): Promise<boolean> {
    if (! await this.auth.isSignedIn().toPromise()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
