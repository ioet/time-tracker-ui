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
    const reportDataSource = { isLoading: false, data: []};
    const entryState = { reportDataSource };

    expect(selectors.getReportDataSource.projector(entryState)).toEqual(reportDataSource);
  });

});
