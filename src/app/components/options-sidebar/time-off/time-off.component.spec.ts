import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOffComponent } from './time-off.component';

describe('TimeOffComponent', () => {
  let component: TimeOffComponent;
  let fixture: ComponentFixture<TimeOffComponent>;

  function setup() {
    // tslint:disable-next-line: no-shadowed-variable
    const fixture = TestBed.createComponent(TimeOffComponent);
    const app = fixture.debugElement.componentInstance;
    return { fixture, app };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have p tag as \'time-off works!\'', async(() => {
    // tslint:disable-next-line: no-shadowed-variable
    const { app, fixture } = setup();
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const ptag = compile.querySelector('p');
    expect(ptag.textContent).toBe('time-off works!');
  }));
});
