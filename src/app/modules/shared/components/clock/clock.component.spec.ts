import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockComponent } from './clock.component';

describe('ClockComponent', () => {
  let component: ClockComponent;
  let fixture: ComponentFixture<ClockComponent>;

  beforeEach(waitForAsync(() => {
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
    const currentHour = component.currentDate.getHours();
    expect(component.currentDate.getHours()).toEqual(currentHour);
  });

  it('should show the current minutes of day', () => {
    const currentMinutes = component.currentDate.getMinutes();
    expect(component.currentDate.getMinutes()).toEqual(currentMinutes);
  });

  it('should show the current seconds of day', () => {
    const currentSeconds = component.currentDate.getSeconds();
    expect(component.currentDate.getSeconds()).toEqual(currentSeconds);
  });

  it('should startTimer called', () => {
    spyOn(component, 'showClock');
    component.showClock();
    expect(component.showClock).toHaveBeenCalled();
  });
});
