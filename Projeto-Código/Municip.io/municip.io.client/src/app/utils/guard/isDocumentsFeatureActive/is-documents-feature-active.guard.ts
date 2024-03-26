import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppFeaturesService } from '../../../services/appFeatures/app-features.service';
import { UserAuthService } from '../../../services/user-auth.service';
import { MunicipalAdminAuthService, Municipality } from '../../../services/municipal-admin-auth.service';


@Injectable({
  providedIn: 'root'
})

export class IsDocumentFeatureActive implements CanActivate {
  constructor(private appFeaturesService: AppFeaturesService, private router: Router, private userAuthService : UserAuthService) { }

  async canActivate(): Promise<boolean> {
    try {

      const appFeatures = await this.appFeaturesService.getAppFeatures().toPromise();

      const isEnabled = appFeatures!.find(a => a.appFeatureCategory === "Documents")?.isEnabled;


      if (isEnabled) {
        return true;
      } else {
        this.router.navigateByUrl("/accessDenied");
        return false;
      }
    } catch (error) {
      console.error('Erro ao verificar a funcionalidade:', error);
      return false;
    }
  }
}

