import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
import { UserAuthService } from '../user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppFeaturesService {

  appFeatures: AppFeature[] = [];


  constructor(private http: HttpClient, private userAuthService: UserAuthService) { }

  /**
  *  Get app features of municipality.
  * @param municipalityName User object to be updated.
  * @returns Observable of app features of municipality.
  */
  getAppFeaturesByMunicipality(municipalityName: string): Observable<AppFeature[]> {
   
    if (this.appFeatures.length === 0) {

      return this.http.get<AppFeature[]>(`api/appFeature/GetAppFeatures?municipalityName=${municipalityName}`).pipe(
        tap((features: AppFeature[]) => {
          this.appFeatures = features;

        })
      );
    } else {
      
      console.log("BUSCAR FEATURES EM CACHE")
      return of(this.appFeatures);
    }
  }

  /**
  *  Get app features of current municipality.
  * @returns Observable of app features of municipality.
  */
  getAppFeatures(): Observable<AppFeature[]> {
    if (this.appFeatures.length === 0) {
      return this.userAuthService.getMunicipality().pipe(
        switchMap(municipalityName =>
          this.http.get<AppFeature[]>(`api/appFeature/GetAppFeatures?municipalityName=${municipalityName}`).pipe(
            tap((features: AppFeature[]) => {
              this.appFeatures = features;
            })
          )
        ),
        catchError(error => {
          console.error(error);
          // Handle error and return a default value
          return this.http.get<AppFeature[]>(`api/appFeature/GetAppFeatures?municipalityName=${"Setúbal"}`).pipe(
            tap((features: AppFeature[]) => {
              this.appFeatures = features;
            })
          );
        })
      );
    } else {
      console.log("BUSCAR FEATURES EM CACHE")
      return of(this.appFeatures);
    }
  }


  /**
   * Update app features of municipality.
   * @param appFeatures Array of appFeatures to change.
   * @returns Observable of app features modified.
   */
  updateAppFeatures(appFeatures: AppFeature[]): Observable<AppFeature[]> {
    const appFeaturesToSubmit: AppFeatureToSubmit[] = appFeatures.map(feature => {
      return {
        id: feature.id,
        appFeatureCategory: this.mapCategoryStringToNumber(feature.appFeatureCategory),
        isEnabled: feature.isEnabled,
        municipality: feature.municipality
      };
    });
    return this.http.put<AppFeature[]>('api/appFeature/UpdateAppFeatures', appFeaturesToSubmit).pipe(
      tap(() => {
        this.appFeatures = appFeatures;
      })
    );
  }

  // Função para mapear as strings de categoria para enum
  mapCategoryStringToNumber(categoryString: string): number {
    switch (categoryString) {
      case 'Documents':
        return 0;
      case 'Events':
        return 1;
      case 'News':
        return 2;
      case 'Transports':
        return 3;
      default:
        return -1;
    }
  }
}

export interface AppFeature {
   id : number,
   appFeatureCategory : AppFeatureCategory,
   isEnabled : boolean,
   municipality : string,
}

 interface AppFeatureToSubmit {
  id: number,
  appFeatureCategory: number,
  isEnabled: boolean,
  municipality: string,
}

export enum AppFeatureCategory {
  Documents = "Documents",
  Events = "Events",
  News = "News",
  Transports = "Transports",
  Unknown = "Unknown"
}
