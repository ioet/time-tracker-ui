import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AzureAdB2CService } from 'src/app/modules/login/services/azure.ad.b2c.service';
import { environment } from './../../../../environments/environment';
import { EnvironmentType } from 'src/environments/enum';
import { LoginService } from '../../login/services/login.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class InjectTokenInterceptor implements HttpInterceptor {
  isProduction = environment.production === EnvironmentType.TT_PROD_LEGACY;
  constructor(private azureAdB2CService: AzureAdB2CService, private loginService: LoginService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.startsWith(environment.timeTrackerApiUrl)) {
      const token = this.isProduction ? this.azureAdB2CService.getBearerToken() : this.loginService.getBearerToken();
      const requestWithHeaders = request.clone(
        {
          headers: request.headers.set('Authorization',
            'Bearer ' + token)
        });
      return next.handle(requestWithHeaders)
        .pipe(
          tap(() => { }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.loginService.logout();
                window.open("/login", "_self")
              }
            }
          })
        );
    } else {
      return next.handle(request);
    }
  }

}
