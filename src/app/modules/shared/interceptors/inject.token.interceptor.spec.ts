import { HttpHandler, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { AzureAdB2CService } from 'src/app/modules/login/services/azure.ad.b2c.service';
import { environment } from '../../../../environments/environment';
import { InjectTokenInterceptor } from './inject.token.interceptor';
import { LoginService } from '../../login/services/login.service';

describe('InjectTokenInterceptor test', () => {

  class MockHttpHandler extends HttpHandler {
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
      return of(new HttpResponse());
    }
  }

  const azureAdB2CService: AzureAdB2CService = new AzureAdB2CService();
  const loginService: LoginService = new LoginService();
  azureAdB2CService.getBearerToken = () => {
    return 'XYZ';
  };
  const handler: HttpHandler = new MockHttpHandler();

  it('if request.url is not part of time-tracker-api, then next.handle', () => {
    const interceptor = new InjectTokenInterceptor(azureAdB2CService, loginService);
    interceptor.isProduction = true;
    const request = new HttpRequest('GET', '/foo');
    spyOn(handler, 'handle');

    interceptor.intercept(request, handler);

    expect(handler.handle).toHaveBeenCalledWith(request);
  });

});
