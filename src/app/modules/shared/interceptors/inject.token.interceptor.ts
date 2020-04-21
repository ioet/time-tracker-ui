import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AzureAdB2CService } from 'src/app/modules/login/services/azure.ad.b2c.service';
import { environment } from './../../../../environments/environment';

@Injectable()
export class InjectTokenInterceptor implements HttpInterceptor {

  constructor(private azureAdB2CService: AzureAdB2CService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.startsWith(environment.timeTrackerApiUrl)) {
      const requestWithHeaders = request.clone(
        {
          headers: request.headers.set('Authorization',
            'Bearer ' + this.azureAdB2CService.getBearerToken())
        });
      return next.handle(requestWithHeaders);
    } else {
      return next.handle(request);
    }
  }

}
