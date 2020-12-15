import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { FeatureToggleProvider } from './feature-toggle-provider.service';


@Injectable({
  providedIn: 'root',
})
export class FeatureManagerService {

  constructor(private featureToggleProvider: FeatureToggleProvider) { }

  public isToggleEnabled(toggleName: string, toggleLabel?: string): Observable<boolean> {
    return this.featureToggleProvider.getFeatureToggle(toggleName, toggleLabel).pipe(
      map(featureToggle => featureToggle.enabled)
    );
  }

  public isToggleEnabledForUser(toggleName: string, toggleLabel?: string): Observable<boolean> {
    const matchesFilters$: Observable<boolean> = this.featureToggleProvider
    .getFeatureToggle(toggleName, toggleLabel)
    .pipe(
      map(featureToggle => featureToggle.filters),
      map(filters => filters.map(filter => filter.evaluate())),
      map(filterEvaluations => filterEvaluations.includes(true))
    );

    const result$: Observable<boolean> = zip(
      this.isToggleEnabled(toggleName, toggleLabel),
      matchesFilters$
    ).pipe(
      map(([enabled, enabledForUser]) => enabled && enabledForUser)
    );

    return result$;
  }
}
