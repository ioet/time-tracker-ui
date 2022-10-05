import { TestBed } from '@angular/core/testing';
import * as assert from 'assert';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { StatusNetworkService } from './status-network.service';

export interface ErrorType {
  error: any;
  message?: string;
  isError?: boolean;
}
describe('StatusNetworkService', () => {
  let service: StatusNetworkService;
  const errorType: ErrorType = {error: catchError, message: 'javascript', isError: false};

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusNetworkService);
  });

  fit('checkTypeError is warning', () => {
    assert(service.checkTypeError(errorType) == 'is warning');
  });
});
