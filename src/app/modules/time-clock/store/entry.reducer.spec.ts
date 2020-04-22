import { NewEntry } from './../../shared/models';
import * as actions from './entry.actions';
import { entryReducer, EntryState } from './entry.reducer';

describe('entryReducer', () => {
  const initialState: EntryState = { entryList: [], isLoading: false, message: '' };

  it('on CreateEntry, isLoading is true', () => {
    const entry: NewEntry = { project_id: '1', start_date: '2020-04-21T19:51:36.559000+00:00' };
    const action = new actions.CreateEntry(entry);
    const state = entryReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on CreateEntrySuccess, entry is saved in the store', () => {
    const entry: NewEntry = { project_id: '1', start_date: '2020-04-21T19:51:36.559000+00:00' };
    const action = new actions.CreateEntrySuccess(entry);
    const state = entryReducer(initialState, action);

    expect(state.entryList).toEqual([entry]);
    expect(state.isLoading).toEqual(false);
  });

  it('on CreateEntryFail, entryList equal []', () => {
    const action = new actions.CreateEntryFail('error');
    const state = entryReducer(initialState, action);

    expect(state.entryList).toEqual([]);
    expect(state.isLoading).toEqual(false);
  });
});
