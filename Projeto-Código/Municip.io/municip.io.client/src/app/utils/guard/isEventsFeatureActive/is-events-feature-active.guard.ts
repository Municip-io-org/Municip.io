import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppFeaturesService } from '../../../services/appFeatures/app-features.service';


@Injectable({
  providedIn: 'root'
})

export class IsEventsFeatureActive implements CanActivate {

  constructor(private appFeaturesService: AppFeaturesService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    try {
      const isEnabled = await this.appFeaturesService.appFeatures.find(a => a.appFeatureCategory == "Events")?.isEnabled;
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

