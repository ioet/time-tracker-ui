import { NewEntry } from './../../shared/models';
import * as actions from './entry.actions';
import { entryReducer, EntryState } from './entry.reducer';

describe('entryReducer', () => {
  const initialState: EntryState = { active: null, entryList: [], isLoading: false, message: '' };

  const entry: NewEntry = { start_date: 'start-date', description:
  'description', project_id: '112', technologies: ['angular', 'typescript']};

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

  it('on CreateEntry, isLoading is true', () => {
    const entryToCreate: NewEntry = { project_id: '1', start_date: '2020-04-21T19:51:36.559000+00:00' };
    const action = new actions.CreateEntry(entryToCreate);
    const state = entryReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on CreateEntryFail, entryList equal []', () => {
    const action = new actions.CreateEntryFail('error');
    const state = entryReducer(initialState, action);

    expect(state.entryList).toEqual([]);
    expect(state.isLoading).toEqual(false);
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
    const action = new actions.UpdateActiveEntrySuccess(entry);
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

  it('on StopTimeEntryRunningSuccess, active to be null', () => {
    const action = new actions.StopTimeEntryRunningSuccess('id');

    const state = entryReducer(initialState, action);

    expect(state.active).toEqual(null);
  });

  it('on UpdateActiveEntryFail, isLoading is false', () => {
    const action = new actions.StopTimeEntryRunningFail('id');

    const state = entryReducer(initialState, action);

    expect(state.isLoading).toBeFalsy();
  });

});
