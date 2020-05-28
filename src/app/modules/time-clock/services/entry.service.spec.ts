import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';

import {EntryService} from './entry.service';
import {NewEntry} from '../../shared/models';
import {DatePipe} from '@angular/common';
import {TimeEntriesTimeRange} from '../models/time-entries-time-range';

describe('EntryService', () => {
  let service: EntryService;
  let httpMock: HttpTestingController;
  let datePipe: DatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule], providers: [DatePipe]});
    service = TestBed.inject(EntryService);
    httpMock = TestBed.inject(HttpTestingController);
    datePipe = TestBed.inject(DatePipe);
    service.baseUrl = 'time-entries';
  });

  it('services are ready to be used', inject(
    [HttpClientTestingModule, EntryService, DatePipe],
    (httpClient: HttpClientTestingModule, entryService: EntryService, datePipes: DatePipe) => {
      expect(entryService).toBeTruthy();
      expect(httpClient).toBeTruthy();
      expect(datePipes).toBeTruthy();
    }
  ));

  it('create entry using POST from baseUrl', () => {
    const entry: NewEntry[] = [{project_id: '1', start_date: new Date().toISOString()}];

    service.createEntry(entry).subscribe((response) => {
      expect(response.length).toBe(1);
    });

    const createEntryRequest = httpMock.expectOne(service.baseUrl);
    expect(createEntryRequest.request.method).toBe('POST');
    createEntryRequest.flush(entry);
  });

  it('loads an activeEntry with /running', () => {
    service.loadActiveEntry().subscribe();

    const loadEntryRequest = httpMock.expectOne(`${service.baseUrl}/running`);
    expect(loadEntryRequest.request.method).toBe('GET');
  });

  it('loads summary with get /summary', () => {
    service.summary().subscribe();

    const loadEntryRequest = httpMock.expectOne(`${service.baseUrl}/summary`);
    expect(loadEntryRequest.request.method).toBe('GET');
  });

  it('load all Entries', () => {
    service.loadEntries(new Date().getMonth).subscribe();

    const loadEntryRequest = httpMock.expectOne(`${service.baseUrl}`);
    expect(loadEntryRequest.request.method).toBe('GET');

  });

  it('update an entry using PUT', () => {
    const updatedEntry = {foo: 'bar', id: 'id'};

    service.updateActiveEntry(updatedEntry).subscribe();

    const updateEntryRequest = httpMock.expectOne(`${service.baseUrl}/id`);
    expect(updateEntryRequest.request.method).toBe('PUT');
  });

  it('delete an entry using DELETE', () => {
    const entry = 'entryId';

    service.deleteEntry(entry).subscribe();

    const updateEntryRequest = httpMock.expectOne(`${service.baseUrl}/${entry}`);
    expect(updateEntryRequest.request.method).toBe('DELETE');
  });

  it('stops an entry using POST', () => {
    service.stopEntryRunning('id').subscribe();

    const updateEntryRequest = httpMock.expectOne(`${service.baseUrl}/id/stop`);
    expect(updateEntryRequest.request.method).toBe('POST');
  });

  it('when getting time entries for report, time range should be sent', () => {
    const startDateValue = new Date();
    const endDateValue = new Date();
    const pipe: DatePipe = new DatePipe('en');
    const timeRange: TimeEntriesTimeRange = {start_date: startDateValue, end_date: endDateValue};

    service.loadEntriesByTimeRange(timeRange).subscribe();

    const loadEntryRequest = httpMock.expectOne(req => req.method === 'GET' && req.url === service.baseUrl);

    expect(loadEntryRequest.request.params.get('start_date')).toBe(pipe.transform(startDateValue,
      EntryService.TIME_ENTRIES_DATE_TIME_FORMAT));
    expect(loadEntryRequest.request.params.get('end_date')).toBe(pipe.transform(endDateValue, EntryService.TIME_ENTRIES_DATE_TIME_FORMAT));
  });
});
