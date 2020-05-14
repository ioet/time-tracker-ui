import { TimeDetailsPipe } from './../../pipes/time-details.pipe';
import { provideMockStore } from '@ngrx/store/testing';
import { TimeEntriesSummary } from './../../models/time.entry.summary';
import { TimeDetails } from './../../models/time.entry.summary';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEntriesSummaryComponent } from './time-entries-summary.component';

describe('TimeEntriesSummaryComponent', () => {
  let component: TimeEntriesSummaryComponent;
  let fixture: ComponentFixture<TimeEntriesSummaryComponent>;


  const emptyTimeDetails: TimeDetails = { hours: '--:--', minutes: '--:--', seconds: '--:--' };
  const emptyTimeEntriesSummary: TimeEntriesSummary = { day: emptyTimeDetails, week: emptyTimeDetails, month: emptyTimeDetails };

  const state = {
    entries: {
      timeEntriesSummary: emptyTimeEntriesSummary
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeEntriesSummaryComponent, TimeDetailsPipe ],
      providers: [provideMockStore({ initialState: state })
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEntriesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
