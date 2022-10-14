import { Overlay } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { SpinnerInterceptor } from './spinner.interceptor';
import { HttpHandler, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SpinnerOverlayService } from '../services/spinner-overlay.service';
import { ComponentPortal } from 'ngx-toastr';


describe('SpinnerInterceptorService test', () => {
  TestBed.configureTestingModule({
    providers: [
      SpinnerInterceptor,
      Overlay
    ],
  });

  class MockHttpHandler implements HttpHandler {
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
      return of(new HttpResponse());
    }
  }

  let spinnerService: SpinnerOverlayService;
  let spinnerInterceptor: SpinnerInterceptor;
  let mockHttpHandler: HttpHandler;
  let overlayRef: any;

  beforeEach(() => {
    spinnerService = TestBed.inject(SpinnerOverlayService);
    spinnerInterceptor = TestBed.inject(SpinnerInterceptor);
    mockHttpHandler = new MockHttpHandler();
    overlayRef = spinnerService.overlayRef;
  });

  it('should be created', () => {
    expect(spinnerInterceptor).toBeTruthy();
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
