import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppFeaturesService } from '../../../services/appFeatures/app-features.service';
import { UserAuthService } from '../../../services/user-auth.service';
import { MunicipalAdminAuthService, Municipality } from '../../../services/municipal-admin-auth.service';


@Injectable({
  providedIn: 'root'
})

export class IsDocumentFeatureActive implements CanActivate {

  municipality : string = '';
  constructor(private appFeaturesService: AppFeaturesService, private router: Router, private userAuthService : UserAuthService) { }

  async canActivate(): Promise<boolean> {
    try {
      this.userAuthService.getUserData().subscribe(
        res => {
          var anyUser = res;
          this.userAuthService.getInfoByEmail(anyUser.email).subscribe(
            res => {
              var user = res;

              this.userAuthService.getInfoMunicipality(user.municipality).subscribe(
                async res => {
                  this.municipality = res.name;

                  await this.appFeaturesService.getAppFeaturesByMunicipality(this.municipality).toPromise(); // Como fiz a promessa, ele agora espera 
                  const isEnabled = this.appFeaturesService.appFeatures.find(a => a.appFeatureCategory === "Documents")?.isEnabled;

                  console.log('isEnabled', isEnabled);
                  if (isEnabled) {
                    return true;
                  } else {
                    this.router.navigateByUrl("/accessDenied");
                    return false;
                  }
           
            

                },
                error => {
                  console.error(error);
                }
              )
            });
        },
        error => {
          console.error(error);
        }
      );






    }
    catch (error) {
      console.error(error);
    }
    return true;
  }
}

