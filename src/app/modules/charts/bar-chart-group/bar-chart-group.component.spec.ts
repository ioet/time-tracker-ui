import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartGroupComponent } from './bar-chart-group.component';

describe('BarChartGroupComponent', () => {
  let component: BarChartGroupComponent;
  let fixture: ComponentFixture<BarChartGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
