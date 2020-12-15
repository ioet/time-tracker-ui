import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyReportTableComponent } from './technology-report-table.component';

describe('Technology Report Page', () => {
  describe('TechnologyReportTableComponent', () => {
    let component: TechnologyReportTableComponent;
    let fixture: ComponentFixture<TechnologyReportTableComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TechnologyReportTableComponent],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TechnologyReportTableComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('component should be created', () => {
      expect(component).toBeTruthy();
    });
  });
});
