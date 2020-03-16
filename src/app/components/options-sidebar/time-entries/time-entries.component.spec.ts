import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEntriesComponent } from './time-entries.component';

describe('TimeEntriesComponent', () => {
  let component: TimeEntriesComponent;
  let fixture: ComponentFixture<TimeEntriesComponent>;

  function setup() {
    // tslint:disable-next-line: no-shadowed-variable
    const fixture = TestBed.createComponent(TimeEntriesComponent);
    const app = fixture.debugElement.componentInstance;
    return { fixture, app };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have p tag as \'time-entries works!\'', async(() => {
    // tslint:disable-next-line: no-shadowed-variable
    const { app, fixture } = setup();
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const h1tag = compile.querySelector('p');
    expect(h1tag.textContent).toBe('time-entries works!');
  }));

});
