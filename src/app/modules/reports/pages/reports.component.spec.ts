import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsComponent } from './reports.component';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  function setup() {
    // tslint:disable-next-line: no-shadowed-variable
    const fixture = TestBed.createComponent(ReportsComponent);
    const app = fixture.debugElement.componentInstance;
    return { fixture, app };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have form and datatable components', async(() => {
    // tslint:disable-next-line: no-shadowed-variable
    const { fixture } = setup();

    fixture.detectChanges();

    const compile = fixture.debugElement.nativeElement;
    const div = compile.querySelector('div');
    const reportForm = compile.querySelector('app-time-range-form');
    const reportDataTable = compile.querySelector('app-time-entries-table');
    expect(div).toBeTruthy();
    expect(reportForm).toBeTruthy();
    expect(reportDataTable).toBeTruthy();
  }));
});
