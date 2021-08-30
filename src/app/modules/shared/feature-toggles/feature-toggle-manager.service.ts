import { Injectable } from '@angular/core';
import { from, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { FeatureToggleProvider } from './feature-toggle-provider.service';
import { FeatureToggleModel } from './feature-toggle.model';

@Injectable({
  providedIn: 'root',
})
export class FeatureManagerService {

  constructor(private featureToggleProvider: FeatureToggleProvider) { }

  public getAllFeatureToggleEnableForUser(): Observable<FeatureToggleModel[]> {
    return from(this.featureToggleProvider.getAllFeatureToggle()).pipe(
      map((allFeatureToggle) =>
        allFeatureToggle.filter((featureToggle) =>
          featureToggle.filters.map((filter) => filter.evaluate()).includes(true)
        )
      )
    );
  }
}
