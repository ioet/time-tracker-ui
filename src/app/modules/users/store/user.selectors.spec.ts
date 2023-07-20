import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import * as selectors from './user.selectors';
import { TimeEntriesTableComponent } from '../../reports/components/time-entries-table/time-entries-table.component';
import { TimeEntriesComponent } from '../../time-entries/pages/time-entries.component';
import { TimeRangeFormComponent } from '../../reports/components/time-range-form/time-range-form.component';


describe('UserSelectors', () => {

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TimeEntriesTableComponent, TimeEntriesComponent, TimeRangeFormComponent],
      providers: [provideMockStore({ initialState: {} })],
    }).compileComponents();
  }));

  it('should select is Loading', () => {
    const isLoadingValue = true;
    const userState = { isLoading: isLoadingValue };

    expect(selectors.getIsLoading.projector(userState)).toBe(isLoadingValue);
  });
});
