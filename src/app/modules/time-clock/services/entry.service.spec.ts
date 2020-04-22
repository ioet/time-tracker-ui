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

  afterEach(() => {
    httpMock.verify();
  });

  it('services are ready to be used', inject(
    [HttpClientTestingModule, EntryService],
    (httpClient: HttpClientTestingModule, entryService: EntryService) => {
      expect(entryService).toBeTruthy();
      expect(httpClient).toBeTruthy();
    }
  ));

  it('create entry using POST from baseUrl', () => {
    const entry: NewEntry[] = [{ project_id: '1', start_date: new Date().toISOString() }];

    service.baseUrl = 'time-entries';

    service.createEntry(entry).subscribe((response) => {
      expect(response.length).toBe(1);
    });

    const createEntryRequest = httpMock.expectOne(service.baseUrl);
    expect(createEntryRequest.request.method).toBe('POST');
    createEntryRequest.flush(entry);
  });
});
