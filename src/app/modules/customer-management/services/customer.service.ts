import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  baseUrl = `${environment.timeTrackerApiUrl}/customers`;

  constructor(private http: HttpClient) {}

  createCustomer(customerData): Observable<any> {
    return this.http.post(this.baseUrl, customerData, { withCredentials: true });
  }

  getCustomers(): Observable<any> {
    return this.http.get(this.baseUrl, { withCredentials: true });
  }

  deleteCustomer(customerId: string): Observable<any> {
    const url = `${this.baseUrl}/${customerId}`;
    return this.http.delete(url, { withCredentials: true });
  }

  updateCustomer(customerData): Observable<any> {
    const url = `${this.baseUrl}/${customerData.id}`;
    return this.http.put(url, customerData, { withCredentials: true });
  }
}
