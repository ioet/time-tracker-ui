import { AfterViewInit, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FeatureToggle } from 'src/environments/enum';
import { FeatureToggleGeneralService } from '../../feature-toggles/feature-toggle-general/feature-toggle-general.service';

@Component({
  selector: 'app-dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrls: ['./dark-mode.component.scss'],
})
export class DarkModeComponent implements OnInit, AfterViewInit {
  public theme = 'light';
  public isFeatureToggleDarkModeActive: boolean;

  @ViewChild('themeToggle') themeToggle: ElementRef;

  constructor(
    private cookiesService: CookieService,
    private featureToggleGeneralService: FeatureToggleGeneralService
  ) {}

  ngOnInit(): void {
    this.featureToggleGeneralService.getActivated().subscribe(() => {
      this.isFeatureToggleDarkModeActive = this.cookiesService.get(FeatureToggle.DARK_MODE) === 'true';
    });
    if (this.isFeatureToggleDarkModeActive) {
      this.checkThemeInLocalStorage();
      this.addOrRemoveDarkMode();
    }
  }

  ngAfterViewInit(): void {
    if (this.isFeatureToggleDarkModeActive) {
      this.switchThemeToggleStyles();
    }
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
    this.switchThemeToggleStyles();
    this.addOrRemoveDarkMode();
  }

  switchThemeToggleStyles(): void {
    if (this.isDarkTheme()) {
      this.themeToggle.nativeElement.classList.remove('bg-warningTW', '-translate-x-1');
      this.themeToggle.nativeElement.classList.add('bg-grayTW-lighter', 'translate-x-1/2');
    } else {
      this.themeToggle.nativeElement.classList.remove('bg-grayTW-lighter', 'translate-x-1/2');
      this.themeToggle.nativeElement.classList.add('bg-warningTW', '-translate-x-1');
    }
  }
}
