import { AfterViewInit, ElementRef, ViewChild, Component } from '@angular/core';

@Component({
  selector: 'app-dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrls: ['./dark-mode.component.scss'],
})
export class DarkModeComponent implements AfterViewInit {
  public theme = 'light';

  @ViewChild('themeToggle') themeToggle: ElementRef;

  constructor() {
    this.checkThemeInLocalStorage();
    this.addOrRemoveDarkMode();
  }

  ngAfterViewInit(): void {
    this.switchThemeToggleStyles(this.theme);
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
    this.switchThemeToggleStyles(this.theme);
    this.addOrRemoveDarkMode();
  }

  switchThemeToggleStyles(theme: string): void {
    switch (theme) {
      case 'dark':
        this.themeToggle.nativeElement.classList.remove('bg-warning', '-translate-x-1');
        this.themeToggle.nativeElement.classList.add('bg-gray-lighter', 'translate-x-1/2');
        break;
      case 'light':
        this.themeToggle.nativeElement.classList.remove('bg-gray-lighter', 'translate-x-1/2');
        this.themeToggle.nativeElement.classList.add('bg-warning', '-translate-x-1');
        break;
    }
  }
}
