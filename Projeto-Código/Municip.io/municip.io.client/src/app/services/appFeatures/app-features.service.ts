import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppFeaturesService {

  constructor(private http: HttpClient) { }

  /**
  *  Get app features of municipality.
  * @param municipalityName User object to be updated.
  * @returns Observable of app features of municipality.
  */
  getAppFeaturesByMunicipality(municipalityName: string): Observable<AppFeature[]> {
    return this.http.get<AppFeature[]>(`api/appFeature/GetAppFeatures?municipalityName=${municipalityName}`);
  }

  /**
   * Update app features of municipality.
   * @param appFeatures Array of appFeatures to change.
   * @returns Observable of app features modified.
   */
  updateAppFeatures(appFeatures: AppFeature[]) {
    
    const appFeaturesToSubmit: AppFeatureToSubmit[] = appFeatures.map(feature => {
      return {
        id: feature.id,
        appFeatureCategory: this.mapCategoryStringToNumber(feature.appFeatureCategory),
        isEnabled: feature.isEnabled,
        municipality: feature.municipality
      };
    });
    return this.http.put<AppFeature[]>('api/appFeature/UpdateAppFeatures', appFeaturesToSubmit);
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
