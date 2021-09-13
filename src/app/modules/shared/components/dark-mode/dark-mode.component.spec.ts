import { ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FeatureToggleGeneralService } from '../../feature-toggles/feature-toggle-general/feature-toggle-general.service';
import { FeatureToggleModel } from '../../feature-toggles/feature-toggle.model';
import { FeatureFilterModel } from '../../feature-toggles/filters/feature-filter.model';
import { DarkModeComponent } from './dark-mode.component';

describe('DarkModeComponent', () => {
  let component: DarkModeComponent;
  let fixture: ComponentFixture<DarkModeComponent>;
  let html: HTMLElement;
  let featureToggleGeneralService: FeatureToggleGeneralService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DarkModeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DarkModeComponent);
    component = fixture.componentInstance;
    html = document.documentElement;
    featureToggleGeneralService = TestBed.inject(FeatureToggleGeneralService);
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

  it('should be light mode if property ‘theme’ does not have a value in local storage', () => {
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

  it('should be true the isFeatureToggleDarkModeActive property when the user has the dark-mode feature toggle enabled', fakeAsync(() => {
    const filters: FeatureFilterModel[] = [];
    const featureToggle: FeatureToggleModel = {name: 'dark-mode', enabled: true, filters};
    spyOn(featureToggleGeneralService, 'getActivated').and.returnValue(of([featureToggle]).pipe(delay(1)));
    component.ngOnInit();
    tick(1);
    expect(component.isFeatureToggleDarkModeActive).toBeTruthy();
  }));

});
