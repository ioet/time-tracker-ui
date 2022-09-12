import { TestBed } from '@angular/core/testing';

import { StatusNetworkService } from './status-network.service';

describe('StatusNetworkService', () => {
  let service: StatusNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusNetworkService);
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
