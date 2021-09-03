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

  it('should be clear the default theme', () => {
    expect(component.theme).toBe('light');
  });

  it('should change the value of the theme property if it exists in the local storage', () => {
    localStorage.setItem('theme', 'dark');
    component.checkThemeInLocalStorage();
    expect(component.theme).toBe('dark');
  });

  it('should be light theme if it does not exist in local storage', () => {
    component.checkThemeInLocalStorage();
    expect(component.theme).toBe('light');
  });

  it('should be changed to dark mode if the mode toggle is selected', () => {
    component.themeToggle.nativeElement.click();
    fixture.detectChanges();
    expect(component.theme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
