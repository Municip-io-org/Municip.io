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
  updateAppFeatures(appFeatures: AppFeature[]): Observable<AppFeature[]> {
    return this.http.get<AppFeature[]>(`api/appFeature/UpdateAppFeatures?appFeatures=${appFeatures}`);
  }

  // Função para mapear as strings de categoria para enum
  mapCategoryStringToEnum(categoryString: string): AppFeatureCategory {
    switch (categoryString) {
      case 'Documents':
        return AppFeatureCategory.Documents;
      case 'Events':
        return AppFeatureCategory.Events;
      case 'News':
        return AppFeatureCategory.News;
      case 'Transports':
        return AppFeatureCategory.Transports;
      default:
        return AppFeatureCategory.Unknown;
    }
  }
}

export interface AppFeature {
   id : number,
   appFeatureCategory : AppFeatureCategory,
   isEnabled : boolean,
   municipality : string,
}

export enum AppFeatureCategory {
  Documents = "Documents",
  Events = "Events",
  News = "News",
  Transports = "Transports",
  Unknown = "Unknown"
}
