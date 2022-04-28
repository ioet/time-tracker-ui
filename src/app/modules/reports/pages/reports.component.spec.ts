import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsComponent } from './reports.component';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ReportsComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ReportsComponent);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have form and datatable components', waitForAsync(() => {
    fixture.detectChanges();

    const compile = fixture.debugElement.nativeElement;
    const reportForm = compile.querySelector('app-time-range-form');
    const reportDataTable = compile.querySelector('app-time-entries-table');
    expect(reportForm).toBeTruthy();
    expect(reportDataTable).toBeTruthy();
  }));

  it(`Given the id of the user 'abc123' this is assigned to the variable userId`, () => {
    const userId = 'abc123';
    component.user(userId);
    expect(component.userId).toEqual('abc123');
  });
});
