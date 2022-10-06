import { Overlay } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';

import { SpinnerInterceptor } from './spinner.interceptor';

describe('SpinnerInterceptorService test', () => {
  let service: SpinnerInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SpinnerInterceptor,
        Overlay
      ]
    });
    service = TestBed.inject(SpinnerInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
