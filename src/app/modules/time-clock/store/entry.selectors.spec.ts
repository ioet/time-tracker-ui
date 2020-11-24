import { Entry } from '../../shared/models';
import { TimeDetails, TimeEntriesSummary } from '../models/time.entry.summary';
import * as selectors from './entry.selectors';

describe('Entry selectors', () => {
  it('should select the message', () => {
    const anyMessage = 'my-message';
    const entryState = { message: anyMessage };

    expect(selectors.getStatusMessage.projector(entryState)).toBe(anyMessage);
  });

  it('should select the time entries data source', () => {
    const timeEntriesDataSource = { isLoading: false, data: [] };
    const entryState = { timeEntriesDataSource };

    expect(selectors.getTimeEntriesDataSource.projector(entryState)).toEqual(timeEntriesDataSource);
  });

  it('should select the report data source', () => {
    const reportDataSource = { isLoading: false, data: [] };
    const entryState = { reportDataSource };

    expect(selectors.getReportDataSource.projector(entryState)).toEqual(reportDataSource);
  });

  it('should select getEntrySummary', () => {
    const timeDetails: TimeDetails = { hours: '45', minutes: '45', seconds: '1' };
    const timeEntriesSummaryTest: TimeEntriesSummary = { day: timeDetails, month: timeDetails, week: timeDetails };
    const entryState = { timeEntriesSummary: timeEntriesSummaryTest };

    expect(selectors.getEntriesSummary.projector(entryState)).toEqual(timeEntriesSummaryTest);
  });

  it('should select getActiveTimeEntry', () => {
    const activeEntry: Entry = { start_date: new Date() };
    const entryState = { active: activeEntry };

    expect(selectors.getActiveTimeEntry.projector(entryState)).toEqual(activeEntry);
  });

  it('should select getCreateError', () => {
    const error = true;
    const entryState = { createError: error };

    expect(selectors.getCreateError.projector(entryState)).toEqual(error);
  });

  it('should select getUpdateError', () => {
    const error = true;
    const entryState = { updateError: error };

    expect(selectors.getUpdateError.projector(entryState)).toEqual(error);
  });
});
