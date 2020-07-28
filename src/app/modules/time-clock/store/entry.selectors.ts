import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntryState } from './entry.reducer';

const getEntryState = createFeatureSelector('entries');

export const getEntriesSummary = createSelector(getEntryState, (state: EntryState) => state?.timeEntriesSummary);

export const getActiveTimeEntry = createSelector(getEntryState, (state: EntryState) => state?.active);

export const getCreateError = createSelector(getEntryState, (state: EntryState) => state?.createError);

export const getUpdateError = createSelector(getEntryState, (state: EntryState) => state?.updateError);

export const getStatusMessage = createSelector(getEntryState, (state: EntryState) => state?.message);

export const getReportDataSource = createSelector(getEntryState, (state: EntryState) => state?.reportDataSource);

export const getTimeEntriesDataSource = createSelector(getEntryState, (state: EntryState) => state?.timeEntriesDataSource);
