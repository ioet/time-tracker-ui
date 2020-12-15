import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyReportComponent } from './technology-report.component';

describe('TechnologyReportComponent', () => {
  let component: TechnologyReportComponent;
  let fixture: ComponentFixture<TechnologyReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TechnologyReportComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have form and datatable components', waitForAsync(() => {
    fixture.detectChanges();

    const compile = fixture.debugElement.nativeElement;
    const timeRangeForm = compile.querySelector('app-time-range-form');
    const technologyReportDataTable = compile.querySelector('app-technology-report-table');
    expect(timeRangeForm).toBeTruthy();
    expect(technologyReportDataTable).toBeTruthy();
  }));
});
