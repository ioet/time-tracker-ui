import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeClockComponent } from './time-clock.component';

describe('TimeClockComponent', () => {
  let component: TimeClockComponent;
  let fixture: ComponentFixture<TimeClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeClockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
