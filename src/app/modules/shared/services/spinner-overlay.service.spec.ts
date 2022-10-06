import { TestBed } from '@angular/core/testing';
import { Overlay } from '@angular/cdk/overlay';

import { SpinnerOverlayService } from './spinner-overlay.service';
import { SpinnerInterceptor } from '../interceptors/spinner.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

describe('SpinnerOverlayService', () => {
  let service: SpinnerOverlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Overlay,
      {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
      ],
    });
    service = TestBed.inject(SpinnerOverlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
