import { Overlay } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { SpinnerInterceptor } from './spinner.interceptor';
import { HttpHandler, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SpinnerOverlayService } from '../services/spinner-overlay.service';


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

  let overlay: Overlay;
  let httpHandler: HttpHandler;
  let spinnerInterceptor: SpinnerInterceptor;

  beforeEach(() => {
    overlay = jasmine.createSpyObj('Overlay', ['create']);
    httpHandler = new MockHttpHandler();
    spinnerInterceptor = new SpinnerInterceptor(new SpinnerOverlayService(overlay));
  });

  it('should be created', () => {
    expect(spinnerInterceptor).toBeTruthy();
  });

  it('if request is made then spinnerInterceptor is called', () => {
    const request = new HttpRequest('GET', '/foo');
    spyOn(spinnerInterceptor, 'intercept');

    spinnerInterceptor.intercept(request, httpHandler);

    expect(spinnerInterceptor.intercept).toHaveBeenCalledWith(request, httpHandler);

  });

});
