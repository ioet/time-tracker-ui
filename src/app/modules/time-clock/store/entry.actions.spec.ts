import * as actions from './entry.actions';

describe('Actions for Entries', () => {
  it('LoadActiveEntrySuccess type is EntryActionTypes.LOAD_ACTIVE_ENTRY_SUCCESS', () => {
    const loadActiveEntrySuccess = new actions.LoadActiveEntrySuccess([]);
    expect(loadActiveEntrySuccess.type).toEqual(actions.EntryActionTypes.LOAD_ACTIVE_ENTRY_SUCCESS);
  });

  it('LoadActiveEntryFail type is EntryActionTypes.LOAD_ACTIVE_ENTRY_FAIL', () => {
    const loadActiveEntryFail = new actions.LoadActiveEntryFail('error');
    expect(loadActiveEntryFail.type).toEqual(actions.EntryActionTypes.LOAD_ACTIVE_ENTRY_FAIL);
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

  it('UpdateActiveEntrySuccess type is EntryActionTypes.UDPATE_ACTIVE_ENTRY_SUCCESS', () => {
    const updateActiveEntrySuccess = new actions.UpdateActiveEntrySuccess({
      project_id: '1',
      description: 'It is good for learning',
    });
    expect(updateActiveEntrySuccess.type).toEqual(actions.EntryActionTypes.UDPATE_ACTIVE_ENTRY_SUCCESS);
  });

  it('UpdateActiveEntryFail type is EntryActionTypes.UDPATE_ACTIVE_ENTRY_FAIL', () => {
    const updateActiveEntryFail = new actions.UpdateActiveEntryFail('error');
    expect(updateActiveEntryFail.type).toEqual(actions.EntryActionTypes.UDPATE_ACTIVE_ENTRY_FAIL);
  });
});
