import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from './app-routing.module';

describe('AppRoutingModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppRoutingModule
      ],
    }).compileComponents();
  }));

  it('should create routes when not legacy', () => {
    const fixture = TestBed.createComponent(AppRoutingModule);
    const app = fixture.componentInstance;
    expect(app.routes).toBeTruthy();
  });

});
