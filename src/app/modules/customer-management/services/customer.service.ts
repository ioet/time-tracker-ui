import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  baseUrl = `${environment.timeTrackerApiUrl}/customers`;

  constructor(private http: HttpClient) {}

  createCustomer(customerData): Observable<any> {
    const body = {
      ...customerData,
      tenant_id: sessionStorage.getItem('tenant_id'),
    };
    return this.http.post(this.baseUrl, body);
  }
}
