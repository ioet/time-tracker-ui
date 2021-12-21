import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { EntryService } from './entry.service';
import { NewEntry } from '../../shared/models';
import { DatePipe } from '@angular/common';
import { TimeEntriesTimeRange } from '../models/time-entries-time-range';
import * as moment from 'moment';

describe('EntryService', () => {
  let service: EntryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule], providers: [DatePipe]});
    service = TestBed.inject(EntryService);
    httpMock = TestBed.inject(HttpTestingController);
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

  it('loads summary with get /summary?time_offset=<time-offset>', () => {
    service.summary().subscribe();
    const timeOffset = new Date().getTimezoneOffset();
    const loadEntryRequest = httpMock.expectOne(`${service.baseUrl}/summary?time_offset=${timeOffset}`);
    expect(loadEntryRequest.request.method).toBe('GET');
  });

  it('load all Entries', () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    const timezoneOffset = new Date().getTimezoneOffset();
    service.loadEntries({ year, month }).subscribe();

    const loadEntryRequest = httpMock.expectOne(`${service.baseUrl}?month=${month}&year=${year}&timezone_offset=${timezoneOffset}`);
    expect(loadEntryRequest.request.method).toBe('GET');

  });

  it('update an entry using PUT', () => {
    const updatedEntry = {foo: 'bar', id: 'id'};

    service.updateEntry(updatedEntry).subscribe();

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
    const yesterday = moment(new Date()).subtract(1, 'day');
    const today = moment(new Date());
    const pipe: DatePipe = new DatePipe('en');
    const timeRange: TimeEntriesTimeRange = {start_date: yesterday, end_date: today};
    const userId = '123';

    service.loadEntriesByTimeRange(timeRange, userId).subscribe();

    const loadEntryRequest = httpMock.expectOne(req => req.method === 'GET' && req.url === service.baseUrl);
    expect(loadEntryRequest.request.params.get('start_date')).toBe(pipe.transform(yesterday,
      EntryService.TIME_ENTRIES_DATE_TIME_FORMAT));
    expect(loadEntryRequest.request.params.get('end_date')).toBe(pipe.transform(today, EntryService.TIME_ENTRIES_DATE_TIME_FORMAT));
    expect(loadEntryRequest.request.params.get('user_id')).toEqual('123');
  });

  it('when getting time entries for report, limit parameter should be sent', () => {
    const yesterday = moment(new Date()).subtract(1, 'day');
    const today = moment(new Date());
    const timeRange: TimeEntriesTimeRange = { start_date: yesterday, end_date: today };
    const userId = '123';

    service.loadEntriesByTimeRange(timeRange, userId).subscribe();

    const loadEntryRequest = httpMock.expectOne(req => req.method === 'GET' && req.url === service.baseUrl);
    expect(loadEntryRequest.request.params.get('limit')).toEqual('9999');
  });

  it('when getting time entries for report, timezone_offset parameter should be sent', () => {
    const yesterday = moment(new Date()).subtract(1, 'day');
    const today = moment(new Date());
    const timeRange: TimeEntriesTimeRange = { start_date: yesterday, end_date: today };
    const userId = '123';

    service.loadEntriesByTimeRange(timeRange, userId).subscribe();

    const loadEntryRequest = httpMock.expectOne(req => req.method === 'GET' && req.url === service.baseUrl);

    const timezoneOffset = new Date().getTimezoneOffset().toString();
    expect(loadEntryRequest.request.params.get('timezone_offset')).toEqual(timezoneOffset);
  });

  it('when restarting entry, a POST is triggered', () => {
    const entry = 'entryId';

    service.restartEntry(entry).subscribe();

    const restartEntryRequest = httpMock.expectOne( `${service.baseUrl}/${entry}/restart`);
    expect(restartEntryRequest.request.method).toBe('POST');
  });

  it('entries are found by project id with a limit 2 by default', () => {
    const projectId = 'project-id';
    const startDate = (moment().subtract(1, 'months')).format();
    const endDate = moment().format();

    service.findEntriesByProjectId(projectId).subscribe();

    const restartEntryRequest = httpMock.expectOne( `${service.baseUrl}?limit=2&project_id=${projectId}&start_date=${startDate}&end_date=${endDate}`);
    expect(restartEntryRequest.request.method).toBe('GET');
  });

});
