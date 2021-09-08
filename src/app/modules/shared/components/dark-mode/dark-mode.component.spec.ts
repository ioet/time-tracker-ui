import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DarkModeComponent } from './dark-mode.component';

describe('DarkModeComponent', () => {
  let component: DarkModeComponent;
  let fixture: ComponentFixture<DarkModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DarkModeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DarkModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('theme');
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be light the default theme', () => {
    expect(component.theme).toEqual('light');
  });

  it('should change the value of the theme property if it exists in the local storage', () => {
    localStorage.setItem('theme', 'dark');
    component.checkThemeInLocalStorage();
    expect(component.theme).toEqual('dark');
  });

  it('should be light theme if it does not exist in local storage', () => {
    component.checkThemeInLocalStorage();
    expect(component.theme).toEqual('light');
  });

  it('should be light theme if only the theme property exists in local storage and not its value', () => {
    localStorage.setItem('theme', '');
    component.checkThemeInLocalStorage();
    expect(component.theme).toEqual('light');
  });

  it('should switch to dark theme if the theme property is light and vice versa', () => {
    component.theme = component.setTheme();
    expect(component.theme).toEqual('dark');
    component.theme = component.setTheme();
    expect(component.theme).toEqual('light');
  });

  it('should add the dark class in the html tag to apply dark mode', () => {
    component.theme = 'dark';
    component.addOrRemoveDarkMode();
    fixture.detectChanges();
    const htmlContainsDarkClass = document.documentElement.classList.contains('dark');
    expect(htmlContainsDarkClass).toBe(true);
  });

  it('should be changed to dark mode if the mode toggle is selected', () => {
    component.isFeatureToggleDarkModeActive = true;
    fixture.detectChanges();
    component.themeToggle.nativeElement.click();
    fixture.detectChanges();
    expect(component.theme).toEqual('dark');
    expect(localStorage.getItem('theme')).toEqual('dark');
  });

  it('call switchThemeToggleStyles() when ngAfterViewInit is called and isFeatureToggleDarkModeActive is true', () => {
    component.isFeatureToggleDarkModeActive = true;
    fixture.detectChanges();
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(component.themeToggle.nativeElement.classList.contains('bg-warningTW')).toBe(true);
  });
});
