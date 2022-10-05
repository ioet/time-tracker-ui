import { TestBed } from '@angular/core/testing';

import { PageLoaderService } from './page-loader.service';

describe('PageLoaderService', () => {
  let service: PageLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
