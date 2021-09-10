import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FeatureToggle } from 'src/environments/enum';
import { FeatureToggleGeneralService } from '../../feature-toggles/feature-toggle-general/feature-toggle-general.service';

@Component({
  selector: 'app-dark-mode',
  templateUrl: './dark-mode.component.html',
})
export class DarkModeComponent implements OnInit {
  public theme = 'light';
  public isFeatureToggleDarkModeActive: boolean;

  constructor(
    private cookiesService: CookieService,
    private featureToggleGeneralService: FeatureToggleGeneralService
  ) {}

  ngOnInit() {
    this.featureToggleGeneralService.getActivated().subscribe(() => {
      this.isFeatureToggleDarkModeActive = this.cookiesService.get(FeatureToggle.DARK_MODE) === 'true';
      if (this.isFeatureToggleDarkModeActive) {
        this.checkThemeInLocalStorage();
        this.addOrRemoveDarkMode();
      }
    });
  }

  getLocalStorageTheme(): string {
    return localStorage.getItem('theme') || 'light';
  }

  setLocalStorageTheme(theme: string): void {
    localStorage.setItem('theme', theme);
  }

  checkThemeInLocalStorage(): void {
    if ('theme' in localStorage) {
      this.theme = this.getLocalStorageTheme();
    } else {
      this.setLocalStorageTheme(this.theme);
    }
  }

  isDarkTheme(): boolean {
    return this.theme === 'dark' ? true : false;
  }

  setTheme(): string {
    return this.isDarkTheme() ? 'light' : 'dark';
  }

  addOrRemoveDarkMode(): void {
    if (this.isDarkTheme()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  changeToDarkOrLightTheme(): void {
    this.theme = this.setTheme();
    this.setLocalStorageTheme(this.theme);
    this.addOrRemoveDarkMode();
  }
}
