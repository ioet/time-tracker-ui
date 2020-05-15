import * as actions from './entry.actions';

describe('Actions for Entries', () => {

  it('LoadEntriesSummaryFail type is EntryActionTypes.LOAD_ENTRIES_SUMMARY_FAIL', () => {
    const action = new actions.LoadEntriesSummaryFail();
    expect(action.type).toEqual(actions.EntryActionTypes.LOAD_ENTRIES_SUMMARY_FAIL);
  });

  it('LoadEntriesSummarySuccess type is EntryActionTypes.LOAD_ENTRIES_SUMMARY_SUCCESS', () => {
    const action = new actions.LoadEntriesSummarySuccess(null);
    expect(action.type).toEqual(actions.EntryActionTypes.LOAD_ENTRIES_SUMMARY_SUCCESS);
  });

  it('LoadActiveEntrySuccess type is EntryActionTypes.LOAD_ACTIVE_ENTRY_SUCCESS', () => {
    const loadActiveEntrySuccess = new actions.LoadActiveEntrySuccess([]);
    expect(loadActiveEntrySuccess.type).toEqual(actions.EntryActionTypes.LOAD_ACTIVE_ENTRY_SUCCESS);
  });

  it('LoadActiveEntryFail type is EntryActionTypes.LOAD_ACTIVE_ENTRY_FAIL', () => {
    const loadActiveEntryFail = new actions.LoadActiveEntryFail('error');
    expect(loadActiveEntryFail.type).toEqual(actions.EntryActionTypes.LOAD_ACTIVE_ENTRY_FAIL);
  });

  it('LoadEntriesSuccess type is EntryActionTypes.LOAD_ENTRIES_SUCCESS', () => {
    const loadEntrySuccess = new actions.LoadEntriesSuccess([]);
    expect(loadEntrySuccess.type).toEqual(actions.EntryActionTypes.LOAD_ENTRIES_SUCCESS);
  });

  it('LoadEntriesFail type is EntryActionTypes.LOAD_ENTRIES_FAIL', () => {
    const loadEntryFail = new actions.LoadEntriesFail('error');
    expect(loadEntryFail.type).toEqual(actions.EntryActionTypes.LOAD_ENTRIES_FAIL);
  });

  it('CreateEntrySuccess type is EntryActionTypes.CREATE_ENTRY_SUCCESS', () => {
    const createEntrySuccess = new actions.CreateEntrySuccess({
      project_id: '1',
      start_date: '2020-04-21T19:51:36.559000+00:00',
    });
    expect(createEntrySuccess.type).toEqual(actions.EntryActionTypes.CREATE_ENTRY_SUCCESS);
  });

  it('CreateEntryFail type is EntryActionTypes.CREATE_ENTRY_FAIL', () => {
    const createEntryFail = new actions.CreateEntryFail('error');
    expect(createEntryFail.type).toEqual(actions.EntryActionTypes.CREATE_ENTRY_FAIL);
  });

  it('DeleteEntrySuccess type is EntryActionTypes.DELETE_ENTRY_SUCCESS', () => {
    const deleteEntrySuccess = new actions.DeleteEntrySuccess('entryId');
    expect(deleteEntrySuccess.type).toEqual(actions.EntryActionTypes.DELETE_ENTRY_SUCCESS);
  });

  it('DeleteEntrySuccess type is EntryActionTypes.DELETE_ENTRY_SUCCESS', () => {
    const deleteEntryFail = new actions.DeleteEntryFail('error');
    expect(deleteEntryFail.type).toEqual(actions.EntryActionTypes.DELETE_ENTRY_FAIL);
  });

  it('UpdateActiveEntrySuccess type is EntryActionTypes.UDPATE_ACTIVE_ENTRY_SUCCESS', () => {
    const updateActiveEntrySuccess = new actions.UpdateActiveEntrySuccess({
      id: '1',
      start_date: new Date(),
      end_date: new Date(),
      activity: '',
      technologies: ['abc', 'abc'],
    });
    expect(updateActiveEntrySuccess.type).toEqual(actions.EntryActionTypes.UPDATE_ACTIVE_ENTRY_SUCCESS);
  });

  it('UpdateActiveEntryFail type is EntryActionTypes.UDPATE_ACTIVE_ENTRY_FAIL', () => {
    const updateActiveEntryFail = new actions.UpdateActiveEntryFail('error');
    expect(updateActiveEntryFail.type).toEqual(actions.EntryActionTypes.UPDATE_ACTIVE_ENTRY_FAIL);
  });
});
