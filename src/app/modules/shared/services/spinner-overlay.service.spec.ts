import { TestBed } from '@angular/core/testing';
import { Overlay } from '@angular/cdk/overlay';

import { SpinnerOverlayService } from './spinner-overlay.service';
import { SpinnerInterceptor } from '../interceptors/spinner.interceptor';
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ComponentPortal } from 'ngx-toastr';


describe('SpinnerOverlayService test', () => {

  class MockHttpHandler extends HttpHandler {
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
      return of(new HttpResponse());
    }
  }

  let spinnerService: SpinnerOverlayService;
  let spinnerInterceptor: SpinnerInterceptor;
  let mockHttpHandler: HttpHandler;
  let overlayRef: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Overlay,
        SpinnerInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: SpinnerInterceptor,
          multi: true,
        },
      ],
    });
    spinnerService = TestBed.inject(SpinnerOverlayService);
    spinnerInterceptor = TestBed.inject(SpinnerInterceptor);
    mockHttpHandler = new MockHttpHandler();
    overlayRef = spinnerService.overlayRef;
  });

  it('should be created', () => {
    expect(spinnerService).toBeTruthy();
  });

  it('if request is made then spinnerService is show', () => {
    const request = new HttpRequest('GET', '/foo');
    spyOn(spinnerService, 'show');
    spyOn(spinnerService, 'hide');

    spinnerInterceptor.intercept(request, mockHttpHandler);

    expect(spinnerService.show).toHaveBeenCalled();
    expect(overlayRef).toBeUndefined();
    expect(ComponentPortal).toBeTruthy();
    expect(spinnerService.hide).toBeTruthy();
  });

});
