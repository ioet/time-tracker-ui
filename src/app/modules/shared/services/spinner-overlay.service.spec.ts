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
    const request = new HttpRequest('GET', '/recent');
    spyOn(spinnerService, 'show');

    spinnerInterceptor.intercept(request, mockHttpHandler);

    expect(spinnerService.show).toHaveBeenCalled();
    expect(ComponentPortal).toBeTruthy();
  });


  it('if hide calls detach method of overlayRef and then sets it to undefined', () => {
    spyOn(spinnerService, 'hide');

    spinnerService.hide();

    expect(spinnerService.hide).toHaveBeenCalled();
    expect(overlayRef).toBeUndefined();
  });

});
