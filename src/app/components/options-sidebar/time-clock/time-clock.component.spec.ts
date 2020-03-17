import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeClockComponent } from './time-clock.component';

describe('TimeClockComponent', () => {
  let component: TimeClockComponent;
  let fixture: ComponentFixture<TimeClockComponent>;

  function setup() {
    // tslint:disable-next-line: no-shadowed-variable
    const fixture = TestBed.createComponent(TimeClockComponent);
    const app = fixture.debugElement.componentInstance;
    return { fixture, app };
  }

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

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have p tag as \'time-clock works!\'', async(() => {
    // tslint:disable-next-line: no-shadowed-variable
    const { app, fixture } = setup();
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const ptag = compile.querySelector('p');
    expect(ptag.textContent).toBe('time-clock works!');
  }));

});
