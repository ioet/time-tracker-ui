import { ComponentFixture, TestBed} from '@angular/core/testing';
import { DarkModeComponent } from './dark-mode.component';

describe('DarkModeComponent', () => {
  let component: DarkModeComponent;
  let fixture: ComponentFixture<DarkModeComponent>;
  let html: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DarkModeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DarkModeComponent);
    component = fixture.componentInstance;
    html = document.documentElement;
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
    expect(html.classList.contains('dark')).toBe(true);
  });

  it('should not have dark class in the html tag when  theme is light', () => {
    component.addOrRemoveDarkMode();
    fixture.detectChanges();
    expect(component.theme).toEqual('light');
    expect(html.classList.contains('dark')).toBe(false);
  });

  it('should change the value of the theme property, save it in the local storage and add the dark class to the HTML tag to change the theme', () => {
    component.changeToDarkOrLightTheme();
    fixture.detectChanges();
    expect(component.theme).toEqual('dark');
    expect(localStorage.getItem('theme')).toEqual('dark');
    expect(html.classList.contains('dark')).toBe(true);
  });
});
