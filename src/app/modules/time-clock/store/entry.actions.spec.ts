import * as actions from './entry.actions';

describe('Actions for Entries', () => {
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
});
