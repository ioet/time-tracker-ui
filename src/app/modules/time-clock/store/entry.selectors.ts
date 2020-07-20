import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntryState } from './entry.reducer';


const getEntryState = createFeatureSelector('entries');

export const getEntriesSummary = createSelector(getEntryState, (state: EntryState) => state.timeEntriesSummary);

export const getActiveTimeEntry = createSelector(getEntryState, (state: EntryState) => state.active);

export const getCreateError = createSelector(getEntryState, (state: EntryState) => state.createError);

export const getUpdateError = createSelector(getEntryState, (state: EntryState) => state.updateError);

export const getStatusMessage = createSelector(getEntryState, (state: EntryState) => state.message);

export const allEntries = createSelector(getEntryState, (state: EntryState) => state?.timeEntriesDataSource?.data);

export const entriesForReport = createSelector(getEntryState, (state: EntryState) => state?.reportDataSource?.data);

export const getIsLoadingTimeEntries = createSelector(getEntryState, (state: EntryState) => state?.timeEntriesDataSource?.isLoading);

export const getIsLoadingReportData = createSelector(getEntryState, (state: EntryState) => state?.reportDataSource?.isLoading);
