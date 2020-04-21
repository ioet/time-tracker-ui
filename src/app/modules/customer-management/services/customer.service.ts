import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { AzureAdB2CService } from 'src/app/modules/login/services/azure.ad.b2c.service';

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
    return this.http.post(this.baseUrl, body);
  }

  getCustomers(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  deleteCustomer(customerId: string): Observable<any> {
    const url = `${this.baseUrl}/${customerId}`;
    return this.http.delete(url);
  }

  updateCustomer(customerData): Observable<any> {
    const url = `${this.baseUrl}/${customerData.id}`;
    const body = {
      ...customerData,
    };
    return this.http.put(url, body);
  }
}
