import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { EntryService } from './entry.service';
import { NewEntry } from '../../shared/models';

describe('EntryService', () => {
  let service: EntryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(EntryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('services are ready to be used', inject(
    [HttpClientTestingModule, EntryService],
    (httpClient: HttpClientTestingModule, entryService: EntryService) => {
      expect(entryService).toBeTruthy();
      expect(httpClient).toBeTruthy();
    }
  ));

  it('create entry using POST from baseUrl', () => {
    service.baseUrl = 'time-entries';
    const entry: NewEntry[] = [{ project_id: '1', start_date: new Date().toISOString() }];

    service.createEntry(entry).subscribe((response) => {
      expect(response.length).toBe(1);
    });

    const createEntryRequest = httpMock.expectOne(service.baseUrl);
    expect(createEntryRequest.request.method).toBe('POST');
    createEntryRequest.flush(entry);
  });


  it('loads an activeEntry with /running', () => {
    service.baseUrl = 'time-entries';

    service.loadActiveEntry().subscribe((response) => {
      const loadEntryRequest = httpMock.expectOne(`${service.baseUrl}/running`);
      expect(loadEntryRequest.request.method).toBe('GET');
    });
  });

  it('loads summary with get /summary', () => {
    service.baseUrl = 'time-entries';

    service.summary().subscribe((response) => {
      const loadEntryRequest = httpMock.expectOne(`${service.baseUrl}/summary`);
      expect(loadEntryRequest.request.method).toBe('GET');
    });
  });

  it('loads all Entries', () => {
    service.baseUrl = 'time-entries';
    service.loadEntries().subscribe((response) => {
      const loadEntryRequest = httpMock.expectOne(`${service.baseUrl}`);
      expect(loadEntryRequest.request.method).toBe('GET');
    });
  });

  it('update an entry using PUT', () => {
    service.baseUrl = 'time-entries';

    const updatedEntry = {foo: 'bar', id: 'id'};
    service.updateActiveEntry(updatedEntry).subscribe((response) => {
      const updateEntryRequest = httpMock.expectOne(`${service.baseUrl}/id`);
      expect(updateEntryRequest.request.method).toBe('PUT');
    });
  });

  it('delete an entry using DELETE', () => {
    service.baseUrl = 'time-entries';
    const entry = 'entryId';
    service.deleteEntry(entry).subscribe((response) => {
      const updateEntryRequest = httpMock.expectOne(`${service.baseUrl}/${entry}`);
      expect(updateEntryRequest.request.method).toBe('DELETE');
    });
  });

  it('stops an entry using POST', () => {
    service.baseUrl = 'time-entries';

    service.stopEntryRunning('id').subscribe((response) => {
      const updateEntryRequest = httpMock.expectOne(`${service.baseUrl}/id/stop`);
      expect(updateEntryRequest.request.method).toBe('POST');
    });
  });
});
