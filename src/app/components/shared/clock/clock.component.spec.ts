import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockComponent } from './clock.component';

describe('ClockComponent', () => {
  let component: ClockComponent;
  let fixture: ComponentFixture<ClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the current hour of day', () => {
    const currentDate: Date = new Date();
    expect(component.currentDate.getHours()).toEqual(currentDate.getHours());
  });

  it('should show the current minutes of day', () => {
    const currentDate: Date = new Date();
    expect(component.currentDate.getMinutes()).toEqual(currentDate.getMinutes());
  });

  it('should show the current seconds of day', () => {
    const currentDate: Date = new Date();
    expect(component.currentDate.getSeconds()).toEqual(currentDate.getSeconds());
  });

});
