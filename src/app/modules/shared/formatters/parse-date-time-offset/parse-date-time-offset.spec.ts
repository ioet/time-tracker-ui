import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParseDateTimeOffset } from './parse-date-time-offset';

describe('ParseDateToUtcComponent', () => {
  let component: ParseDateTimeOffset;
  let fixture: ComponentFixture<ParseDateTimeOffset>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParseDateTimeOffset ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParseDateTimeOffset);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
