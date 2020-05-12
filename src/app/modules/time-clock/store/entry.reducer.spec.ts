import { NewEntry, Entry } from './../../shared/models';
import * as actions from './entry.actions';
import { entryReducer, EntryState } from './entry.reducer';

describe('entryReducer', () => {
  const initialState: EntryState = { active: null, entryList: [], isLoading: false, message: '' };
  const entry: NewEntry = {
    start_date: 'start-date',
    description: 'description',
    project_id: '112',
    technologies: ['angular', 'typescript'],
  };

  const newEntry: Entry = {
    id: '1',
    start_date: new Date(),
    end_date: new Date(),
    activity: '',
    technologies: ['abc', 'abc'],
  };

  it('on Default, ', () => {
    const action = new actions.DefaultEntry();
    const state = entryReducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('on LoadActiveEntry, isLoading is true', () => {
    const action = new actions.LoadActiveEntry();
    const state = entryReducer(initialState, action);
    expect(state.isLoading).toEqual(true);
  });

  it('on LoadActiveEntrySuccess, activeEntryFound are saved in the store', () => {
    const activeEntryFound: NewEntry[] = [
      { project_id: '123', description: 'description', technologies: ['angular', 'javascript'] },
    ];
    const action = new actions.LoadActiveEntrySuccess(activeEntryFound);
    const state = entryReducer(initialState, action);
    expect(state.active).toEqual(activeEntryFound);
  });

  it('on LoadActiveEntryFail, active tobe null', () => {
    const action = new actions.LoadActiveEntryFail('error');
    const state = entryReducer(initialState, action);
    expect(state.active).toBe(null);
  });

  it('on LoadEntries, isLoading is true', () => {
    const action = new actions.LoadEntries();
    const state = entryReducer(initialState, action);
    expect(state.isLoading).toEqual(true);
  });

  it('on LoadEntriesSuccess, get all Entries', () => {
    const entries: Entry[] = [
      {
        project_id: '123',
        comments: 'description',
        technologies: ['angular', 'javascript'],
        uri: 'uri',
        id: 'id',
        start_date: new Date(),
        end_date: new Date(),
        activity: 'activity',
      },
    ];
    const action = new actions.LoadEntriesSuccess(entries);
    const state = entryReducer(initialState, action);
    expect(state.entryList).toEqual(entries);
  });

  it('on LoadEntriesFail, active tobe null', () => {
    const action = new actions.LoadEntriesFail('error');
    const state = entryReducer(initialState, action);
    expect(state.entryList).toEqual([]);
  });

  it('on CreateEntry, isLoading is true', () => {
    const entryToCreate: NewEntry = { project_id: '1', start_date: '2020-04-21T19:51:36.559000+00:00' };
    const action = new actions.CreateEntry(entryToCreate);
    const state = entryReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on CreateEntrySuccess, message is updated', () => {
    const entryToCreate: NewEntry = { project_id: '1', start_date: '2020-04-21T19:51:36.559000+00:00' };
    const action = new actions.CreateEntrySuccess(entryToCreate);
    const state = entryReducer(initialState, action);

    expect(state.message).toEqual('You clocked-in successfully');
  });

  it('on CreateEntryFail, entryList equal []', () => {
    const action = new actions.CreateEntryFail('error');
    const state = entryReducer(initialState, action);

    expect(state.entryList).toEqual([]);
    expect(state.isLoading).toEqual(false);
  });

  it('on DeleteEntry by Id, isLoading is true', () => {
    const action = new actions.DeleteEntry('id');
    const state = entryReducer(initialState, action);
    expect(state.isLoading).toEqual(true);
  });

  it('on DeleteEntrySuccess', () => {
    const action = new actions.DeleteEntry('id');
    const state = entryReducer(initialState, action);
    expect(state.entryList).toEqual([]);
  });

  it('on LoadEntriesFail, active tobe null', () => {
    const action = new actions.DeleteEntryFail('error');
    const state = entryReducer(initialState, action);
    expect(state.entryList).toEqual([]);
  });

  it('on UpdateActiveEntry, isLoading is true', () => {
    const action = new actions.UpdateActiveEntry(entry);
    const state = entryReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on UpdateActiveEntrySuccess, loading is false', () => {
    const currentState: EntryState = {
      active: null,
      entryList: [],
      isLoading: false,
      message: '',
    };
    const action = new actions.UpdateActiveEntrySuccess(newEntry);
    const state = entryReducer(currentState, action);

    expect(state.isLoading).toEqual(false);
  });

  it('on UpdateActiveEntryFail, active to be null', () => {
    const action = new actions.UpdateActiveEntryFail('error');
    const state = entryReducer(initialState, action);

    expect(state.active).toBe(null);
    expect(state.isLoading).toEqual(false);
  });

  it('on StopTimeEntryRunning, is loading false', () => {
    const action = new actions.StopTimeEntryRunning('id');

    const state = entryReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on StopTimeEntryRunningSuccess, active is null and message is updated', () => {
    const action = new actions.StopTimeEntryRunningSuccess('id');

    const state = entryReducer(initialState, action);

    expect(state.active).toEqual(null);
    expect(state.message).toEqual('You clocked-out successfully');
  });

  it('on UpdateActiveEntryFail, isLoading is false', () => {
    const action = new actions.StopTimeEntryRunningFail('id');

    const state = entryReducer(initialState, action);

    expect(state.isLoading).toBeFalsy();
  });
});
