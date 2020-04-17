import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../../../environments/environment';
import { AzureAdB2CService } from 'src/app/modules/login/services/azure.ad.b2c.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  baseUrl = `${environment.timeTrackerApiUrl}/customers`;

  constructor(private http: HttpClient, private service: AzureAdB2CService) {}

  createCustomer(customerData): Observable<any> {
    const body = {
      ...customerData,
      tenant_id: this.service.getTenantId(),
    };
    console.log(this.service.getTenantId());
    return this.http.post(this.baseUrl, body);
  }
}
